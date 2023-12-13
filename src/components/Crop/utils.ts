import { type Area } from 'react-easy-crop';

export function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}

export function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

export const getCrap = async (
  imgUrl: string,
  croppedPixel: Area,
  rotation: number,
): Promise<string | null | undefined> => {
  try {
    const image = await createImage(imgUrl);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return null;
    }

    const rotRad = getRadianAngle(rotation);

    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
      image.width,
      image.height,
      rotation,
    );

    // set canvas size to match the bounding box
    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    ctx.rotate(rotRad);
    ctx.translate(-image.width / 2, -image.height / 2);

    ctx.drawImage(image, 0, 0);

    const data = ctx.getImageData(
      croppedPixel.x,
      croppedPixel.y,
      croppedPixel.width,
      croppedPixel.height,
    );

    canvas.width = croppedPixel.width;
    canvas.height = croppedPixel.height;

    ctx.putImageData(data, 0, 0);
    return new Promise((resolve) => {
      canvas.toBlob((file) => {
        if (file) resolve(URL.createObjectURL(file));
      }, 'image/jpeg');
    });
  } catch (e) {
    console.log(e);
    return;
  }
};
