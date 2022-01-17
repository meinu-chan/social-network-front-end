import React, { useState } from 'react';
import ImageUpload from '../../../components/ImageUpload';
import { isEmptyString } from '../../../helpers/validations';
import useModel from '../../../hooks/useModel';
import { UpdateUserParams } from '../../../types/User';

type InitialModel = Omit<UpdateUserParams, 'fullName'>;

const initialModel: InitialModel = {
  nickname: '',
  photo: '',
};

function SignUpStep2() {
  const [isError, setIsError] = useState(false);
  const [model, handleModelChange] = useModel<InitialModel>(initialModel);
  return (
    <ImageUpload
      value={model.photo}
      onChange={(link) => handleModelChange('photo', link)}
      folder="users"
      variant="normal"
      isError={isError && isEmptyString(model.photo || '')}
    />
  );
}

export default SignUpStep2;
