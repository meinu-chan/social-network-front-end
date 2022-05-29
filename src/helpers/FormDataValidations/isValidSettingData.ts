import { ValidateModel } from './types';
import { isValidPhone, isEmptyString, getTextWithoutSpaces } from '../validations';
import { UserData } from '../../types/User';

type Model = Pick<UserData, 'fullName' | 'phone' | 'university' | 'job' | 'nickname' | 'hobbies'>;

const isValidSettingData: ValidateModel<Model> = (model, validateFunc) => {
  if (isEmptyString(getTextWithoutSpaces(model.fullName))) validateFunc('fullName');
  if (model.phone && !isValidPhone(model.phone)) validateFunc('phone');
  if (model.university && !isEmptyString(model.university)) validateFunc('university');
  if (model.job && !isEmptyString(model.job)) validateFunc('job');
  if (model.nickname && !isEmptyString(model.nickname)) validateFunc('nickname');
  if (model.hobbies && !isEmptyString(model.hobbies)) validateFunc('hobbies');
};

export default isValidSettingData;
