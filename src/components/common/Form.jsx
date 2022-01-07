import React, { Component } from 'react';
import Joi from 'joi-browser';
import { Link } from 'react-router-dom';
import Input from '../styledComponents/input';
import Select from '../styledComponents/select';
import '../../animation.scss';

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  selectedFaculty = '';
  selectedMonth = '';

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  imageHandler = e => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        const data = { ...this.state.data };
        data['image'] = reader.result;
        this.setState({ data });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  handleSelectChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    var select = document.getElementById('faculty');
    var text = select.options[select.selectedIndex].text;
    this.selectedFaculty = text;
    // console.log(this.selectedFaculty);

    this.setState({ data, errors });
  };

  handleDateChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    var select = document.getElementById('month');
    var text = select.options[select.selectedIndex].text;
    this.selectedMonth = text;
    console.log(this.selectedMonth);

    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button
        disabled={this.validate()}
        className='btn btn-green btn-login my-2 bubbly-button'
      >
        {label}
      </button>
    );
  }

  renderRedirectBtn(label, link, msg) {
    return (
      <div
        className='mx-auto text-center mt-3 text-md'
        style={{ maxWidth: '425px', alignText: 'center' }}
      >
        <p>
          {msg}
          <Link to={`/${link}`} style={{ textDecoration: 'none' }}>
            {' '}
            <span
              className='icon-container-secondary link-brand bubbly-button'
              style={{}}
            >
              {label} here
            </span>
          </Link>{' '}
        </p>
      </div>
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleSelectChange}
        error={errors[name]}
      />
    );
  }

  renderDateSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleDateChange}
        error={errors[name]}
      />
    );
  }

  renderGenderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderInput(name, placeholder, type = 'text') {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={placeholder}
        placeholder={placeholder}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderFileInput(name) {
    const { data } = this.state;

    return (
      <div className='form-group mt-4'>
        <img
          className='add-profile-btn'
          src={data.image}
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

export default Form;
