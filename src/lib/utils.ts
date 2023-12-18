import { EseaResponse } from '@/core/types/services';

export const isDev = process.env.NODE_ENV === 'development';
export const SALT = Number(process.env.ESEA_SALT);

export const NEXT_PUBLIC_AWS_S3_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_AWS_S3_PUBLIC_KEY;
export const NEXT_PUBLIC_AWS_S3_PRIVATE_KEY =
  process.env.NEXT_PUBLIC_AWS_S3_PRIVATE_KEY;
export const NEXT_PUBLIC_AWS_S3_BUCKET_NAME =
  process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;
export const NEXT_PUBLIC_AWS_S3_REGION = process.env.NEXT_PUBLIC_AWS_S3_REGION;

export const NEXT_PUBLIC_AWS_S3_BASE_URL =
  process.env.NEXT_PUBLIC_AWS_S3_BASE_URL;

export const getErrorReturn = (e: unknown): EseaResponse => {
  if (typeof e === 'string') {
    return {
      valido: false,
      message: e,
    };
  } else if (e instanceof Error) {
    return {
      valido: false,
      message: e.message,
    };
  }
  return {
    valido: false,
    message: 'Errore generico',
  };
};
