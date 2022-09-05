import React from "react";
import Joi from "joi-browser";
import Myspinner from "../components/styledComponents/Spinner";
import Form from "../components/common/Form";
import faraday from "../images/logo.svg";
import auth from "../services/authService";
import { getSchools, getFaculties, getLevel } from "../services/schoolService";
import { Redirect } from "react-router-dom";

class AddSchoolDetail extends Form {
  state = {
    data: {},
    errors: {},
    redirect: null,
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

  populateSchool() {
    const schools = getSchools();
    this.setState({ schools });
  }

  populateFaculty() {
    const faculties = getFaculties();
    this.setState({ faculties });
  }

  //   populateDepartment() {
  //     const departments = getDepartments();
  //     this.setState({ departments });
  //     console.log(this.state.departments.agriculture);
  //   }

  populateLevel() {
    const level = getLevel();
    this.setState({ level });
  }

  componentDidMount() {
    this.populateSchool();
    this.populateFaculty();
    // this.populateDepartment();
    this.populateLevel();

    // console.log(this.state.departments);
  }

  schema = {
    school: Joi.string().required().label("School"),
    faculty: Joi.string().required().label("Faculty"),
    department: Joi.string().required().label("Department"),
    level: Joi.string().required().label("Level"),
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <div className='login-page'>
        {/* the spinner */}
        <div id='spinnerContainer' className='spinner-container vanish'>
          <Myspinner />
        </div>
        <div className='progress-container mx-auto mt-3'>
          <div className='progress progress-50'></div>
        </div>
        <div className='form-container'>
          <div className='logo-container'>
            <img className='logo' src={faraday} alt='faraday' />
          </div>
          <h3 className='form-title '>We’re almost done</h3>
          <p className='mx-3 extra-info text-md'>
            We just need your academic information.
          </p>

          <form onSubmit={this.handleSubmit}>
            {/* the input fields is being rendered by a method in the parent class "Form" in form.jsx */}
            {this.renderSelect("school", "School", this.state.schools)}
            {this.renderSelect("faculty", "Faculty", this.state.faculties)}

            {this.renderSelect(
              "department",
              "Department",
              this.listDepartment()
            )}

            {this.renderSelect("level", "Level", this.state.level)}
            {this.renderButton("Next")}
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
    const progress = document.getElementById("progressBar");
    const spinner = document.getElementById("spinnerContainer");
    spinner.classList.remove("vanish");

    // call the backend
    const { data } = this.state;

    try {
      await auth.updateSchoolDetail(data);
      // window.location = "/update-personal-data";
      progress?.classList.add("progress-75");
      spinner?.classList.add("vanish");
      this.setState({ ...this.state, redirect: "/update-personal-data" });
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

export default AddSchoolDetail;
