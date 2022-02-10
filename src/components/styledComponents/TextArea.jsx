import React, { Component } from 'react';

class Input extends Component {
  render() {
    const { isTitle, rows, name, placeholder, error, ...rest } = this.props;
    const classes = isTitle ? 'form-control form-title' : 'form-control';

    return (
      <div className='form-group log ' style={{ marginTop: '1.5rem' }}>
        <label className='sr-only' htmlFor={name}>
          {placeholder}
        </label>
        <textarea
          // autoFocus
          {...rest}
          name={name}
          id={name}
          className={classes}
          placeholder={placeholder}
          rows={rows}
        ></textarea>

        {error && (
          <div className='alert alert-warning my-1 '>
            <div className='dialog-arrow alert-warning'> </div>{' '}
            <p className='m-0 alert-body'>{error}</p>{' '}
          </div>
        )}
      </div>
    );
  }
}

export default Input;
