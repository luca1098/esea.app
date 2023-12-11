import ReactDataPicker, {
  registerLocale,
  ReactDatePickerProps,
} from 'react-datepicker';
import { useRouter } from 'next/router';
import { ChangeEvent, forwardRef, useEffect } from 'react';
import { registerDataPickerConfig } from '@/core/utils/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { Icon, IconProps } from '@chakra-ui/react';
import { LocalesProps } from '@/core/shared/types/locale';
import { CalendarIcon } from '../Icons/icons';
import Input, { InputProps } from './Input';

type BaseDataPicker = {
  selectDate: Date | null;
  minDate?: Date | null;
  maxDate?: Date | null;
  iconColor?: IconProps['color'];
  onDataChange: (
    d: Date | null,
    event: ChangeEvent<HTMLInputElement> | undefined,
  ) => void;
  id?: string;
} & Pick<
  ReactDatePickerProps,
  'excludeDates' | 'showYearDropdown' | 'wrapperClassName'
>;

export type DataPickerProps = BaseDataPicker & Omit<InputProps, 'width'>;

const DataPicker = forwardRef<HTMLInputElement, DataPickerProps>(
  (
    {
      onDataChange,
      selectDate,
      minDate,
      maxDate,
      showYearDropdown,
      id,
      excludeDates,
      placeholder,
      wrapperClassName,
      iconColor,
      ...inputProps
    },
    ref,
  ) => {
    const { locale = 'it' } = useRouter(); //TODO da rimuovere it quando si aggiunge lo switcher

    useEffect(() => {
      registerLocale(
        locale as LocalesProps,
        registerDataPickerConfig[locale as LocalesProps],
      );
    }, [locale]);

    return (
      <ReactDataPicker
        locale={locale}
        placeholderText={placeholder}
        id={id ? id : 'data-input'}
        selected={selectDate}
        wrapperClassName={`${wrapperClassName} esea-dp-base`}
        showYearDropdown={showYearDropdown}
        dropdownMode='select'
        dateFormat={'dd/MM/yyyy'}
        minDate={minDate}
        maxDate={maxDate}
        onChange={onDataChange}
        withPortal
        onSelect={() => console.log('###', { ref: ref })}
        popperPlacement='bottom'
        excludeDates={excludeDates}
        customInput={
          <Input
            {...inputProps}
            ref={ref}
            isReadOnly
            width={'full'}
            position={'relative'}
            rightElement={
              <Icon
                as={CalendarIcon}
                color={iconColor ? iconColor : 'esea.primary'}
              />
            }
          />
        }
      />
    );
  },
);
DataPicker.displayName = 'DataPicker';

export default DataPicker;
