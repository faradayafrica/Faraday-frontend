import { CarouselNext, useCarouselNext } from "src/ui/carousel";
import React, { useState, useEffect } from "react";
import { FiPlus, FiCheck } from "react-icons/fi"; // Icons from React Icons

const ChooseInterest = () => {
  // Define the list of interests (dummy data)
  const interestsData = [
    // "Biochemistry",
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

  // State to track followed interests
  const [followedInterests, setFollowedInterests] = useState([]);

  // State to track whether any interest is selected
  const [interestsSelected, setInterestsSelected] = useState(false);

  // Function to toggle interest follow state
  const toggleInterest = (interest) => {
    if (followedInterests.includes(interest)) {
      // If already followed, unfollow it
      setFollowedInterests(
        followedInterests.filter((item) => item !== interest)
      );
    } else {
      // If not followed, add it to the followed interests
      setFollowedInterests([...followedInterests, interest]);
    }
  };

  // Effect to update interestsSelected state when followedInterests change
  useEffect(() => {
    setInterestsSelected(followedInterests.length > 0);
  }, [followedInterests]);

  return (
    <div>
      <div className="text-left mt-20 ml-5">
        <p className="font-bold text-2xl">Personalize your interests</p>
        <p className="mt-1 text-[#545454] text-sm md:text-[16px]">
          Choose the topics you're interested in seeing on your feed.
        </p>
      </div>
      {/* Map over interests data and display each with toggle icon */}
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
            <span className="text-[14px] font-bold text-[#1C1C1C]">
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
      <button
        className={`font-bold py-2 px-4 rounded w-[580px] mx-5 mt-[10rem] text-white ${
          interestsSelected ? "bg-[#011945]" : "bg-gray-400 cursor-not-allowed"
        }`}
        onClick={() => {
          handleNext();
          console.log(followedInterests);
        }}
        disabled={!interestsSelected}
      >
        Next
      </button>
    </div>
  );
};

export default ChooseInterest;
