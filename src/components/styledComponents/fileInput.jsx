import React from 'react';

class FileInput extends React.Component {
  constructor() {
    super();
    this.fileInputRef = React.createRef();
  }
  render() {
    const { name, label, ...rest } = this.props;
    return (
      <div className='form-group'>
        <label htmlFor={name} className='sr-only'>
          {label}
        </label>
        <button
          onClick={event => {
            event.preventDefault();
            this.fileInputRef.current.click();
          }}
          className='btn add-profile-btn'
        >
          Add Image
        </button>
        <input
          {...rest}
          name={name}
          id={name}
          className='form-control'
          type='file'
          id={name}
          style={{ display: 'none' }}
          ref={this.fileInputRef}
          accept='images/*'
        />
      </div>
    );
  }
}

export default FileInput;
