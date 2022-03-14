type ValidateFunc<T> = (field: keyof T) => void;

export type ValidateModel<T> = (model: T, validateFunc: ValidateFunc<typeof model>) => void;
