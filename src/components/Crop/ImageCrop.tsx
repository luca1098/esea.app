import { useState } from 'react';
import Cropper, { Area, CropperProps } from 'react-easy-crop';
import { Text } from '@chakra-ui/react';
import { getCrap } from './utils';

export type ImageCropProps = {
  aspect?: number;
  cropShape?: CropperProps['cropShape'] | undefined;
  imageUrl?: string | null;
  onCropComplete: (file: File, url: string | null) => void;
} & Pick<
  CropperProps,
  'cropSize' | 'zoom' | 'onZoomChange' | 'rotation' | 'onRotationChange'
>;

const ImageCrop = ({
  imageUrl,
  aspect,
  cropSize,
  cropShape,
  rotation,
  zoom,
  onZoomChange,
  onRotationChange,
  onCropComplete,
}: ImageCropProps) => {
  const [crop, setCrop] = useState<CropperProps['crop']>({
    x: 0,
    y: 0,
  });

  const onComplete = async (_: Area, pixelArea: Area) => {
    if (!imageUrl) return;
    const crap = await getCrap(imageUrl, pixelArea, rotation);
    if (crap) {
      const file = new File([crap], 'name', { type: 'image/jpeg' });
      onCropComplete(file, crap);
    }
  };

  if (!imageUrl) return <Text>Caricare un immagine</Text>;

  return (
    <Cropper
      image={imageUrl}
      crop={crop}
      zoom={zoom}
      onCropChange={setCrop}
      onZoomChange={onZoomChange}
      cropSize={cropSize || { width: 300, height: 300 }}
      onRotationChange={onRotationChange}
      cropShape={cropShape || 'rect'}
      aspect={aspect || 1}
      rotation={rotation}
      onCropComplete={onComplete}
    />
  );
};

export default ImageCrop;
