import ReactDataPicker, {
  registerLocale,
  ReactDatePickerProps,
} from 'react-datepicker';
import { useRouter } from 'next/router';
import { SyntheticEvent, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { IconProps } from '@chakra-ui/react';
import { LocalesProps } from '@/core/types/locale';
import {
  getLocaleConfig,
  registerDataPickerConfig,
} from '@/core/utils/localeConfig';
import FormControlWrapper, {
  FormControlWrapperProps,
} from '../Form/FormControllerWrapper';
import EseaCalendarHeader from './components/EseaCalendarHaeader';

type BaseDataPickerInline = {
  minDate?: Date | null;
  maxDate?: Date | null;
  isRange?: boolean;
  iconColor?: IconProps['color'];
  onChange: (
    date: Date | null | [Date | null, Date | null],
    e: SyntheticEvent | undefined,
  ) => void;
} & Pick<
  ReactDatePickerProps,
  | 'excludeDates'
  | 'showYearDropdown'
  | 'wrapperClassName'
  | 'showTimeSelect'
  | 'showTimeSelectOnly'
  | 'popperClassName'
  | 'calendarClassName'
  | 'excludeTimes'
  | 'excludeDateIntervals'
  | 'filterTime'
  | 'filterDate'
  | 'startDate'
  | 'endDate'
  | 'onBlur'
>;

export type DataPickerInlineProps = BaseDataPickerInline &
  FormControlWrapperProps;

const DataPickerInline = ({
  startDate,
  endDate,
  minDate,
  maxDate,
  showYearDropdown,
  excludeDates,
  wrapperClassName,
  popperClassName,
  showTimeSelect,
  calendarClassName,
  excludeTimes,
  excludeDateIntervals,
  showTimeSelectOnly,
  isRange,
  filterDate,
  onChange,
  filterTime,
  ...formControlProps
}: DataPickerInlineProps) => {
  const { locale = 'it' } = useRouter(); //TODO da rimuovere it quando si aggiunge lo switcher

  useEffect(() => {
    registerLocale(
      locale as LocalesProps,
      registerDataPickerConfig[locale as LocalesProps],
    );
  }, [locale]);

  const dataFormat = getLocaleConfig(locale as LocalesProps).dateFormat;
  const dataTimeFormat = getLocaleConfig(locale as LocalesProps).dateTimeFormat;
  const timeFormat = getLocaleConfig(locale as LocalesProps).timeFormat;

  const getFormat = () => {
    return showTimeSelectOnly
      ? timeFormat
      : showTimeSelect
      ? dataTimeFormat
      : dataFormat;
  };
  return (
    <FormControlWrapper {...formControlProps}>
      <ReactDataPicker
        locale={locale}
        wrapperClassName={`${wrapperClassName} esea-dp-base`}
        showYearDropdown={showYearDropdown}
        dropdownMode='select'
        dateFormat={getFormat()}
        minDate={minDate}
        maxDate={maxDate}
        onChange={onChange}
        popperClassName={popperClassName}
        excludeDateIntervals={excludeDateIntervals}
        calendarClassName={calendarClassName}
        showTimeSelectOnly={showTimeSelectOnly}
        timeCaption='Ora'
        excludeTimes={excludeTimes}
        excludeDates={excludeDates}
        renderCustomHeader={EseaCalendarHeader}
        inline={true}
        filterDate={filterDate}
        selected={startDate}
        {...(isRange
          ? {
              selectsRange: true,
              startDate: startDate,
              endDate: endDate,
            }
          : {})}
        showTimeSelect={showTimeSelect}
        filterTime={filterTime}
      />
    </FormControlWrapper>
  );
};

export default DataPickerInline;
