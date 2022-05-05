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

const getFormattedDate = (date: Date = new Date(), format = 'MM.DD.YYYY') =>
  moment(date).format(format);

const formatOnlineDate = (date: Date) => {
  const momentDate = moment(date);
  const difference = momentDate.diff(moment(), 'hours');

  if (difference > 24) return momentDate.format('DD.MM at HH:mm');

  if (difference > 5) return momentDate.format('today at HH:mm');

  return momentDate.fromNow();
};

const getDifferenceBetweenDates = (date: Date, compareDate: Date) => {
  const formattedDate = getFormattedDate(date);
  const formattedCompareDate = getFormattedDate(compareDate);

  return moment(formattedCompareDate).isBefore(moment(formattedDate));
};

export {
  getMomentFormattedDateNow,
  formatMessageDateTime,
  formatChatDate,
  getFormattedDate,
  formatOnlineDate,
  getDifferenceBetweenDates,
};
