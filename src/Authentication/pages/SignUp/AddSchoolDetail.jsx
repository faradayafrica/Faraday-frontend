import React, { useLayoutEffect, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import Tooltip from "react-tooltip-lite";
import Myspinner from "../../../common/components/Spinner";
import faraday from "../../../common/assets/logo.svg";
import auth from "../../../common/services/authService";
import { getLevel } from "../../../common/services/schoolService";
import { Redirect } from "react-router-dom";
import Select from "../../../common/components/form/select";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import PrimaryButton from "../../../common/components/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountryThunk } from "../../../common/features/auth/univastSlice";
import { UnivastStates } from "../../../common/features/auth/univastSlice";
import TipModal from "../../../common/components/Tooltip";
import tooltipicon from "../../assets/Mouse.svg";
import "../../styles/form.css";

const filterData = (query, lists) =>
  query === ""
    ? lists
    : lists.filter((data) =>
        data.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.toLowerCase().replace(/\s+/g, ""))
      );

const AddSchoolDetail = () => {
  const [countryid, setCountryid] = useState(null);
  const [schoolid, setSchoolid] = useState(null);
  const [facultyid, setFaultyid] = useState(null);
  const [departmentid, setDepartmentid] = useState(null);

  const [schoolLogo, setSchoolLogo] = useState("");

  const [countryValue, setCountryValue] = useState("");
  const [schoolValue, setSchoolValue] = useState("");
  const [facultyValue, setFacultyValue] = useState("");
  const [departmentValue, setDepartmentValue] = useState("");
  const [levelValue, setLevelValue] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [countryQuery, setCountryQuery] = useState("");
  const [schoolQuery, setSchoolQuery] = useState("");
  const [facultyQuery, setFacultyQuery] = useState("");
  const [departmentQuery, setDepartmentQuery] = useState("");
  const [levelQuery, setLevelQuery] = useState("");

  const [countriesData, setCountriesData] = useState([]);

  const dispatch = useDispatch();
  const { allCountries, status } = useSelector((state) => state.univast);

  useLayoutEffect(() => {
    if (countriesData.length === 0) {
      dispatch(fetchCountryThunk());
      setCountriesData([...allCountries]);
    } else {
    }
  }, [allCountries]);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const getSchoolInfo = (data, label, event) => {
    if (label === "Country") {
      setCountryid(data.id);
      setSchoolQuery("");
      setSchoolValue("");
      setSchoolid("");

      setFacultyQuery("");
      setFaultyid("");
      setFacultyValue("");

      setDepartmentQuery("");
      setDepartmentValue("");

      setLevelValue("");
    }
    if (label === "School") {
      setSchoolid(data.id);
      setSchoolLogo(data.logo);
      setFacultyQuery("");
      setFaultyid("");
      setFacultyValue("");

      setDepartmentQuery("");
      setDepartmentValue("");

      setLevelValue("");
    }
    if (label === "Faculty") {
      setFaultyid(data.id);

      setDepartmentQuery("");
      setDepartmentValue("");

      setLevelValue("");
    }

    if (label === "Department") {
      setDepartmentid(data.id);
    }

    // TODO: Keyboard navigate doesn't work, and this is suppose to be for it
    if (event) {
      if (event.key === "Enter" && label === "School") {
        setSchoolid(data.code);
      }
      if (event.key === "Enter" && label === "Faculty") {
        setFaultyid(data.name);
      }
    }
  };

  // ######################
  // Get the Schools Data
  // #######################
  const { data: schoolsData, isLoading: schoolLoading } = useQuery({
    queryKey: ["schoolsData", countryid],
    queryFn: () =>
      fetch(`https://univast.faraday.africa/academia/schools/${countryid}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Api-Key ${process.env.REACT_APP_UNIVAST_KEY}`,
        },
      })
        .then((res) => res.json())
        .then((data) => data.data),
    enabled: !!countryid,
    refetchOnWindowFocus: false,
  });

  // ######################
  // Get the Faculty Data
  // #######################
  const { data: facultiesData, isLoading: facultyLoading } = useQuery({
    queryKey: ["facultiesData", schoolid],
    queryFn: () =>
      fetch(`https://univast.faraday.africa/academia/faculties/${schoolid}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Api-Key ${process.env.REACT_APP_UNIVAST_KEY}`,
        },
      })
        .then((res) => res.json())
        .then((data) => data.data),
    enabled: !!countryid && !!schoolid,
    refetchOnWindowFocus: false,
  });

  // ######################
  // Get the Department Data
  // #######################
  const { data: departmentData, isLoading: departmentLoading } = useQuery({
    queryKey: ["departmentData", schoolid, facultyid],
    queryFn: () =>
      fetch(
        `https://univast.faraday.africa/academia/departments/${schoolid}/${facultyid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Api-Key ${process.env.REACT_APP_UNIVAST_KEY}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => data.data),
    enabled: !!countryid && !!schoolid && !!facultyid,
    refetchOnWindowFocus: false,
  });

  const filteredCountryData = filterData(countryQuery, countriesData);
  const filteredSchoolData = filterData(schoolQuery, schoolsData);
  const filteredFacultyData = filterData(facultyQuery, facultiesData);
  const filteredDepartmentData = filterData(departmentQuery, departmentData);
  const filteredLevelData = filterData(
    levelQuery,
    !!countryid && !!schoolid && !!facultyid & !!departmentValue
      ? getLevel()
      : []
  );

  const validate = () => {
    return !(
      !!countryid &&
      !!schoolid &&
      !!facultyid &&
      !!departmentValue &&
      !!levelValue
    );
  };

  const onSubmit = async () => {
    const data = {
      country: countryValue,
      country_id: countryid,

      school: schoolValue,
      school_id: schoolid,
      school_logo: schoolLogo,

      faculty: facultyValue,
      faculty_id: facultyid,

      department: departmentValue,
      department_id: departmentid,

      level: levelValue,
    };

    const progress = document.getElementById("progressBar");
    const spinner = document.getElementById("spinnerContainer");
    spinner.classList.remove("vanish");

    try {
      await auth.updateSchoolDetail(data);
      await auth.refreshJwt();
      progress?.classList.add("progress-75");
      spinner?.classList.add("vanish");

      // setRedirect(true);
      window.location.replace("/");

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleTooltipClick = () => {
    setIsModalOpen(!isModalOpen); // Toggle the isModalOpen state
  };

  return (
    <div className="login-page">
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
        <h3 className="form-title">One last thing...</h3>
        <div className="tooltip-wrapper">
          <p className="mx-12 extra-info text-md">
            Just your academic information and we'll be gone.{" "}
          </p>
          <Tooltip>
            <BsInfoCircle onClick={handleTooltipClick} />
          </Tooltip>
        </div>
        {isModalOpen && (
          <TipModal
            icon={tooltipicon}
            title={`Why do we ask this?`}
            message={`We kindly request your academic information to enhance your Faraday signup experience. By understanding your educational background, we can tailor Faraday to better suit your needs, offer personalized recommendations, and provide relevant resources to support your academic journey`}
            visible={isModalOpen}
            cancel={() => setIsModalOpen(false)}
          />
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Select
            signup
            lists={filteredCountryData}
            loading={status !== UnivastStates.SUCCESSFUL}
            value={countryValue}
            setValue={setCountryValue}
            label={"Country"}
            optionClick={getSchoolInfo}
            setQuery={setCountryQuery}
          />
          <Select
            signup
            lists={filteredSchoolData}
            loading={schoolLoading}
            value={schoolValue}
            setValue={setSchoolValue}
            optionClick={getSchoolInfo}
            label={"School"}
            loadingMsg={countryValue ? "Loading.." : "Please select a Country"}
            setQuery={setSchoolQuery}
          />
          <Select
            signup
            lists={filteredFacultyData}
            loading={facultyLoading}
            value={facultyValue}
            setValue={setFacultyValue}
            optionClick={getSchoolInfo}
            label={"Faculty"}
            loadingMsg={schoolValue ? "Loading.." : "Please select a School"}
            setQuery={setFacultyQuery}
          />
          <Select
            signup
            lists={filteredDepartmentData}
            loading={departmentLoading}
            value={departmentValue}
            setValue={setDepartmentValue}
            optionClick={getSchoolInfo}
            label={"Department"}
            loadingMsg={facultyValue ? "Loading.." : "Please select a Faculty"}
            setQuery={setDepartmentQuery}
          />
          <Select
            signup
            lists={filteredLevelData}
            loading={!!filteredLevelData}
            value={levelValue}
            setValue={setLevelValue}
            optionClick={getSchoolInfo}
            label={"Level"}
            loadingMsg={departmentValue ? " " : "Please select a Department"}
            setQuery={setLevelQuery}
          />

          <div className="mt-3">
            <PrimaryButton cta="Next" disabled={validate()} wide />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSchoolDetail;
