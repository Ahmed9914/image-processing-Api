"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const imageUtils_1 = __importDefault(require("../../utils/imageUtils"));
const imageResizer = express_1.default.Router();
imageResizer.get('/', (req, res) => {
    const filename = req.query.filename;
    let width = req.query.width;
    let height = req.query.height;
    if (filename && width && height) {
        width = Number(width);
        height = Number(height);
        if (Number(width) <= 0 || Number(height) <= 0) {
            res.send('Invalid dimensions');
        }
        else {
            const filenameWithExtension = path_1.default.resolve('images/full', filename + '.jpg');
            const outFileName = `${filename}_thumb${width}*${height}.jpg`;
            const outFilePath = path_1.default.resolve('images/thumb/', outFileName);
            if ((0, fs_1.existsSync)(path_1.default.resolve('images/thumb/', outFileName))) {
                res.sendFile(outFilePath);
            }
            else if (!(0, fs_1.existsSync)(filenameWithExtension)) {
                res.send("File doesn't exist");
            }
            else {
                (0, imageUtils_1.default)(filenameWithExtension, width, height, outFileName)
                    .then(() => {
                    res.sendFile(outFilePath);
                })
                    .catch((error) => {
                    console.log(error);
                    res.send('Unexpected error occurred.');
                });
            }
        }
    }
    else {
        res.send('Make sure you submitted all required fields!');
    }
});
exports.default = imageResizer;
