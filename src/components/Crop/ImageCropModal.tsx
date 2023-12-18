import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Stack,
  Text,
} from '@chakra-ui/react';
import ImageCrop, { ImageCropProps } from './ImageCrop';
import Button from '@/kit/Button/Button';
import { useState } from 'react';
import { Nullish } from '@/core/types/utils';
import Slider from '@/kit/Input/Slider';
import { CropperProps } from 'react-easy-crop';

type ImageCropModalProps = {
  title?: string;
  image?: string | null;
  onComplete: (file: File, url: string) => void;
} & Pick<ModalProps, 'onClose' | 'isOpen'> &
  Omit<ImageCropProps, 'onCropComplete' | 'imageUrl' | 'zoom' | 'rotation'>;

const ImageCropModal = ({
  image,
  isOpen,
  title,
  cropShape,
  cropSize,
  aspect,
  onClose,
  onComplete,
}: ImageCropModalProps) => {
  const [file, setFile] = useState<Nullish<File>>();
  const [url, setUrl] = useState<Nullish<string>>();
  const [rotation, setRotation] = useState<CropperProps['rotation']>(0);
  const [zoom, setZoom] = useState(1);

  const handleCropComplete = (cropFile: File, cropUrl: string | null) => {
    setFile(cropFile);
    setUrl(cropUrl);
  };
  const handleConfirm = () => {
    if (file && url) onComplete(file, url);
  };
  if (!image) return null;
  return (
    <Modal onClose={onClose} size={{ base: 'full', md: '3xl' }} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title || "Ritaglia l'immagine"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack w={{ base: '90%' }} mx={'auto'} gap={4}>
            <Box
              position={'relative'}
              borderWidth={1}
              height={'80vh'}
              maxH={'600px'}
              w={'full'}
              mx={'auto'}
            >
              <ImageCrop
                imageUrl={image}
                onCropComplete={handleCropComplete}
                cropShape={cropShape}
                aspect={aspect}
                cropSize={cropSize}
                onRotationChange={setRotation}
                onZoomChange={setZoom}
                zoom={zoom}
                rotation={rotation}
              />
            </Box>
            <Stack gap={2}>
              <Slider
                label='Zoom'
                onChange={setZoom}
                value={zoom}
                min={0.5}
                max={2}
                step={0.01}
              />
              <Slider
                label='Rotazione'
                onChange={setRotation}
                value={rotation}
                min={0}
                max={360}
              />
            </Stack>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button label='Conferma' onClick={handleConfirm} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ImageCropModal;
