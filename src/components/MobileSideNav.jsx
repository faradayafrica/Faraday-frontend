import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "../images/profile1.png";
import "../styles/mobileSideNav.scss";
import { getCurrentUser } from "../services/authService";
import { useLocation } from "react-router-dom";

// icons import
import logout from "../images/nav/logout.svg";
import menu from "../images/nav/menu.svg";
import profile from "../images/nav/profile.svg";
import bell from "../images/nav/bell.svg";
import qfeed from "../images/nav/qfeed.svg";
import close from "../images/nav/close_md.svg";

function MobileNav({ user }) {
  const [isProfile, setIsProfile] = useState(false);
  const currentUser = getCurrentUser();
  // console.log(user);

  const location = useLocation();

  useEffect(() => {
    const allowedRoutes = "/me";

    if (location.pathname.includes(allowedRoutes)) {
      setIsProfile(true);
    } else {
      setIsProfile(false);
    }
  }, [location.pathname]);

  const handleMobileMenuClick = () => {
    let mobileSidenav = document.querySelector(".side");

    mobileSidenav.classList.toggle("side-active");
  };

  return (
    <>
      <div className="mobile-sidenav ">
        {/* Hamburger */}
        {!isProfile && (
          <div className="w-full absolute top-0 left-0  z-40 p-2">
            {/* fixed top nav for mobile */}
            <div className="rounded-xl bg-white flex justify-between">
              <img
                className="p-3 rounded-xl cursor-pointer  "
                data-toggle="tooltip"
                title="mobile-sidenav"
                onClick={handleMobileMenuClick}
                src={menu}
                alt="reveal sidebar"
              />

              <Link
                to={`/me/${currentUser.username}`}
                style={{ textDecoration: "none" }}
              >
                <img
                  className="p-3 rounded-xl cursor-pointer"
                  data-toggle="tooltip"
                  title="view profile"
                  src={profile}
                  alt="profile"
                />
              </Link>
            </div>
          </div>
        )}

        <div className="side">
          <div className="side-container">
            <div className="side-overlay" onClick={handleMobileMenuClick}></div>
            <div className="side-header bg-white">
              <div className="flex justify-start">
                <div
                  className="p-2 bg-background rounded-xl float-left cursor-pointer"
                  data-toggle="tooltip"
                  title="close"
                  onClick={handleMobileMenuClick}
                >
                  <img src={close} alt="" />
                </div>

                <h3 className="text-xl font-bold ">Account info</h3>
              </div>
              <Link
                to={`/me/${currentUser.username}`}
                style={{ textDecoration: "none" }}
                onClick={handleMobileMenuClick}
              >
                <div className="mt-4 bg-background rounded-xl p-3">
                  <div className="flex">
                    <img
                      src={Avatar}
                      alt=""
                      className="rounded-full mr-2 h-10 w-10"
                      width="40px"
                      height="40px"
                    />
                    <div>
                      <h2 className="name ">
                        {user?.first_name} {user?.last_name}
                      </h2>
                      <p className="username">@{user?.username}</p>
                    </div>
                  </div>
                  {/* Number of questions and Soulutions  */}
                  <div className="flex mt-3 text-faraday-night">
                    <p className=" mr-2">
                      <span className="font-semibold">200 </span> Questions
                    </p>
                    <p className="">
                      <span className="font-semibold">10 </span> Solution
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="side-links bg-white">
              <div onClick={handleMobileMenuClick}>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <div className="mobile-link bg-background flex items-center rounded-t-xl mx-3 px-3 py-3">
                    <img src={qfeed} alt="qfeed" />
                    <p className="m-0 ml-2 text-xl font-medium">Qfeed</p>
                  </div>
                </Link>

                <Link to="/notification" style={{ textDecoration: "none" }}>
                  <div className="mobile-link bg-background flex items-center  mx-3 px-3 py-3">
                    <img src={bell} alt="notification" />
                    <p className="m-0 ml-2 text-xl font-medium">Notification</p>
                  </div>
                </Link>

                <Link
                  to={`/me/${currentUser.username}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="mobile-link bg-background flex items-center rounded-b-xl mx-3 px-3 py-3">
                    <img src={profile} alt="profile" />
                    <p className="m-0 ml-2 text-xl font-medium">Profile</p>
                  </div>
                </Link>

                <Link to="/logout" style={{ textDecoration: "none" }}>
                  <div className="mt-4 mobile-link bg-background flex items-center rounded-xl mx-3 px-3 py-3">
                    <img src={logout} alt="logout" />
                    <p className="m-0 ml-2 text-xl font-medium">Logout</p>
                  </div>
                </Link>
              </div>
            </div>

            <span className="version">PointBreak v1.0.0 </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileNav;
