import { Resolver } from 'react-hook-form';
import { NuovoPersonaleFormSchema, NuovoPersonaleFormValues } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  DEFAULT_ACCEPTED_IMAGE_TYPES,
  DEFAULT_MAX_FILE_SIZE,
} from '@/kit/Input/FileUploader';

export const nuovoPersonaleFormCustomResolver: Resolver<
  NuovoPersonaleFormValues
> = async (values, context, options) => {
  const zodValidation = await zodResolver(NuovoPersonaleFormSchema)(
    values,
    context,
    options,
  );

  const imageSizeErr =
    values.image?.size > DEFAULT_MAX_FILE_SIZE &&
    'La dimenzione massima del file è di 3MB.';

  const imagTypeError =
    !DEFAULT_ACCEPTED_IMAGE_TYPES.includes(values.image?.type) &&
    'Solamente i formati .jpg, .jpeg, .png and .webp sono supportati.';

  return {
    values,
    errors: {
      ...zodValidation.errors,
      ...(imageSizeErr || imagTypeError
        ? { image: { type: 'custom', message: imageSizeErr || imagTypeError } }
        : {}),
    },
  };
};
