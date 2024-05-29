import React, { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";
import auth, { getCurrentUser } from "../../../common/services/authService";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const PeopleToFollow = () => {
  const [people, setPeople] = useState([]);
  const currentUser = getCurrentUser();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getRecommendedUsers = async () => {
      try {
        const data = await auth.fetchRecommendedUsers();
        console.log(data);
        setPeople(data);
      } catch (error) {
        console.error("Error fetching recommended users", error);
      }
    };

    getRecommendedUsers();
  }, []);

  const handleSubmit = async () => {
    await auth.refreshJwt();
    window.location.reload();
  };

  const handleFollowToggle = async (personId, username) => {
    try {
      await auth.followUser(personId, username); // Call the followUser function with personId and username
      const updatedPeople = people.map((person) => {
        if (person.id === personId) {
          return { ...person, followed: !person.followed };
        }
        return person;
      });
      setPeople(updatedPeople);
    } catch (error) {
      console.error("Error following/unfollowing user", error);
    }
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
            className="flex flex-col gap-2 p-2 border-b border-gray-300  w-full md:w-[190px] border rounded-xl"
          >
            <img
              src={person.profile.profile_pic}
              alt={person.username}
              className="w-[5rem] h-[5rem] rounded-[1rem] mr-4"
            />
            <div>
              <p className="text-[15px] font-bold">{person.username}</p>
              <p className="md:truncate w-[70%] text-sm text-[#545454]">
                {person.profile.department}
              </p>
              <p className="text-sm text-[#545454] truncate">
                {person.profile.school}
              </p>
              <p className="text-sm text-[#545454]">{person.profile.level}L</p>
            </div>
            <button
              className={`px-4 py-[2px] rounded-[2rem] w-full flex justify-center text-sm ${
                person.followed
                  ? "bg-[#F1FBEF]"
                  : "bg-green-500 text-white font-[550]"
              }`}
              onClick={() => handleFollowToggle(person.id, person.username)}
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
        onClick={handleSubmit}
        className="bg-gray-400 text-white px-4 py-2 w-full rounded-md hover:bg-[#011945] mt-10 text-center"
      >
        Finish
      </button>
    </div>
  );
};
export default PeopleToFollow;
