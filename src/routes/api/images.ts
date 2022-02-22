import express from 'express';
import path from 'path';
import { existsSync } from 'fs';
import sharpResize from '../../utils/imageUtils';

const imageResizer = express.Router();

imageResizer.get('/', (req: express.Request, res: express.Response) => {
  const filename: unknown | string = req.query.filename;
  let width: unknown = req.query.width;
  let height: unknown = req.query.height;
  if (filename && width && height) {
    width = Number(width);
    height = Number(height);
    if (Number(width) <= 0 || Number(height) <= 0) {
      res.send('Invalid dimensions');
    } else {
      const filenameWithExtension = path.resolve(
        'images/full',
        filename + '.jpg'
      );
      const outFileName = `${filename}_thumb${width}*${height}.jpg`;
      const outFilePath = path.resolve('images/thumb/', outFileName);
      if (existsSync(path.resolve('images/thumb/', outFileName))) {
        res.sendFile(outFilePath);
      } else if (!existsSync(filenameWithExtension)) {
        res.send("File doesn't exist");
      } else {
        sharpResize(
          filenameWithExtension as string,
          width as number,
          height as number,
          outFileName
        )
          .then(() => {
            res.sendFile(outFilePath);
          })
          .catch((error) => {
            console.log(error);
            res.send('Unexpected error occurred.');
          });
      }
    }
  } else {
    res.send('Make sure you submitted all required fields!');
  }
});

export default imageResizer;
