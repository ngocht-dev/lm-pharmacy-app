import { useCallback, useState } from 'react';

export type Fields = {
  [key: string]: {
    validator?: (text: string) => string | null | undefined;
    defaultValue?: string;
    notEmpty?: boolean;
    minLength?: number;
  };
};
export type Errors<Values> = {
  [K in keyof Values]: string;
};

export type FieldValue<Values> = {
  [K in keyof Values]: string;
};
function useForm<Values extends Fields>(
  fields: Values,
  onSubmit: (values: FieldValue<Values>) => void
) {
  const [errors, setErrors] = useState<Errors<Values>>(
    Object.keys(fields).reduce(
      (a, v) => ({ ...a, [v]: null }),
      {} as Errors<Values>
    )
  );
  const [values, setValues] = useState<FieldValue<Values>>(
    Object.keys(fields).reduce(
      (a, v) => ({ ...a, [v]: fields[v].defaultValue || '' }),
      {} as FieldValue<Values>
    )
  );
  const validate = () => {
    let canSubmit = true;
    const errorsTemp = {} as Errors<Values>;
    for (const key in fields) {
      const field = fields[key];
      const value = values[key] as string;
      if (field.notEmpty && !value) {
        canSubmit = false;
        errorsTemp[key] = `Required field`;
      }
      if (field.minLength && value.length < field.minLength) {
        canSubmit = false;
        errorsTemp[key] = `Min length is ${field.minLength}`;
      }
      if (field.validator) {
        const error = field.validator(value);
        if (error) {
          canSubmit = false;
          errorsTemp[key] = error;
        }
      }
    }
    setErrors(errorsTemp);
    return canSubmit;
  };
  const setFieldError = useCallback((fieldName: string, err: string | null) => {
    setErrors((preE) => ({
      ...preE,
      [fieldName]: err,
    }));
  }, []);
  const submit = () => {
    const canSubmit = validate();
    if (!canSubmit) return false;
    return onSubmit(values);
  };
  const onChangeField = useCallback((fieldName: string, text: string) => {
    setValues((preV) => ({
      ...preV,
      [fieldName]: text,
    }));
  }, []);
  const onFocusAndBlurField = useCallback((fieldName: string) => {
    setFieldError(fieldName, null);
  }, []);
  return {
    values,
    errors,
    validate,
    submit,
    onChangeField,
    onBlurField: onFocusAndBlurField,
    onFocusField: onFocusAndBlurField,
    setFieldError,
  };
}

export default useForm;
