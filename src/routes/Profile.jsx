import React, { useEffect, useState } from "react";
import ProfileNav from "../components/profile/ProfileNav";
import Loader from "../components/styledComponents/Loader";
import ProfileData from "../components/profile/ProfileData";
import "../styles/profile.scss";
import ProfileInfo from "../components/profile/ProfileInfo";
import { apiUrl } from "../config.json";
import http from "../services/httpService";

function Profile({ match }) {
  const userEndpoint = apiUrl + `/users/${match.params.username}/`;
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUser() {
      const result = await http.get(userEndpoint);
      setUser(result.data);
      console.log(user);
    }

    getUser();
  }, []);

  return user.username ? (
    <div className='profile__container'>
      <div>
        {/* hi {user.username} */}
        <ProfileNav user={user} />
        <ProfileData user={user} />
        <ProfileInfo />
      </div>
      <div className='w-100 border profile-trends'></div>
    </div>
  ) : (
    <Loader />
  );
}

export default Profile;
