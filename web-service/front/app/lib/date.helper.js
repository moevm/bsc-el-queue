import moment from 'moment'

export const DottedDateFormat = 'DD.MM.YYYY'
export const DottedDateTimeFormat = 'DD.MM.YY, HH:mm'
export const RFC3339DateFormat = 'YYYY-MM-DD'
export const HumanReadableMonth = 'MMMM'
export const HumanReadableFormat = 'D MMMM YYYY'
export const HumanReadableDayMonthFormat = 'D MMMM'
export const HumanReadableDayMonthTimeFormat = 'D MMMM, HH:mm'

export const toDottedDate = date => moment(date).format(DottedDateFormat)
export const toDottedDateTime = date => moment(date).format(DottedDateTimeFormat)
export const toRFC3339Date = date => moment(date).format(RFC3339DateFormat)
export const toHumanReadableDate = date => moment(date).format(HumanReadableFormat)
export const toHumanReadableMonth = date => moment(date).format(HumanReadableMonth)
export const toHumanReadableDayMonth = date => moment(date).format(HumanReadableDayMonthFormat)
export const toHumanReadableDayMonthTime = date => moment(date).format(HumanReadableDayMonthTimeFormat)

export const isValidDateString = (date, format) => moment(date, format, true).isValid()

export const formatDate = format => date => moment(date).format(format)
