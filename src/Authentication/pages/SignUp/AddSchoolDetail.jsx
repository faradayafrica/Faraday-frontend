import React, { useEffect, useLayoutEffect, useState } from "react";
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
import { Box, Modal } from "@mui/material";
import PersonalData from "./PersonalData";
import { CarouselNext, useCarouselNext } from "src/ui/carousel";

const style = {
  position: "absolute",
  top: "10%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: 10,
  bgcolor: "background.paper",
  boxShadow: 24,
  // p: 4,
  width: 500,
  height: 0,
  "@media (max-width: 600px)": {
    width: 350,
  },
};

const filterData = (query, lists) =>
  query === ""
    ? lists
    : lists.filter((data) =>
        data.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.toLowerCase().replace(/\s+/g, ""))
      );

const AddSchoolDetail = ({ user, onNext, schoolDetails }) => {
  const [countryid, setCountryid] = useState(null);
  const [schoolid, setSchoolid] = useState(null);
  const [facultyid, setFaultyid] = useState(null);
  const [departmentid, setDepartmentid] = useState(null);

  const [schoolLogo, setSchoolLogo] = useState("");

  const [countryValue, setCountryValue] = useState(
    schoolDetails.country || null
  );
  const [schoolValue, setSchoolValue] = useState(schoolDetails.school || null);
  const [facultyValue, setFacultyValue] = useState(
    schoolDetails.faculty || null
  );
  const [departmentValue, setDepartmentValue] = useState(
    schoolDetails.department || null
  );
  const [levelValue, setLevelValue] = useState(schoolDetails.level || null);
  const [redirect, setRedirect] = useState(false);

  const [countryQuery, setCountryQuery] = useState("");
  const [schoolQuery, setSchoolQuery] = useState("");
  const [facultyQuery, setFacultyQuery] = useState("");
  const [departmentQuery, setDepartmentQuery] = useState("");
  const [levelQuery, setLevelQuery] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCancel = () => setOpen(false);

  const [success, setSuccess] = useState(false);
  const [countriesData, setCountriesData] = useState([]);
  const [formComplete, setFormComplete] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleNext = useCarouselNext();
  const dispatch = useDispatch();
  const { allCountries, status } = useSelector((state) => state.univast);

  // Effect to update form completion state
  useEffect(() => {
    setFormComplete(
      !!countryValue &&
        !!schoolid &&
        !!facultyid &&
        !!departmentValue &&
        !!levelValue
    );
  }, [countryValue, schoolValue, facultyValue, departmentValue, levelValue]);

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
      progress?.classList.add("progress-75");
      spinner?.classList.add("vanish");

      // setRedirect(true);
      // window.location.replace("/");
      setSuccess(true);
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
    <div className="w-full">
      <div id="spinnerContainer" className="spinner-container vanish">
        <Myspinner />
      </div>
      <div className="">
        <div className="text-left mt-12  ml-5">
          <p className="font-bold  text-2xl">
            Hello <span className=""> {user?.profile?.lastname} 👋 </span>
          </p>
          <p className="mt-1 text-[#545454] text-sm md:text-[16px]">
            Let’s lay the foundation by building your academic bookrock
          </p>
        </div>

        <form className="flex flex-col gap-3">
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
          {/* Display error message if form is incomplete and submitted */}
          {submitted && !formComplete && (
            <p className="text-red-600 text-sm font-semibold mt-2">
              Please fill out all fields before submitting.
            </p>
          )}
          <div className="mt-10 flex justify-between items-center">
            <button
              onClick={async (event) => {
                event.preventDefault();
                console.log(countryValue);
                if (!formComplete) {
                  setSubmitted(true);
                  handleNext();
                  return;
                } else {
                  await onSubmit();
                  handleNext();
                }
              }}
              className={`bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-[#011945] mt-10 w-full ${
                !formComplete ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next
            </button>
          </div>
        </form>
        {/* onSubmit={onSubmit} success={success} */}
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
