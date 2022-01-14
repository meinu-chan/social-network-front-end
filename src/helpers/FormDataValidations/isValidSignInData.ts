import { IModel } from '../../hooks/useModel';
import { isValidEmail, isValidPassword } from '../validations';

const isValidSignInData = (model: IModel) => {
  const errors = [];

  if (!isValidEmail(model.email)) errors.push('email');
  if (!isValidPassword(model.password)) errors.push('password');

  return errors.length === 0;
};

export default isValidSignInData;
