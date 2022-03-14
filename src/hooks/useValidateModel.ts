import { useState } from 'react';

type IModel<T> = {
  [K in keyof T]: T[K] | boolean;
};

function useValidateModel<T>(model: IModel<T>) {
  type ModelKey = keyof typeof model;

  const initialModel = Object.keys(model).reduce<typeof model>(
    (acc, key) => ({ ...acc, [key]: true }),
    model
  );

  const [valid, setValid] = useState<typeof initialModel>(initialModel);
  const [isValid, setIsValid] = useState(true);

  const validateModel = (field: ModelKey) => {
    setValid((state) => {
      state[field] = false;
      return state;
    });
    setIsValid(false);
  };

  const setDefaultValidationState = () => {
    setValid(initialModel);
    setIsValid(true);
  };

  return {
    valid,
    isValid,
    validateModel,
    setDefaultValidationState,
  };
}

export default useValidateModel;
