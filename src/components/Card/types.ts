import { StaticImageData } from 'next/image';

export type CardBarcheProps = {
  id?: string;
  image: string | StaticImageData;
  name: string;
};
