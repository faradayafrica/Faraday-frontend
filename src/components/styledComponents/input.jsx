import React, { Component } from 'react';

class Input extends Component {
  render() {
    const { name, placeholder, error, ...rest } = this.props;
    return (
      <div className='form-group' style={{ marginTop: '1.5rem' }}>
        <label className='sr-only' htmlFor={name}>
          {placeholder}
        </label>
        <input
          // autoFocus
          {...rest}
          name={name}
          id={name}
          className='form-control'
          placeholder={placeholder}
        />
        {error && <div className='alert alert-danger my-2'>{error}</div>}
      </div>
    );
  }
}

export default Input;
