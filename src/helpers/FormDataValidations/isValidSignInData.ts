import { ValidateModel } from './types';
import { isValidEmail, isValidPassword } from '../validations';

interface IModel {
  email: string;
  password: string;
}

const isValidSignInData: ValidateModel<IModel> = (model, validateFunc) => {
  if (!isValidEmail(model.email)) validateFunc('email');
  if (!isValidPassword(model.password)) validateFunc('password');
};

export default isValidSignInData;
