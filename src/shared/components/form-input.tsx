import React from "react";
import { FormInputProps } from "../../types/FormInputProps";
export const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  name,
  type,
  error,
  touched,
  onChange,
  onBlur,
}) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        value={value[name]}
        onChange={onChange}
        onBlur={onBlur}
        className={error[name] && touched.name ? "inp-error" : ""}
      />
      <label htmlFor={value[name]}>{label}</label>
      {error[name] && touched.name && (
        <div className='error'>{error[name]}</div>
      )}
    </div>
  );
};
