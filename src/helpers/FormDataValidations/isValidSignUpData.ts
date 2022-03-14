import { isValidEmail, isValidPassword } from '../validations';

interface IModel {
  email: string;
  password: string;
}

function isValidSignUpData(model: IModel) {
  const errors = [];

  if (!isValidEmail(model.email)) errors.push('email');
  if (!isValidPassword(model.password)) errors.push('password');
  if (model.password !== model.confirmPassword) errors.push('confirmpassword');

  return errors.length === 0;
}

export default isValidSignUpData;
