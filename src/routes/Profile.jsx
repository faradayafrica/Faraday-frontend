import React from "react";
import ProfileNav from "../components/profile/ProfileNav";
import ProfileData from "../components/profile/ProfileData";
import "../styles/profile.scss";
import ProfileInfo from "../components/profile/ProfileInfo";

function Profile({ user }) {
  return (
    <div className='profile__container'>
      <ProfileNav user={user} />
      <ProfileData user={user} />
      <ProfileInfo />
    </div>
  );
}

export default Profile;
