import {
  NEXT_PUBLIC_AWS_S3_BASE_URL,
  NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
  NEXT_PUBLIC_AWS_S3_PRIVATE_KEY,
  NEXT_PUBLIC_AWS_S3_PUBLIC_KEY,
  NEXT_PUBLIC_AWS_S3_REGION,
} from '@/lib/utils';
import { PutObjectRequest } from 'aws-sdk/clients/s3';

import { S3 } from 'aws-sdk';

const s3 = new S3({
  accessKeyId: NEXT_PUBLIC_AWS_S3_PUBLIC_KEY,
  secretAccessKey: NEXT_PUBLIC_AWS_S3_PRIVATE_KEY,
  region: NEXT_PUBLIC_AWS_S3_REGION,
});

type UploadImageResponse = {
  valido: boolean;
  path?: string;
  error?: string;
};

// guide://upmostly.com/next-js/how-to-upload-a-file-to-s3-with-next-js
export const uploadImage = async (
  file?: File | null,
  folderName?: string,
): Promise<UploadImageResponse> => {
  if (!file) {
    return {
      valido: false,
      error: 'Carica un file',
    };
  }
  const fileDir = folderName ? `${folderName}/${file?.name}` : file?.name;
  const params: PutObjectRequest = {
    Bucket: NEXT_PUBLIC_AWS_S3_BUCKET_NAME as string,
    Key: fileDir,
    Body: file,
  };

  try {
    const upload = s3.upload(params);
    // upload.on('httpUploadProgress', (p) => {
    //   console.log(p.loaded / p.total);
    // });
    await upload.promise();
    const response = {
      valido: true,
      path: `${NEXT_PUBLIC_AWS_S3_BASE_URL}/${fileDir}`,
    };
    return response;
  } catch (err) {
    return { valido: false, error: (err as Error)?.message };
  }
};
