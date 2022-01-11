import React, { useEffect } from "react";
import ProfileNav from "../components/profile/ProfileNav";
import ProfileData from "../components/profile/ProfileData";
import "../styles/profile.scss";

function Profile({ user }) {
  // useEffect(() => {
  //   document.querySelector(".nav__border").style.display = "none";
  // }, []);

  return (
    <React.Fragment>
      <div className=''>
        <ProfileNav user={user} />
        <ProfileData user={user} />
      </div>
    </React.Fragment>
  );
}

export default Profile;
