"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
const imageUtils_1 = __importDefault(require("../utils/imageUtils"));
const request = (0, supertest_1.default)(index_1.default);
describe('Test Image processing', () => {
    it('Make sure the sharpResize promise resolved', () => {
        (0, imageUtils_1.default)('images/full/palmtunnel.jpg', 400, 300, 'palmtunnel_thumb400*300.jpg')
            .then((done) => {
            expectAsync(done).toBeResolved();
        });
    });
    it('Detect invalid width or height', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/imageResizer?filename=palmtunnel&width=-100&height=400');
        expect(response.text).toBe('Invalid dimensions');
    }));
    it('Detect entering invalid filename', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/imageResizer?filename=g&width=600&height=400');
        expect(response.text).toBe("File doesn't exist");
    }));
});
