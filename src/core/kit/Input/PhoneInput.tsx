import { ChangeEvent, forwardRef, useState } from 'react';
import {
  PhoneNumberPrefix,
  phoneNumbersPrefix,
} from '@/core/shared/utils/numberPrefixList';
import Select from './Select';
import NumberInput, { NumberInputProps } from './NumberInput';

export type PhoneInputProps = {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
} & Omit<NumberInputProps, 'prefix' | 'maxLength' | 'onChange'>;

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (props, ref) => {
    const [numbPrefix, setNumbPrefix] = useState<string>('+39');
    const sortedPrefix = phoneNumbersPrefix.sort((a, b) => {
      if (a.code > b.code) return 1;
      if (a.code === b.code) return 0;
      return -1;
    });

    return (
      <NumberInput
        {...props}
        prefix={`${numbPrefix} `}
        maxLength={15}
        placeholder={`${numbPrefix} ${props.placeholder}`}
        onChange={(e) => props.onChange && props.onChange(e)}
        ref={ref}
        leftAddon={
          <Select<PhoneNumberPrefix>
            variant={'leftAddon'}
            options={sortedPrefix}
            getKey={({ code }) => code}
            getOptionLabel={({ emoji, code }) => `${emoji} ${code}`}
            getValue={({ prefix }) => prefix}
            onChange={(_e, v) => setNumbPrefix(v as string)}
            value={numbPrefix}
          />
        }
      />
    );
  },
);

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;
