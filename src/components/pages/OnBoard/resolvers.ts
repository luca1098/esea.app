import { Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  DEFAULT_ACCEPTED_IMAGE_TYPES,
  DEFAULT_MAX_FILE_SIZE,
} from '@/kit/Input/FileUploader';
import {
  InfoAziendaFormProps,
  InfoAziendaFormSchema,
  InfoPersonaliFormProps,
  InfoPersonaliFormSchema,
} from './schemas';

export const InfoPersonaleFormCustomResolver: Resolver<
  InfoPersonaliFormProps
> = async (values, context, options) => {
  const zodValidation = await zodResolver(InfoPersonaliFormSchema)(
    values,
    context,
    options,
  );

  const imageSizeErr =
    values.image &&
    values.image?.size > DEFAULT_MAX_FILE_SIZE &&
    'La dimenzione massima del file è di 3MB.';

  const imagTypeError =
    values.image &&
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

export const InfoAziendaFormCustomResolver: Resolver<
  InfoAziendaFormProps
> = async (values, context, options) => {
  const zodValidation = await zodResolver(InfoAziendaFormSchema)(
    values,
    context,
    options,
  );

  const imageSizeErr =
    values.logo &&
    values.logo?.size > DEFAULT_MAX_FILE_SIZE &&
    'La dimenzione massima del file è di 3MB.';

  const imagTypeError =
    values.logo &&
    !DEFAULT_ACCEPTED_IMAGE_TYPES.includes(values.logo?.type) &&
    'Solamente i formati .jpg, .jpeg, .png and .webp sono supportati.';

  return {
    values,
    errors: {
      ...zodValidation.errors,
      ...(imageSizeErr || imagTypeError
        ? { logo: { type: 'custom', message: imageSizeErr || imagTypeError } }
        : {}),
    },
  };
};
