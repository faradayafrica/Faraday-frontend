import { CarouselNext, useCarouselNext } from "src/ui/carousel";
import React, { useState, useEffect } from "react";
import { FiPlus, FiCheck } from "react-icons/fi"; // Icons from React Icons
import { updateUserInterests } from "../../../common/services/authService"; // Import the function

const ChooseInterest = () => {
  // Define the list of interests (dummy data)
  const interestsData = [
    "Science",
    "Chemistry",
    "Physics",
    "Biology",
    "Literature",
    "Research",
    "History",
    "Biochemistry",
    "Language",
    "Social",
    "Computer",
    "Engineering",
    "Statistics",
  ];

  const handleNext = useCarouselNext();
  const [followedInterests, setFollowedInterests] = useState([]);
  const [interestsSelected, setInterestsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleInterest = (interest) => {
    if (followedInterests.includes(interest)) {
      setFollowedInterests(
        followedInterests.filter((item) => item !== interest)
      );
    } else {
      setFollowedInterests([...followedInterests, interest]);
    }
  };

  useEffect(() => {
    setInterestsSelected(followedInterests.length > 0);
  }, [followedInterests]);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      console.log(followedInterests);
      await updateUserInterests(followedInterests);
      console.log("Interests submitted successfully");

      setIsLoading(false);
      setSubmitted(true);
      handleNext();
    } catch (error) {
      console.error("Error submitting interests:", error);
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!interestsSelected) {
      setSubmitted(true);
    } else {
      setSubmitted(false);
      await handleSubmit();
      handleNext();
    }
  };

  return (
    <div className="h-full">
      {isLoading && (
        <div className="flex justify-center items-center absolute index bg-white bg-opacity-60 top-0 w-full h-full cursor-wait">
          <div className="loader"></div>
        </div>
      )}
      <div className="text-left mt-5 ml-5">
        <p className="font-bold text-2xl">Personalize your interests</p>
        <p className="mt-1 text-[#545454] text-sm md:text-[16px]">
          Choose the topics you're interested in seeing on your feed.
        </p>
      </div>
      {/* Map over interests data and display each with toggle icon */}
      <div className="flex flex-col h-[80%] justify-between">
        <div className="flex flex-wrap gap-5 mt-12 ml-5">
          {interestsData.map((interest) => (
            <div
              key={interest}
              className={`flex items-center justify-between p-2 rounded-[2rem] w-[8rem] border ${
                followedInterests.includes(interest)
                  ? "bg-gradient-to-r from-yellow-50 to-green-400"
                  : "bg-white"
              }`}
            >
              <span className="text-[13px] font-bold text-[#1C1C1C]">
                {interest}
              </span>
              <button onClick={() => toggleInterest(interest)}>
                {followedInterests.includes(interest) ? (
                  <FiCheck className="text-white" />
                ) : (
                  <FiPlus />
                )}
              </button>
            </div>
          ))}
        </div>
        <p className="">
          {submitted && !interestsSelected && (
            <p className="text-red-600 text-sm font-semibold pt-6 text-center">
              Please Personalize your interests before submitting.
            </p>
          )}
        </p>
        <button
          type="submit"
          onClick={handleFormSubmit}
          className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-[#011945]  w-full"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ChooseInterest;
