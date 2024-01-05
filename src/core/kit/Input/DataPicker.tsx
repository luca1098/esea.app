import ReactDataPicker, {
  registerLocale,
  ReactDatePickerProps,
} from 'react-datepicker';
import { useRouter } from 'next/router';
import { ChangeEvent, forwardRef, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Icon, IconProps } from '@chakra-ui/react';
import { LocalesProps } from '@/core/types/locale';
import { CalendarIcon, TimeIcon } from '../Icons/icons';
import Input, { InputProps } from './Input';
import {
  getLocaleConfig,
  registerDataPickerConfig,
} from '@/core/utils/localeConfig';

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
  | 'excludeDates'
  | 'showYearDropdown'
  | 'wrapperClassName'
  | 'withPortal'
  | 'showTimeSelect'
  | 'showTimeSelectOnly'
  | 'popperClassName'
  | 'calendarClassName'
  | 'excludeTimes'
  | 'excludeDateIntervals'
  | 'filterTime'
  | 'minTime'
  | 'inline'
  | 'selectsRange'
  | 'startDate'
  | 'endDate'
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
      popperClassName,
      iconColor,
      withPortal = true,
      showTimeSelect,
      calendarClassName,
      excludeTimes,
      excludeDateIntervals,
      showTimeSelectOnly,
      minTime,
      inline,
      selectsRange,
      filterTime,
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

    const dataFormat = getLocaleConfig(locale as LocalesProps).dateFormat;
    const dataTimeFormat = getLocaleConfig(
      locale as LocalesProps,
    ).dateTimeFormat;
    const timeFormat = getLocaleConfig(locale as LocalesProps).timeFormat;

    const getFormat = () => {
      return showTimeSelectOnly
        ? timeFormat
        : showTimeSelect
        ? dataTimeFormat
        : dataFormat;
    };
    return (
      <ReactDataPicker
        locale={locale}
        placeholderText={placeholder}
        id={id ? id : 'data-input'}
        selected={selectDate}
        wrapperClassName={`${wrapperClassName} esea-dp-base`}
        showYearDropdown={showYearDropdown}
        dropdownMode='select'
        dateFormat={getFormat()}
        minDate={minDate}
        maxDate={maxDate}
        onChange={onDataChange}
        popperClassName={popperClassName}
        withPortal={withPortal}
        excludeDateIntervals={excludeDateIntervals}
        calendarClassName={calendarClassName}
        showTimeSelectOnly={showTimeSelectOnly}
        timeCaption='Ora'
        excludeTimes={excludeTimes}
        popperPlacement='bottom'
        excludeDates={excludeDates}
        inline={inline}
        selectsRange={selectsRange}
        showTimeSelect={showTimeSelect}
        filterTime={filterTime}
        customInput={
          <Input
            {...inputProps}
            ref={ref}
            isReadOnly
            width={'full'}
            position={'relative'}
            rightElement={
              <Icon
                as={showTimeSelectOnly ? TimeIcon : CalendarIcon}
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
