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
  const [isQfeed, setQfeed] = useState();
  const [isNotification, setNotification] = useState();
  const [isProfile, setIsProfile] = useState(false);
  const currentUser = getCurrentUser();
  // console.log(user);

  // console.log("current Pathname 👉️", window.location.pathname);
  const location = useLocation();

  useEffect(() => {
    // the function you want to call
    setQfeed(location.pathname === "/");
    setNotification(location.pathname === "/notification");
    console.log("Qfeed", location.pathname);
  }, [location.pathname]);

  const renderBottomLink = (focus) => {
    let qfeedClasses = "w-50 h-14 flex justify-center items-center rounded-xl";

    if (focus === true) {
      qfeedClasses += " bg-brand-highlight active-icon";
      return qfeedClasses;
    } else {
      return qfeedClasses;
    }
  };

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
          <div className="w-full fixed top-0 left-0  z-40 p-2">
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

        {/* fixed bottom nav for mobile */}
        <div className="fixed bottom-0 left-0 z-30 w-full bg-white py-2 px-3 flex">
          <Link
            to="/"
            style={{ textDecoration: "none" }}
            className={renderBottomLink(isQfeed)}
          >
            <div>
              <img src={qfeed} alt="qfeed" />
            </div>
          </Link>
          <Link
            to="/notification"
            style={{ textDecoration: "none" }}
            className={renderBottomLink(isNotification)}
          >
            <div className={renderBottomLink(isNotification)}>
              <img src={bell} alt="qfeed" />
            </div>
          </Link>
        </div>

        <div className="side">
          <div className="side-container">
            <div className="side-overlay" onClick={handleMobileMenuClick}></div>
            <div className="side-header bg-white">
              <div className="flex justify-start">
                <div
                  className="p-2 rounded-xl float-left cursor-pointer"
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
                      <p className="username text-night-secondary">
                        @{user?.username}
                      </p>
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
                    <p className="m-0 ml-2 text-lg font-medium text-faraday-night">
                      Qfeed
                    </p>
                  </div>
                </Link>

                <Link to="/notification" style={{ textDecoration: "none" }}>
                  <div className="mobile-link bg-background flex items-center  mx-3 px-3 py-3">
                    <img src={bell} alt="notification" />
                    <p className="m-0 ml-2 text-lg font-medium text-faraday-night">
                      Notification
                    </p>
                  </div>
                </Link>

                <Link
                  to={`/me/${currentUser.username}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="mobile-link bg-background flex items-center rounded-b-xl mx-3 px-3 py-3">
                    <img src={profile} alt="profile" />
                    <p className="m-0 ml-2 text-lg font-medium text-faraday-night">
                      Profile
                    </p>
                  </div>
                </Link>

                <Link to="/logout" style={{ textDecoration: "none" }}>
                  <div className="mt-4 mobile-link bg-background flex items-center rounded-xl mx-3 px-3 py-3">
                    <img src={logout} alt="logout" />
                    <p className="m-0 ml-2 text-lg font-medium text-faraday-night">
                      Logout
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            <span className="version text-night-seconday">
              PointBreak v1.0.0
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileNav;
