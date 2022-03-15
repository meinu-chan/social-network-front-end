import { isPhoneValid, isValidEmail, isValidPassword } from '../validations';
import { ValidateModel } from './types';

interface IModel {
  confirmPassword: string;
  email: string;
  password: string;
  phone?: string;
}

const isValidSignUpData: ValidateModel<IModel> = (model, requestFunc) => {
  if (!isValidEmail(model.email)) requestFunc('email');
  if (!isValidPassword(model.password)) requestFunc('password');
  if (model.password !== model.confirmPassword) requestFunc('confirmPassword');
  if (model.phone && !isPhoneValid(model.phone)) requestFunc('phone');
};

export default isValidSignUpData;
