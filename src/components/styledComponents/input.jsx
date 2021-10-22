import React, { Component } from 'react';

class Input extends Component {
  render() {
    const { name, type, placeholder, value, error, onChange } = this.props;
    return (
      <div className='form-group' style={{ marginTop: '1.5rem' }}>
        <label className='sr-only' for={name}>
          {name}
        </label>
        <input
          // autoFocus
          value={value}
          onChange={onChange}
          name={name}
          id={name}
          type={type}
          className='form-control'
          placeholder={placeholder}
        />
        {error && <div className='alert alert-danger my-2'>{error}</div>}
      </div>
    );
  }
}

export default Input;
