import React from "react";

const Select = ({ name, label, options, error, register, ...rest }) => {
  return (
    <div className='form-group log'>
      <label className='sr-only' htmlFor={name}>
        {label}
      </label>
      <select
        name={name}
        id={name}
        {...register}
        // {...rest}
        className='form-control '
        placeholder={name}
      >
        {/* <option value=' ' /> */}
        <option value={null} data-code={label}>
          {label}
        </option>
        {options?.map((option) => (
          <option key={option.name} value={option.name} data-code={option.code}>
            {option.name}
          </option>
        ))}
      </select>
      {error && (
        <div className='alert alert-warning my-1 '>
          <div className='dialog-arrow alert-warning'> </div>{" "}
          <p className='m-0 alert-body'>{error}</p>{" "}
        </div>
      )}
    </div>
  );
};

export default Select;
