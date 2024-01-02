import ImageCropModal from '@/components/Crop/ImageCropModal';
import { useEffect, useState } from 'react';
import {
  DefaultValues,
  FieldValues,
  Path,
  UseFormReturn,
  useWatch,
} from 'react-hook-form';

export const useCroppedImage = <T extends FieldValues>(
  methods?: UseFormReturn<T>,
  fieldName?: Path<T>,
) => {
  const [croppedImg, setCroppedImg] = useState<string | null>();
  const [showCropModal, setShowCropModal] = useState<boolean>(false);
  const [anteprima, setAnteprima] = useState<string | null>();

  const fileValues = useWatch({
    control: methods?.control,
    name: fieldName || ('image' as Path<T>),
  });

  useEffect(() => {
    if (fileValues) {
      const imgUrl = URL.createObjectURL(fileValues);
      setAnteprima(imgUrl);
      setShowCropModal(true);
    }
  }, [fileValues]);

  const clearImageField = () => {
    setAnteprima(null);
    if (methods) {
      methods.reset(
        (fieldName ? { [fieldName]: '' } : { image: '' }) as DefaultValues<T>,
        {
          keepValues: true,
        },
      );
    }
    setCroppedImg(null);
  };

  const handleModalClose = () => {
    clearImageField();
    setShowCropModal(false);
  };

  const handleCropComplete = (_file: File, url: string | null) => {
    setShowCropModal(false);
    setAnteprima(null);
    setCroppedImg(url);
  };

  const renderCropModal = () => {
    return (
      <ImageCropModal
        image={anteprima}
        isOpen={showCropModal}
        onClose={handleModalClose}
        onComplete={handleCropComplete}
      />
    );
  };
  return {
    croppedImg,
    renderCropModal,
    clearImageField,
    setCroppedImg,
  };
};
