import React, { useEffect, useLayoutEffect, useState } from "react";
import Joi from "joi-browser";
import Myspinner from "../../../common/components/Spinner";
import Form from "../../components/Form";
import faraday from "../../../common/assets/logo.svg";
import auth from "../../../common/services/authService";
import {
  getSchools,
  getFaculties,
  getLevel,
} from "../../../common/services/schoolService";
import { Redirect } from "react-router-dom";
import Select from "../../../common/components/form/select";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import PrimaryButton from "../../../common/components/PrimaryButton";
import { Listbox } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSchoolThunk } from "../../../common/features/auth/univastSlice";
import { UnivastStates } from "../../../common/features/auth/univastSlice";

const AddSchoolDetail = () => {
  const [schoolCode, setSchoolCode] = useState(null);
  const [facultySel, setFaultySel] = useState(null);
  const [schoolValue, setSchoolValue] = useState("");
  const [facultyValue, setFacultyValue] = useState("");
  const [departmentValue, setDepartmentValue] = useState("");
  const [levelValue, setLevelValue] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [schoolsData, setSchoolsData] = useState([]);

  const dispatch = useDispatch();
  const { allSchools, status } = useSelector((state) => state.univast);

  useLayoutEffect(() => {
    if (schoolsData.length === 0) {
      setSchoolsData([...allSchools]);
      dispatch(fetchSchoolThunk());
    } else {
    }
  }, [allSchools]);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const getSchoolInfo = (data, label, event) => {
    if (label === "School") {
      setSchoolCode(data.code);
    }
    if (label === "Faculty") {
      setFaultySel(data.name);
    }

    // TODO: Keyboard navigate doesn't work, and this is suppose to be for it
    if (event) {
      if (event.key === "Enter" && label === "School") {
        setSchoolCode(data.code);
      }
      if (event.key === "Enter" && label === "Faculty") {
        setFaultySel(data.name);
      }
    }
  };

  // console.log(values, faculty, "values");

  // const {
  //   data: schoolsData,
  //   isLoading: schoolsLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["schoolsData"],
  //   queryFn: () =>
  //     fetch("https://univast.faraday.africa/academia/schools/NG", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Api-Key ${process.env.REACT_APP_UNIVAST_KEY}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => data.data),
  //   refetchOnWindowFocus: false,
  // });

  const {
    data: facultiesData,
    isLoading: facultyLoading,
    isPaused,
    isRefetching,
    isFetching,
  } = useQuery({
    queryKey: ["facultiesData", schoolCode],
    queryFn: () =>
      fetch(`https://univast.faraday.africa/academia/faculties/${schoolCode}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Api-Key ${process.env.REACT_APP_UNIVAST_KEY}`,
        },
      })
        .then((res) => res.json())
        .then((data) => data.data),
    enabled: !!schoolCode,
    refetchOnWindowFocus: false,
  });

  const { data: departmentData, isLoading: departmentLoading } = useQuery({
    queryKey: ["departmentData", schoolCode, facultySel],
    queryFn: () =>
      fetch(
        `https://univast.faraday.africa/academia/departments/${schoolCode}/${facultySel}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Api-Key ${process.env.REACT_APP_UNIVAST_KEY}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => data.data),
    enabled: !!schoolCode && !!facultySel,
    refetchOnWindowFocus: false,
  });

  // console.log(facultiesData, "facultiesData");

  const onSubmit = async () => {
    const data = {
      school: schoolValue,
      faculty: facultyValue,
      department: departmentValue,
      level: levelValue,
    };

    const progress = document.getElementById("progressBar");
    const spinner = document.getElementById("spinnerContainer");
    spinner.classList.remove("vanish");

    try {
      await auth.updateSchoolDetail(data);
      progress?.classList.add("progress-75");
      spinner?.classList.add("vanish");

      setRedirect(true);

      // window.location.replace("/update-personal-data");
    } catch (ex) {
      if (ex.response && ex.response.status === 500) {
        // const errors = { ...this.state.errors };
        // errors.school = "Something went wrong, try again later";
        // this.setState({ errors });
        spinner.classList.add("vanish");
      } else if (ex.response && ex.response.status === 401) {
        // const errors = { ...this.state.errors };
        // errors.school = `There's an auth error`;
        // this.setState({ errors });
        spinner.classList.add("vanish");
      } else {
        // const errors = { ...this.state.errors };
        // errors.school = "Check your internet connection and try again";
        // this.setState({ errors });
      }
      spinner.classList.add("vanish");
    }
  };

  return (
    <div className="login-page">
      {redirect && <Redirect to="/update-personal-data" />}
      {/* the spinner */}
      <div id="spinnerContainer" className="spinner-container vanish">
        <Myspinner />
      </div>
      <div className="progress-container mx-auto mt-3">
        <div className="progress progress-50"></div>
      </div>
      <div className="form-container">
        <div className="logo-container">
          <img className="logo mx-auto" src={faraday} alt="faraday" />
        </div>
        <h3 className="form-title ">We're almost done</h3>
        <p className="mx-3 extra-info text-md">
          We just need your academic information.
        </p>
        {/* 
       <form
        //  onSubmit={handleSubmit}
       >
         {renderSelect(
           "school",
           "School",
           state.schools.length ? state.schools : []
         )}
         {renderSelect("faculty", "Faculty", state.faculties)}

         {renderSelect("department", "Department", listDepartment())}

         {renderSelect("level", "Level", state.level)}
         {renderButton("Next")}
       </form> */}

        <form onSubmit={handleSubmit(onSubmit)}>
          {console.log(schoolsData, "***********")}
          <Select
            signup
            lists={schoolsData}
            loading={status !== UnivastStates.SUCCESSFUL}
            value={schoolValue}
            setValue={setSchoolValue}
            label={"School"}
            optionClick={getSchoolInfo}
          />
          <Select
            signup
            lists={facultiesData}
            loading={facultyLoading}
            value={facultyValue}
            setValue={setFacultyValue}
            optionClick={getSchoolInfo}
            label={"Faculty"}
            loadingMsg={schoolValue ? "Loading.." : "Please select a school"}
          />
          <Select
            signup
            lists={departmentData}
            loading={departmentLoading}
            value={departmentValue}
            setValue={setDepartmentValue}
            optionClick={getSchoolInfo}
            label={"Department"}
            loadingMsg={facultyValue ? "Loading.." : "Please select a faculty"}
          />
          <Select
            signup
            lists={getLevel()}
            loading={false}
            value={levelValue}
            setValue={setLevelValue}
            optionClick={getSchoolInfo}
            label={"Level"}
            loadingMsg={
              departmentValue ? "Loading.." : "Please select a department"
            }
          />

          <div className="mt-3">
            <PrimaryButton
              cta="Next"
              // disabled={validate()}
              wide
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSchoolDetail;
