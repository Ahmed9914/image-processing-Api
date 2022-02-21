"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const sharpResize = (filename, width, height, outFileName) => {
    return (0, sharp_1.default)(filename)
        .resize(width, height)
        .toFile(path_1.default.resolve('images/thumb/', outFileName));
};
exports.default = sharpResize;
