import { Crop } from 'react-image-crop';
import { v4 as uuid } from 'uuid';
import { BlobWithName } from '../types/common';

const getCroppedImage = async (
  image: HTMLImageElement,
  crop: Crop
): Promise<BlobWithName | null> => {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width as number;
  canvas.height = crop.height as number;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.drawImage(
      image,
      (crop.x as number) * scaleX,
      (crop.y as number) * scaleY,
      (crop.width as number) * scaleX,
      (crop.height as number) * scaleY,
      0,
      0,
      crop.width as number,
      crop.height as number
    );
  }

  // As Base64 string
  // const base64Image = canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        blob.name = `${uuid()}.png`;
        resolve(blob as BlobWithName);
      },
      'image/png',
      1
    );
  });
};

export default getCroppedImage;
