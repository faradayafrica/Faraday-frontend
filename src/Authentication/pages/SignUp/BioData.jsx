import React, { useState, useEffect } from "react";
import axios from "axios";
import auth from "../../../common/services/authService";
import { TbCameraPlus } from "react-icons/tb";
import { useCarouselNext } from "src/ui/carousel";
import Myspinner from "../../../common/components/Spinner";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const BioData = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleNext = useCarouselNext();

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    setProfilePic(selectedFile);
  };

  useEffect(() => {
    const isProfilePicFilled = !!profilePic;
    const isBioFilled = !!bio.trim();
    const isGenderFilled = !!gender;
    const isDateOfBirthFvilled = !!dateOfBirth;

    setIsFormComplete(
      isProfilePicFilled &&
        isBioFilled &&
        isGenderFilled &&
        isDateOfBirthFvilled
    );
  }, [profilePic, bio, gender, dateOfBirth]);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const imageUrl = await uploadImage(profilePic);

      const formattedDate = dateOfBirth.format("YYYY-MM-DD");
      const formData = new FormData();
      formData.append("bio", bio);
      formData.append("gender", gender);
      formData.append("dob", formattedDate);
      formData.append("image", imageUrl);

      const response = await auth.updatePersonalDetail(formData);

      console.log("Data submitted successfully:", response.data);

      setIsLoading(false);
      setSubmitted(true);
      handleNext();
    } catch (error) {
      console.error("Error submitting data:", error);
      setIsLoading(false);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "jb9mgkw8");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/faraday-africa/image/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleRemoveImage = () => {
    setProfilePic(null);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!isFormComplete) {
      setSubmitted(true);
    } else {
      setSubmitted(false);
      await handleSubmit();
      handleNext();
    }
  };

  return (
    <div className="">
      <div className="flex flex-col gap-4 p-2">
        <div className="items-center gap-2">
          {isLoading && (
            <div className="flex justify-center items-center absolute index bg-white bg-opacity-60 top-0 w-full h-full cursor-wait">
              <div className="loader"></div>
            </div>
          )}

          <div className="text-left mt-5 ml-5">
            <p className="font-bold text-2xl">Your Mark, Make It Personal</p>
            <p className="mt-1 text-[#545454] text-sm md:text-[16px]">
              Tell us, what’s your unique personality?
            </p>
          </div>

          <div className="flex justify-center items-center mt-5 mb-1">
            {profilePic ? (
              <div className="flex flex-col gap-4 items-center">
                <img
                  src={URL.createObjectURL(profilePic)}
                  alt="Profile Preview"
                  className="w-[106px] h-[100px] rounded-[1rem] object-cover border-2 border-brand"
                />
                <button
                  onClick={handleRemoveImage}
                  className="text-red-500 font-semibold ml-2 bg-[#FEE2E2] py-2 px-3 rounded-[2rem]"
                >
                  Remove Image
                </button>
              </div>
            ) : (
              <label
                htmlFor="profilePic"
                className="cursor-pointer h-[44px] w-[13rem] flex items-center gap-2 justify-center border border-custom-gradient rounded-[2rem] font-semibold text-[15px]"
              >
                <TbCameraPlus size={24} />
                <p className="text-center">Add a profile image</p>
              </label>
            )}
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              accept="image/*"
              onChange={handleImageUpload}
              hidden
            />
          </div>
        </div>

        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell Us About Yourself"
          className="p-4 rounded-md resize-none bg-[#F8FAF9] shadow-sm shadow-[#AFAFAF] h-[150px]"
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={["DatePicker", "DatePicker"]}
            className="p-0"
          >
            <DatePicker
              label="Date of birth (DD/MM/YYYY)"
              value={dateOfBirth}
              onChange={(newValue) => setDateOfBirth(newValue)}
              className="date-picker"
            />
          </DemoContainer>
        </LocalizationProvider>

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="p-3 rounded-md bg-[#F8FAF9] shadow-sm shadow-[#AFAFAF] focus:outline-none w-full"
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        {submitted && !isFormComplete && (
          <p className="text-red-600 text-sm font-semibold mt-2">
            Please fill out all fields and upload a profile image before
            submitting.
          </p>
        )}

        <button
          type="submit"
          onClick={handleFormSubmit}
          className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-[#011945] mt-10"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BioData;
