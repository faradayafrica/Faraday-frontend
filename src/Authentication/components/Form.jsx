import React, { Component } from "react";
import Joi from "joi-browser";
import axios from "axios";
import { Link } from "react-router-dom";
import Input from "../../common/components/form/input";
import TextArea from "../../common/components/form/TextArea";
import Select from "../../common/components/form/select";
import PrimaryButton from "../../common/components/PrimaryButton";
// import Myspinner from "../../components/styledComponents/Spinner";
import "../styles/form.css";
import { ErrorToast } from "../../common/components/CustomToast";
// import { ReactComponent as EyeIcon } from "../../common/assets/eye-icon.svg";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  selectedSchoolCode = "";
  selectedFaculty = "";
  selectedMonth = "";

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

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  uploadImage = (file) => {
    const spinner = document.getElementById("spinnerContainer");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "jb9mgkw8");

    axios
      .post(
        "https://api.cloudinary.com/v1_1/faraday-africa/image/upload",
        formData
      )
      .then((resp) => {
        const data = { ...this.state.data };
        data["image"] = resp.data.secure_url;
        data["imageFile"] = file;
        spinner.classList.add("vanish");
        this.setState({ data });
      })
      .catch((err) => {
        ErrorToast("Couldn't upload image");
        spinner.classList.add("vanish");
      });
  };

  imageHandler = (file) => {
    const spinner = document.getElementById("spinnerContainer");
    spinner.classList.remove("vanish");

    this.uploadImage(file);
    var url = URL.createObjectURL(file);
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

    var selectFac = document.getElementById("faculty");
    var text = selectFac.options[selectFac.selectedIndex].text;
    this.selectedFaculty = text;

    let selectSch = document.getElementById("school");
    var selectSchCode = selectSch.options[selectSch.selectedIndex].dataset.code;
    this.selectedSchoolCode = selectSchCode;

    this.setState({ data, errors });
  };

  handleDateChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    var select = document.getElementById("month");
    var text = select.options[select.selectedIndex].text;
    this.selectedMonth = text;

    this.setState({ data, errors });
  };

  renderButton(label, isFluid) {
    return (
      <div className="mt-3">
        <PrimaryButton cta={label} disabled={this.validate()} wide />
      </div>
    );
  }

  renderRedirectBtn(label, link, msg) {
    return (
      <div
        className="mx-auto text-center mt-3 text-md"
        style={{ maxWidth: "425px", alignText: "center" }}
      >
        <p>
          {msg}
          <Link to={`/${link}`} style={{ textDecoration: "none" }}>
            {" "}
            <span className="icon-container-secondary link-brand bubbly-button">
              {label} here
            </span>
          </Link>{" "}
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

  renderInput(name, placeholder, type = "text") {
    const { data, errors } = this.state;

    return (
      <div className="form-group">
        <input
          type={type}
          name={name}
          value={data[name]}
          label={placeholder}
          placeholder={placeholder}
          onChange={this.handleChange}
          className={`form-control ${errors[name] ? "is-invalid" : ""}`}
        />
      </div>
    );
  }

  renderPassword(name, placeholder, type = "text") {
    const { data, errors } = this.state;

    return (
      <div className="relative">
        <Input
          type={type}
          name={name}
          value={data[name]}
          label={placeholder}
          placeholder={placeholder}
          onChange={this.handleChange}
          className={`form-control ${errors[name] ? "is-invalid" : ""}`}
        />

        <button
          onClick={() => {
            const showPassword = !this.state.showPassword;
            this.setState({ showPassword });
          }}
          className="absolute top-[50%] -translate-x-[50%] -translate-y-[50%] right-0 text-sm cursor-pointer w-fit"
        >
          {this.state.showPassword ? (
            <IoMdEyeOff fill="#9DA1A7" size="24" />
          ) : (
            <IoMdEye fill="#9DA1A7" size="24" />
          )}
        </button>
      </div>
    );
  }

  renderTextArea(name, placeholder, rows = 2, isTitle) {
    const { data, errors } = this.state;

    return (
      <TextArea
        type="text"
        name={name}
        rows={rows}
        value={data[name]}
        label={placeholder}
        isTitle={isTitle}
        placeholder={placeholder}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderFileInput(name) {
    const { data } = this.state;

    return (
      <div className="form-group m-0  mx-auto">
        <img
          className="add-profile-btn cursor-pointer"
          src={data.image}
          id="img"
          alt=""
          onClick={(event) => {
            this.fileInputRef.current.click();
          }}
        />

        <input
          type="file"
          name="image-upload"
          id={name}
          accept="image/*"
          onChange={(event) => this.imageHandler(event.target.files[0])}
          ref={this.fileInputRef}
          style={{ display: "none" }}
        />
        <label htmlFor={name} className="sr-only">
          Add Image
        </label>
      </div>
    );
  }
}

export default Form;
