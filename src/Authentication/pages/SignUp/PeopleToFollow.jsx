import React, { useState } from "react";
import defaultProfile from "../../../Authentication/assets/profile image.png";
import defaultProfile2 from "../../../Authentication/assets/profile image-3.png";
import defaultProfile3 from "../../../Authentication/assets/profile image-4.png";
import defaultProfile4 from "../../../Authentication/assets/profile image-5.png";
import defaultProfile5 from "../../../Authentication/assets/profile image.png";
import { FiCheck } from "react-icons/fi";

const PeopleToFollow = () => {
  // Dummy data representing people to follow
  const peopleToFollow = [
    {
      id: 1,
      profileImage: defaultProfile,
      username: "john_doe",
      department: "Electronic and computer Engineering",
      university: "University of XYZ",
      level: "100",
      // followed: false
    },
    {
      id: 2,
      profileImage: defaultProfile2,
      username: "jane_smith",
      department: "Electronic and computer Engineering",
      university: "College ABC",
      level: "200",
      // followed: true
    },
    {
      id: 3,
      profileImage: defaultProfile3,
      username: "jane_doe",
      department: "Computer Science",
      university: "University of XYZ",
      level: "300",
      // followed: false
    },
    {
      id: 4,
      profileImage: defaultProfile4,
      username: "john_smith",
      department: "Civil Engineering",
      university: "College ABC",
      level: "400",
      // followed: true
    },
    {
      id: 5,
      profileImage: defaultProfile5,
      username: "jane_doe",
      department: "Mechanical Engineering",
      university: "University of XYZ",
      level: "500",
      // followed: false
    },
    {
      id: 6,
      profileImage: defaultProfile5,
      username: "jane_doe",
      department: "Electronic and computer Engineering",
      university: "University of XYZ",
      level: "200",
      // followed: false
    },
  ];

  const [people, setPeople] = useState(peopleToFollow);

  const handleFollowToggle = (personId) => {
    const updatedPeople = people.map((person) => {
      if (person.id === personId) {
        return { ...person, followed: !person.followed };
      }
      return person;
    });
    setPeople(updatedPeople);
  };
  return (
    <div className="text-left mt-5 p-3">
      <p className="font-bold text-2xl">Fadets you should follow</p>
      <p className="mt-2 text-[#545454] text-sm md:text-[16px]">
        Choose at least 5 from Fadets with similar interests and academic
        backgrounds to explore Faraday
      </p>

      <div className="flex flex-wrap w-[100%] justify-between gap-y-2 gap-x-[10px] h-[25rem] overflow-x-hidden mt-10">
        {people.map((person) => (
          <div
            key={person.id}
            className="flex flex-col gap-2 p-2 border-b border-gray-300 w-[190px] border rounded-xl"
          >
            <img
              src={person.profileImage}
              alt={person.username}
              className="w-24 h-24 rounded-[1rem] mr-4"
            />
            <div>
              <p className="text-[15px] font-bold">{person.username}</p>
              <p className="truncate w-[70%] text-sm text-[#545454]">
                {person.department}
              </p>
              <p className="text-sm text-[#545454]">{person.university}</p>
              <p className="text-sm text-[#545454]">{person.level}L</p>
            </div>
            <button
              className={`px-4 py-[2px] rounded-[2rem] w-full flex justify-center text-sm ${
                person.followed
                  ? "bg-[#F1FBEF]"
                  : "bg-green-500 text-white font-[550]"
              }`}
              onClick={() => handleFollowToggle(person.id)}
            >
              {person.followed ? (
                <FiCheck className="text-[#05B851]" size={21} />
              ) : (
                "Follow"
              )}
            </button>
          </div>
        ))}
      </div>
      <button
        type="submit"
        // onClick={handleSubmit}
        className="bg-gray-400 text-white px-4 py-2 w-full rounded-md hover:bg-[#011945] mt-10"
      >
        Finish
      </button>
    </div>
  );
};

export default PeopleToFollow;
