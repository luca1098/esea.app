export const ellipsText = (text: string, length?: number) => {
  const maxLength = length || 10;
  const t = text.trim();
  if (!t || t.length <= maxLength) return t.trim();
  return `${t.substring(0, maxLength - 1)}...`;
};
