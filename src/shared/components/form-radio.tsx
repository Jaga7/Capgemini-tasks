import React from "react";
import { FormRadioProps } from "../../types/FormRadioProps";
export const FormRadio: React.FC<FormRadioProps> = ({
  label,
  value,
  name,
  //   type,
  error,
  touched,
  onChange,
  onBlur,
}) => {
  return (
    <div>
      <input
        type='radio'
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={error[name] && touched.name ? "inp-error" : ""}
      />
      <label htmlFor={name}>{label}</label>
      {error[name] && touched.name && (
        <div className='error'>{error[name]}</div>
      )}
    </div>
  );
};
