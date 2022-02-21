import sharp from 'sharp';
import path from 'path';

const sharpResize = (
  filename: string,
  width: number,
  height: number,
  outFileName: string
) => {
  return sharp(filename)
    .resize(width, height)
    .toFile(path.resolve('images/thumb/', outFileName));
};

export default sharpResize;
