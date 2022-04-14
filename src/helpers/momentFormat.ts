import moment from 'moment';

const getMomentFormattedDateNow = (): string => moment().format('DD-MM-YYYY');

const formatMessageDateTime = (date: Date): string => moment(date).format('HH:mm');

const formatChatDate = (date: Date): string => {
  const currentDate = moment();
  const dateToFormat = moment(date);

  let format = 'Do MMM';

  if (currentDate.year() !== dateToFormat.year()) format += `, ${dateToFormat.year()}`;

  return dateToFormat.format(format);
};

const getFormattedDate = (date: Date, delimiter = '.') =>
  moment(date).format(['MM', 'DD', 'YYYY'].join(delimiter));

export { getMomentFormattedDateNow, formatMessageDateTime, formatChatDate, getFormattedDate };
