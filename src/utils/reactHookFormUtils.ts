import { DeepMap, FieldError } from "react-hook-form";

export const checkIfErrors = (propName: string, errors: DeepMap<object, FieldError>): boolean => {
  const props = propName.split(".");
  if (props.length > 1) {
    let errorProp: Record<string, any> = errors;
    let hasOwnProp = false;
    props.forEach((element) => {
      hasOwnProp = errorProp.hasOwnProperty(element);
      if (!hasOwnProp) return hasOwnProp;
      errorProp = errorProp[element];
    });
    return hasOwnProp;
  }
  return errors?.hasOwnProperty(propName);
};
export const helperText = (propName: string, errors: DeepMap<object, FieldError>): string => {
  const hasErrors = checkIfErrors(propName, errors);
  const props = propName.split(".");
  let errorProp: Record<string, any> = errors;
  if (hasErrors) {
    props.forEach((element) => {
      errorProp = errorProp[element];
    });
  }
  return hasErrors && errorProp.message;
};
