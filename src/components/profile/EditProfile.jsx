import React from "react";
import Joi from "joi-browser";
import Form from "../common/Form";

import {
  getSchools,
  getFaculties,
  getLevel,
} from "../../services/schoolService";
import http from "../../services/httpService";
import auth from "../../services/authService";
import Myspinner from "../styledComponents/Spinner";

// const userEndpoint = apiUrl + `/users/${match.params.username}/`;
const userEndpoint = "http://localhost:3002/v1/users/devgenix/";
let username = "";

class EditProfile extends Form {
  state = {
    data: {
      fname: "",
      lname: "",
      bio: "",
      gender: "",
      school: "",
      Faculty: "",
      department: "",
    },
    errors: {},

    gender: [
      { name: "Male" },
      { name: "Female" },
      { name: "Non-binary" },
      { name: "Rather not say" },
    ],
    schools: [],
    faculties: [],
    departments: {
      agriculture: [
        { name: "Agricultural Economics and Extension" },
        { name: "Animal Science and Technology" },
        { name: "Crop Science and Horticulture" },
        { name: "Fisheries and Aquaculture" },
        { name: "Food Science and Technology" },
        { name: "Forestry and Wildlife Management" },
        { name: "Soil Science and Land Resources Management" },
      ],
      arts: [
        { name: "English Language and Literature" },
        { name: "History and International Studies" },
        { name: "Igbo, African and Asian Studies" },
        { name: "Linguistics" },
        { name: "Modern European Languages" },
        { name: "Music" },
        { name: "Philosophy" },
        { name: "Religion and Human Relations" },
        { name: "Theatre and Film Studies" },
        { name: "Chinese" },
      ],

      biosciences: [
        { name: "Applied Biochemistry" },
        { name: "Applied Microbiology and Brewing" },
        { name: "Parasitology and Entomology" },
        { name: "Zoology" },
        { name: "Botany" },
      ],

      education: [
        { name: "Adult Education" },
        { name: "Human Kinetics and Health Education" },
        { name: "Guidance and Counselling" },
        { name: "Science Education" },
        { name: "Education Management and Policy" },
        { name: "Early Childhood and Primary Education" },
        { name: "Library and Information Science" },
        { name: "Education Foundations" },
      ],

      engineering: [
        { name: "Agriculture and Bio-resources Engineering" },
        { name: "Chemical Engineering" },
        { name: "Civil Engineering" },
        { name: "Electronic and Computer Engineering" },
        { name: "Electrical Engineering" },
        { name: "Industrial/Production Engineering" },
        { name: "Mechanical Engineering" },
        { name: "Metallurgical and Materials Engineering" },
        { name: "Polymer and Textile Engineering" },
      ],

      environmental_sciences: [
        { name: "Architecture" },
        { name: "Building" },
        { name: "Environmental Management" },
        { name: "Estate Management" },
        { name: "Fine and Applied Arts" },
        { name: "Geography and Meteorology" },
        { name: "Quantity Surveying" },
        { name: "Surveying and Geo-informatics" },
      ],

      health_sciences: [
        { name: "Medical Laboratory Science" },
        { name: "Medical Rehabilitation" },
        { name: "Nursing Science" },
        { name: "Radiography and Radiological Science" },
      ],

      law: [
        { name: "Commercial and Property Law" },
        { name: "International Law and Jurisprudence" },
        { name: "Public and Private Law" },
      ],

      management_sciences: [
        { name: "Accountancy" },
        { name: "Banking and Finance" },
        { name: "Business Administration" },
        { name: "Cooperative Economics and Management" },
        { name: "Marketing" },
        { name: "Public Administration" },
        { name: "Entrepreneurial Studies" },
      ],

      medicine: [{ name: "Medicine" }],
      pharmaceutical_sciences: [{ name: "Pharmaceutical Sciences" }],
      physical_sciences: [{ name: "Computer Science" }],
      social_sciences: [{ name: "" }],
    },
    level: [],
  };

  populateSchool = () => {
    const schools = getSchools();
    this.setState({ schools });
    // console.log(schools);
  };

  populateFaculty = () => {
    const faculties = getFaculties();
    this.setState({ faculties });
  };

  populateLevel = () => {
    const level = getLevel();
    this.setState({ level });
  };

