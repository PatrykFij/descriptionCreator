import moment, { Moment } from 'moment';
import {
  adjustedDateDisplayFormat,
  dateAndTimeDisplayFormat,
  dateDisplayFormat,
} from 'utils/constants';

export const getInitDate = (date: Moment | string | null) =>
  date ? moment(date, dateDisplayFormat) : null;

export const getInitDateTime = (date: Moment | string | null) =>
  date ? moment(date, dateAndTimeDisplayFormat) : null;

export const getInitLocalDateTime = (date: Moment | string | null) =>
  date
    ? moment
        .utc(date, dateAndTimeDisplayFormat)
        .local()
        .format(dateAndTimeDisplayFormat)
    : '';

export const getFormattedDateTime = (date?: string | null) =>
  date ? moment(date).format(dateAndTimeDisplayFormat) : null;

export const getFormattedDate = (date: string | null) =>
  date
    ? moment(date, adjustedDateDisplayFormat).format(dateDisplayFormat)
    : null;

export const getPayloadDate = (date: Moment) =>
  date ? getInitDate(date)!.format(dateDisplayFormat) : null;

export const getPayloadDateTime = (date: Moment) =>
  date ? getInitDate(date)!.format(dateAndTimeDisplayFormat) : null;
