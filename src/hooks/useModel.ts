import { useCallback, useState } from 'react';

export type HandleModelChangeFn<T> = (key: keyof T, value: T[typeof key]) => void;

const useModel = <T>(initialModel: T): [T, HandleModelChangeFn<T>] => {
  const [model, setModel] = useState(initialModel);

  const handleChange = useCallback((key: keyof T, value: T[typeof key]) => {
    setModel((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }, []);

  return [model, handleChange];
};

export default useModel;
