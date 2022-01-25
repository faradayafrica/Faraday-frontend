import React from "react";
import ProfileNav from "../components/profile/ProfileNav";
import ProfileData from "../components/profile/ProfileData";
import "../styles/profile.scss";
import ProfileInfo from "../components/profile/ProfileInfo";

function Profile({ user }) {
  return (
    <div className='profile__container'>
      <div>
        <ProfileNav user={user} />
        <ProfileData user={user} />
        <ProfileInfo />
      </div>
      <div className='w-100 border profile-trends'></div>
    </div>
  );
}

export default Profile;
