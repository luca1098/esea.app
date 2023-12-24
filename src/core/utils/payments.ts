import { CardType } from '../types/payments';
import { Nullish } from '../types/utils';

export const creditCardType = (cc: Nullish<string>): CardType | undefined => {
  if (!cc) return undefined;
  const amex = new RegExp('^3[47][0-9]{13}$');
  const visa = new RegExp('^4[0-9]{12}(?:[0-9]{3})?$');
  const cup1 = new RegExp('^62[0-9]{14}[0-9]*$');
  const cup2 = new RegExp('^81[0-9]{14}[0-9]*$');

  const mastercard = new RegExp('^5[1-5][0-9]{14}$');
  const mastercard2 = new RegExp('^2[2-7][0-9]{14}$');

  const disco1 = new RegExp('^6011[0-9]{12}[0-9]*$');
  const disco2 = new RegExp('^62[24568][0-9]{13}[0-9]*$');
  const disco3 = new RegExp('^6[45][0-9]{14}[0-9]*$');

  const diners = new RegExp('^3[0689][0-9]{12}[0-9]*$');
  const jcb = new RegExp('^35[0-9]{14}[0-9]*$');

  if (visa.test(cc)) {
    return 'VISA';
  }
  if (amex.test(cc)) {
    return 'AMEX';
  }
  if (mastercard.test(cc) || mastercard2.test(cc)) {
    return 'MASTERCARD';
  }
  if (disco1.test(cc) || disco2.test(cc) || disco3.test(cc)) {
    return 'DISCOVER';
  }
  if (diners.test(cc)) {
    return 'DINERS';
  }
  if (jcb.test(cc)) {
    return 'JCB';
  }
  if (cup1.test(cc) || cup2.test(cc)) {
    return 'CHINA_UNION_PAY';
  }
  return undefined;
};

export function creditCardFormat(value: Nullish<string>) {
  if (!value) return;
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = v.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || '';
  const parts = [];
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  if (parts.length) {
    return parts.join(' ');
  } else {
    return value;
  }
}

export const creditCardBlurred = (value: Nullish<string>) => {
  const first4 = value?.substring(0, 4);
  const last3 = value?.substring(value.length - 3);
  const rest = value?.substring(4, value.length - 3).replace(/[0-9]/g, 'X');

  return `${first4}${rest}${last3}`;
};
