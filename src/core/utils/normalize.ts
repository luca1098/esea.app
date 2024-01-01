import { InputProps } from '@/kit/Input/Input';

export const ellipsText = (text: string, length?: number) => {
  const maxLength = length || 10;
  const t = text?.trim();
  if (!t || t.length <= maxLength) return t?.trim();
  return `${t.substring(0, maxLength - 1)}...`;
};

export const inputToUppercase = (value?: InputProps['value']) => {
  if (!value) return '';
  return String(value).toUpperCase();
};
