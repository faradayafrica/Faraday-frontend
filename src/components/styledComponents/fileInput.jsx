import React from 'react';

class FileInput extends React.Component {
  constructor() {
    super();
    this.fileInputRef = React.createRef();
  }
  render() {
    const { name, image, ...rest } = this.props;
    return (
      <div className='form-group mt-4'>
        <img
          className='add-profile-btn'
          src={image}
          id='img'
          alt=''
          onClick={event => {
            this.fileInputRef.current.click();
          }}
        />

        <input
          type='file'
          name='image-upload'
          id={name}
          accept='image/*'
          onChange={this.imageHandler}
          ref={this.fileInputRef}
          style={{ display: 'none' }}
        />
        <label htmlFor={name} className='sr-only'>
          Add Image
        </label>
      </div>
    );
  }
}

export default FileInput;
