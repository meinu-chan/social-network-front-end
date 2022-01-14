import { useCallback, useState } from 'react';

export interface IModel {
  [key: string]: any;
}

const useModel = (initialModel: IModel): [IModel, (key: string, value: any) => void] => {
  const [model, setModel] = useState(initialModel);

  const handleChange = useCallback((key: string, value: any) => {
    setModel((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }, []);

  return [model, handleChange];
};

export default useModel;