  //I used this for gender, seems it's being returned from database as lowercase
  capitalizeFirstLetter = (word) =>
    word.charAt(0).toUpperCase() + word.slice(1);

  convertToString = (num) => num.toString();

  mapToViewModel(result) {
    return {
      fname: result.first_name,
      lname: result.last_name,
      bio: result.profile.bio,
      gender: this.capitalizeFirstLetter(result.profile.gender),
      school: result.profile.school,
      faculty: result.profile.faculty,
      department: result.profile.department,
      level: this.convertToString(result.profile.level),
    };
  }

  async componentDidMount() {
    this.populateSchool();
    this.populateFaculty();
    // this.populateDepartment();
    this.populateLevel();

    //this fetch data from the back end
    try {
      const result = await http.get(userEndpoint);
      this.setState({ data: this.mapToViewModel(result.data) });
      username = result.data.username;
      console.log(username);
    } catch (ex) {}
  }

  schema = {
    fname: Joi.string().alphanum().required().label("First name"),
    lname: Joi.string().alphanum().required().label("Last name"),
    bio: Joi.string().max(160).label("Bio"),
    gender: Joi.string().label("Gender"),
    school: Joi.string().required().label("School"),
    faculty: Joi.string().required().label("Faculty"),
    department: Joi.string().required().label("Department"),
    level: Joi.string().required().label("Level"),
  };

  render() {
    return (
      <div className=" profile__container ">
        <div>
          <div id="spinnerContainer" className="spinner-container vanish">
            <Myspinner />
          </div>
          <form onSubmit={this.handleSubmit}>
            <h1 className="section-header">
              Edit Profile {this.props.match.params.username}
            </h1>
            {/* the input fields is being rendered by a method in the parent class "Form" in form.jsx */}
            {this.renderInput("fname", "First name")}
            {this.renderInput("lname", "Last name")}
            {this.renderTextArea("bio", "Your bio", 3)}
            {this.renderGenderSelect("gender", "Gender", this.state.gender)}
            {this.renderSelect("school", "School", this.state.schools)}
            {this.renderSelect("faculty", "Faculty", this.state.faculties)}
            {this.renderSelect(
              "department",
              "Department",
              this.listDepartment()
            )}
            {this.renderSelect("level", "Level", this.state.level)}
            <button
              onClick={this.doSubmit}
              className="btn btn-green btn-login my-2 bubbly-button"
            >
              save
            </button>
          </form>
        </div>
      </div>
    );
  }

  listDepartment = () => {
    switch (this.selectedFaculty) {
      case "Agriculture":
        return this.state.departments.agriculture;
      case "Arts":
        return this.state.departments.arts;
      case "Biosciences":
        return this.state.departments.biosciences;
      case "Education":
        return this.state.departments.education;
      case "Engineering":
        return this.state.departments.engineering;
      case "Environmental Sciences":
        return this.state.departments.environmental_sciences;
      case "Health Sciences":
        return this.state.departments.health_sciences;
      case "Law":
        return this.state.departments.law;
      case "Management Sciences":
        return this.state.departments.management_sciences;
      case "Medicine":
        return this.state.departments.medicine;
      case "Pharmaceutical Sciences":
        return this.state.departments.pharmaceutical_sciences;
      case "Physical Sciences":
        return this.state.departments.physical_sciences;
      case "Social Sciences":
        return this.state.departments.social_sciences;
      default:
        return this.state.departments.agriculture;
    }
  };

  doSubmit = async () => {
    //Activate spinner
    const spinner = document.getElementById("spinnerContainer");
    spinner.classList.remove("vanish");

    // call the backend
    console.log(this.state.data);

    try {
      await auth.editUserProfile(this.state.data);
      window.location = `/me/${username}`;
      spinner.classList.add("vanish");
    } catch (ex) {
      if (ex.response && ex.response.status === 500) {
        const errors = { ...this.state.errors };
        errors.school = "Something went wrong";
        this.setState({ errors });
        spinner.classList.add("vanish");
      } else if (ex.response && ex.response.status === 401) {
        const errors = { ...this.state.errors };
        errors.school = `There's an auth error`;
        this.setState({ errors });
        spinner.classList.add("vanish");
      } else {
        const errors = { ...this.state.errors };
        errors.school = "Check your internet connection and try again";
        this.setState({ errors });
        spinner.classList.add("vanish");
      }
    }
  };
}

export default EditProfile;
