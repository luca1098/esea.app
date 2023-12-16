import { SystemStyleObject } from '@chakra-ui/react';

export const dataPickerStyles: SystemStyleObject = {
  '.react-datepicker-popper': {
    zIndex: 'dropdown',
    padding: 0,
  },
  ' .react-datepicker': {
    bgColor: 'white',
    color: 'esea.primary',
    border: '1px solid var(--esea-app-gray)',
    borderRadius: '.75rem',
    top: '3px',
    px: '8',
    py: '6',
  },
  '.react-datepicker-wrapper': {
    width: 'auto',
  },
  '.react-datepicker__year-select': {
    fontSize: 'lg',
  },
  '.react-datepicker__header': {
    bgColor: 'white',
    border: 'none',
    borderRadius: '.75rem .75rem 0 0',
  },
  '.react-datepicker__current-month, .react-datepicker__day-name': {
    color: 'esea.primary',
    textTransform: 'capitalize',
    fontWeight: 'medium',
  },
  '.react-datepicker__year-dropdown': {
    borderColor: 'esea.primary',
    bgColor: 'white',
  },
  '.react-datepicker__year-dropdown .react-datepicker__year-option:hover': {
    bgColor: 'vita.light',
  },
  '.react-datepicker__navigation--previous': { top: 8, left: 4 },
  '.react-datepicker__navigation--next': { top: 8, right: 4 },
  '.react-datepicker__navigation:hover *::before': {
    borderColor: 'esea.dark',
  },
  '.react-datepicker__navigation-icon::before': {
    borderColor: 'esea.primary',
    top: '11px',
  },
  '.react-datepicker__triangle': {
    display: 'none',
  },
  '.react-datepicker__day': {
    color: 'balck',
  },
  '.react-datepicker__day.react-datepicker__day--disabled': {
    color: 'gray.400',
  },
  '.react-datepicker__day.react-datepicker__day--disabled.react-datepicker__day--excluded':
    {
      bgColor: 'gray.100',
      rounded: 'full',
    },
  '.react-datepicker__day:hover': {
    bgColor: 'vita.light',
    borderRadius: 'full',
  },
  '.react-datepicker__day--today': {
    color: 'black',
  },
  '.react-datepicker__day--today.react-datepicker__day--keyboard-selected': {
    color: 'white',
  },
  '.react-datepicker__day--keyboard-selected': {
    bgColor: 'esea.primary',
    borderRadius: 'full',
    color: 'white',
  },
  '.react-datepicker__day--keyboard-selected:hover': {
    bgColor: 'esea.dark',
    borderRadius: 'full',
  },
  '.react-datepicker__day--in-selecting-range:not(.react-datepicker__day--in-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--in-range)':
    {
      bgColor: 'esea.primary',
      borderRadius: 'full',
      color: 'white',
    },
  '.react-datepicker__day--in-range, .react-datepicker__day--selected': {
    bgColor: 'esea.primary',
    borderRadius: 'full',
    color: 'white',
  },
  '.react-datepicker__day--in-range, .react-datepicker__day--selected:hover': {
    bgColor: 'esea.dark',
    borderRadius: 'full',
  },
  '.react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected':
    {
      bgColor: 'esea.primary',
    },
  '.react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected:hover':
    {
      bgColor: 'esea.blueLight',
    },
  '.esea-dp-base': {
    width: '100%',
  },
  '.esea-event-calendar': {
    display: 'flex',
    boxShadow: 'card',
    border: '1px solid',
    p: 4,
    borderColor: 'gray.200',
    '.react-datepicker__navigation--previous': { top: 4, left: 4 },
    '.react-datepicker__navigation--next': { top: 4, right: 24 },
  },
};
