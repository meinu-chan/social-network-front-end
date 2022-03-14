import { isValidEmail, isValidPassword } from '../validations';

interface IModel {
  email: string;
  password: string;
}

function isValidSignUpData(model: IModel) {
  const errors = [];

  if (!isValidEmail(model.email)) errors.push('email');
  if (!isValidPassword(model.password)) errors.push('password');

  return errors.length === 0;
}

export default isValidSignUpData;
