import {PixelCrop} from 'react-image-crop';

import canvasPreview from './canvasPreview';

let previewUrl = '';

const toBlob = (canvas: HTMLCanvasElement): Promise<Blob> => {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob as Blob));
  });
};

const imgPreview = async (
  image: HTMLImageElement,
  crop: PixelCrop,
  scale = 1,
  rotate = 0,
): Promise<string> => {
  const canvas = document.createElement('canvas');
  canvasPreview(image, canvas, crop, scale, rotate);

  const blob = await toBlob(canvas);

  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
  }

  if (blob) {
    previewUrl = URL.createObjectURL(blob);
  }

  return previewUrl;
};

export default imgPreview;
