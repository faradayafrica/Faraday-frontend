import React, { useLayoutEffect, useState } from "react";
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
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import "../../styles/form.css";
import { IoChevronBackOutline } from "react-icons/io5";
const filterData = (query, lists) =>
  query === ""
    ? lists
    : lists.filter((data) =>
        data.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.toLowerCase().replace(/\s+/g, ""))
      );

const AddSchoolDetail = ({ user }) => {
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
      await auth.refreshJwt();
      await auth.updateSchoolDetail(data);
      progress?.classList.add("progress-75");
      spinner?.classList.add("vanish");

      // setRedirect(true);
      window.location.replace("/");

      // window.location.replace("/update-personal-data");
    } catch (ex) {
      if (ex.response && ex.response.status === 500) {
        spinner.classList.add("vanish");
      } else if (ex.response && ex.response.status === 401) {
        spinner.classList.add("vanish");
      } else {
      }
      spinner.classList.add("vanish");
    }
  };

  return (
    <div className="">
      {redirect && <Redirect to="/" />}
      {/* the spinner */}
      <div id="spinnerContainer" className="spinner-container vanish">
        <Myspinner />
      </div>
      <div className="w-full container">
        {/* <div className="logo-container">
          <img className="logo mx-auto" src={faraday} alt="faraday" />
        </div> */}
        <div className="flex justify-between items-center mb-10  mx-2">
          <IoChevronBackOutline
            className="p-2 bg-[#F8FAF9] rounded-full cursor-pointer"
            size={35}
          />
          <p className="text-black">Skip</p>
        </div>
        <div className="progress-container mx-auto mt-3">
          <div className="progress progress-50"></div>
        </div>
        <div className=" text-left mt-12  ml-5">
          <p className="font-bold  text-xl">
            Hello <span className="">{user?.profile?.lastname} 👋 </span>
          </p>
          <p className="mt-1 text-[#545454] text-sm md:text-[16px]">
            We need some information about the school you are enrolled in
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
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

        {/* <div
          className="mx-auto text-center mt-3 text-md"
          style={{ maxWidth: "425px", alignText: "center" }}
        >
          <p>
            Couldn't find your school data?
            <NavLink to={"/"} style={{ textDecoration: "none" }}>
              {" "}
              <span className="icon-container-secondary link-brand bubbly-button">
                Skip
              </span>
            </NavLink>{" "}
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default AddSchoolDetail;
