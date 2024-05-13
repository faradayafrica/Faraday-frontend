import React from "react";
import Joi from "joi-browser";
import Form from "../../components/Form";
import Myspinner from "../../../common/components/Spinner";
import faraday from "../../../common/assets/logo.svg";
import addImage from "../../assets/add-imge.svg";
import auth from "../../../common/services/authService";
import { getYear, getMonth } from "../../services/bioServices";
import { Redirect } from "react-router-dom";
import defaultProfile from "../../assets/default-profile.png";
import { CarouselNext } from "src/ui/carousel";

class PersonalData extends Form {
  state = {
    data: {
      imageFile: null,
      image: addImage,
      bio: "",
      day: "",
      month: "",
      year: "",
    },
    redirect: null,
    gender: [
      { name: "Male" },
      { name: "Female" },
      { name: "Non-binary" },
      { name: "Rather not say" },
    ],
    year: [],
    month: [],
    days: {
      thirtyOne: [
        { name: "1" },
        { name: "2" },
        { name: "3" },
        { name: "4" },
        { name: "5" },
        { name: "6" },
        { name: "7" },
        { name: "8" },
        { name: "9" },
        { name: "10" },
        { name: "11" },
        { name: "12" },
        { name: "13" },
        { name: "14" },
        { name: "15" },
        { name: "16" },
        { name: "17" },
        { name: "18" },
        { name: "19" },
        { name: "20" },
        { name: "21" },
        { name: "22" },
        { name: "23" },
        { name: "24" },
        { name: "25" },
        { name: "26" },
        { name: "27" },
        { name: "28" },
        { name: "29" },
        { name: "30" },
        { name: "31" },
      ],
      thirty: [
        { name: "1" },
        { name: "2" },
        { name: "3" },
        { name: "4" },
        { name: "5" },
        { name: "6" },
        { name: "7" },
        { name: "8" },
        { name: "9" },
        { name: "10" },
        { name: "11" },
        { name: "12" },
        { name: "13" },
        { name: "14" },
        { name: "15" },
        { name: "16" },
        { name: "17" },
        { name: "18" },
        { name: "19" },
        { name: "20" },
        { name: "21" },
        { name: "22" },
        { name: "23" },
        { name: "24" },
        { name: "25" },
        { name: "26" },
        { name: "27" },
        { name: "28" },
        { name: "29" },
        { name: "30" },
      ],
      twentyNine: [
        { name: "1" },
        { name: "2" },
        { name: "3" },
        { name: "4" },
        { name: "5" },
        { name: "6" },
        { name: "7" },
        { name: "8" },
        { name: "9" },
        { name: "10" },
        { name: "11" },
        { name: "12" },
        { name: "13" },
        { name: "14" },
        { name: "15" },
        { name: "16" },
        { name: "17" },
        { name: "18" },
        { name: "19" },
        { name: "20" },
        { name: "21" },
        { name: "22" },
        { name: "23" },
        { name: "24" },
        { name: "25" },
        { name: "26" },
        { name: "27" },
        { name: "28" },
        { name: "29" },
      ],
    },

    errors: {},
  };

  schema = {
    imageFile: Joi.required().label("imageFile"),
    image: Joi.required().label("image"),
    bio: Joi.string().max(160).label("Bio"),
    gender: Joi.string().label("Gender"),
    day: Joi.number().label("Day"),
    month: Joi.string().label("Month"),
    year: Joi.string().label("Year"),
  };

  constructor() {
    super();
    this.fileInputRef = React.createRef();
  }

  populateYear() {
    const year = getYear();
    this.setState({ year });
  }
  populateMonth() {
    const month = getMonth();
    this.setState({ month });
  }

  componentDidMount() {
    this.populateYear();
    this.populateMonth();
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <div className="l">
        {/* the spinner */}
        <div id="spinnerContainer" className="spinner-container vanish">
          <Myspinner />
        </div>
        <div className=" text-left mt-12  ml-5">
          <p className="font-bold  text-xl">Your profile details</p>
          <p className="mt-1 text-[#545454] text-sm md:text-[16px]">
            Could you tell us a bit about yourself.
          </p>
        </div>
        <div className="container">
          <form onSubmit={this.handleSubmit} className="flex flex-col gap-5">
            {/* the input fields is being rendered by a method in the parent class "Form" in form.jsx */}
            {this.renderFileInput("image")}

            {this.renderTextArea("bio", "Enter your bio")}
            {/* {this.renderGenderSelect("gender", "Gender", this.state.gender)} */}

            <div className="horinzontal-align label-group relative mt-4">
              <p className="absolute top-0 text-md">Date of birth</p>
              <div className="flex gap-10">
                <div className="col-4 mt-3">
                  {this.renderDateSelect("year", "Year", this.state.year)}
                </div>
                <div className="col-4 mt-3">
                  {this.renderDateSelect("month", "Month", this.state.month)}
                </div>
                <div className="col mt-3">
                  {this.renderDateSelect("day", "Day", this.listDays())}
                </div>
              </div>
            </div>

            {this.renderButton("Next")}
            {/* <button
              className="btn btn-green-outline btn-login my-2 bubbly-button font-medium"
              onClick={this.skipValidation}
            >
              Skip
            </button> */}

            <CarouselNext />
          </form>
        </div>
      </div>
    );
  }

  skipValidation = async () => {
    // window.location = "/qfeed";
    try {
      await auth.refreshJwt();
      this.setState({ ...this.state, redirect: "/qfeed" });
    } catch (e) {
      console.throw(e);
    }
  };

  listDays = () => {
    switch (this.selectedMonth) {
      case "January":
        return this.state.days.thirtyOne;
      case "Febuary":
        return this.state.days.twentyNine;
      case "March":
        return this.state.days.thirtyOne;
      case "April":
        return this.state.days.thirty;
      case "May":
        return this.state.days.thirtyOne;
      case "June":
        return this.state.days.thirty;
      case "July":
        return this.state.days.thirtyOne;
      case "August":
        return this.state.days.thirtyOne;
      case "September":
        return this.state.days.thirty;
      case "October":
        return this.state.days.thirtyOne;
      case "November":
        return this.state.days.thirty;
      case "December":
        return this.state.days.thirtyOne;
      default:
        return this.state.days.thirty;
    }
  };

  doSubmit = async () => {
    //Activate spinner
    const spinner = document.getElementById("spinnerContainer");
    const progress = document.getElementById("progressBar");
    spinner.classList.remove("vanish");

    //onTry
    progress.classList.remove("vanish");
    // call the backend

    // 12-month-2022 : we care only about the month
    const monthIndex = new Date(`12-${this.state.data.month}-2022`).getMonth();

    const date = `${this.state.data.year}-${monthIndex + 1}-${
      this.state.data.day
    }`;

    const formData = new FormData();
    if (
      this.state.data.image ==
      "/static/media/Add Image.b2309ebf700c4fec8376adf1bed746c5.svg"
    ) {
      formData.append("profile_pic", defaultProfile);
    } else {
      formData.append("profile_pic", this.state.data.image);
    }
    formData.append("dob", date);
    formData.append("gender", this.state.data.gender);
    formData.append("bio", this.state.data.bio);

    try {
      // await auth.refreshJwt();
      await auth.updatePersonalDetail(formData);
      await auth.refreshJwt();
      progress.classList.add("progress-100");
      spinner.classList.add("vanish");

      window.location.replace("/");
    } catch (ex) {
      const errors = { ...this.state.errors };
      errors.bio = "Something went wrong, try again later";
      this.setState({ errors });
      spinner.classList.add("vanish");
    }
  };
}

export default PersonalData;
