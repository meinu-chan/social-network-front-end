import moment from 'moment';

const getMomentFormattedDateNow = (): string => moment().format('DD-MM-YYYY');

export { getMomentFormattedDateNow };
