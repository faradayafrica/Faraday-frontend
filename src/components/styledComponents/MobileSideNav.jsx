import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/mobileSideNav.scss";
import { useLocation } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";

// icons import
import logout from "../../images/nav/logout.svg";
import menu from "../../images/nav/menu.svg";
import profile from "../../images/nav/profile.svg";
import bell from "../../images/nav/bell.svg";
import qfeed from "../../images/nav/qfeed.svg";
import close from "../../images/nav/close_md.svg";

function MobileSideNav() {
  const [isQfeed, setQfeed] = useState();
  const [isNotification, setNotification] = useState();
  const [isProfile, setIsProfile] = useState(false);
  const currentUser = getCurrentUser();

  const location = useLocation();

  useEffect(() => {
    setQfeed(location.pathname === "/");
    setNotification(location.pathname === "/notification");
  }, [location.pathname]);

  const renderBottomLink = (focus) => {
    let qfeedClasses = "w-50 h-12 flex justify-center items-center rounded-xl";

    if (focus === true) {
      qfeedClasses += " bg-brand-highlight active-icon";
      return qfeedClasses;
    } else {
      return qfeedClasses;
    }
  };

  useEffect(() => {
    const notAllowedRoutes = [
      `/me/${currentUser.username}`,
      "/notification",
      "/post",
      "/signup",
      "/confirm-email",
      "/update-school-detail",
      "/update-personal-data",
      "/terms-and-condition",
      "/privacy-policy",
      "/login",
      "/logout",
    ];

    if (notAllowedRoutes.includes(location.pathname)) {
      setIsProfile(false);
    } else {
      setIsProfile(true);
    }
  }, [location.pathname]);

  const handleMobileMenuClick = () => {
    let mobileSidenav = document.querySelector(".side");

    mobileSidenav.classList.toggle("side-active");
  };

  return (
    <>
      <div className="mobile-sidenav">
        {/* Hamburger */}
        <div className="w-full fixed top-0 left-0 z-40 p-2">
          {/* fixed top nav for mobile */}
          <div className="ask-shadow rounded-xl bg-white flex justify-between">
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

        {/* fixed bottom nav for mobile */}
        {isProfile && (
          <div className="fixed bottom-0 left-0 z-10 w-full bg-white py-1 px-3 flex border">
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
        )}

        <div className="side">
          <div className="side-container">
            <div className="side-overlay" onClick={handleMobileMenuClick}></div>
            <div className="side-header bg-background  ">
              <div className="flex justify-start  ">
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
                <div className="mt-4 bg-white rounded-xl p-3">
                  <div className="flex items-center">
                    <img
                      src={`https://api.faraday.africa${currentUser?.profile_pic}`}
                      alt={`${currentUser?.first_name} ${currentUser?.last_name}`}
                      className="rounded-full mr-2 h-11 w-11"
                      width="40px"
                      height="40px"
                    />
                    <div>
                      <h2 className="name ">
                        {currentUser?.first_name} {currentUser?.last_name}
                      </h2>
                      <p className="username text-night-secondary">
                        @{currentUser?.username}
                      </p>
                    </div>
                  </div>
                  {/* Number of questions and Soulutions  */}
                  <div className="flex mt-3 text-faraday-night">
                    <p className=" mr-2">
                      <span className="font-semibold">
                        {currentUser?.question_count}{" "}
                      </span>{" "}
                      Questions
                    </p>
                    <p className="">
                      <span className="font-semibold">
                        {currentUser?.solution_count}{" "}
                      </span>{" "}
                      Solution
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="side-links bg-background">
              <div onClick={handleMobileMenuClick}>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <div className="mobile-link bg-white flex items-center rounded-t-xl mx-3 px-3 py-3">
                    <img src={qfeed} alt="qfeed" />
                    <p className="m-0 ml-2 text-lg font-normal text-faraday-night">
                      Qfeed
                    </p>
                  </div>
                </Link>

                <Link to="/notification" style={{ textDecoration: "none" }}>
                  <div className="mobile-link bg-white flex items-center  mx-3 px-3 py-3">
                    <img src={bell} alt="notification" />
                    <p className="m-0 ml-2 text-lg font-normal text-faraday-night">
                      Notification
                    </p>
                  </div>
                </Link>

                <Link
                  to={`/me/${currentUser.username}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="mobile-link bg-white flex items-center rounded-b-xl mx-3 px-3 py-3">
                    <img src={profile} alt="profile" />
                    <p className="m-0 ml-2 text-lg font-normal text-faraday-night">
                      Profile
                    </p>
                  </div>
                </Link>

                <Link to="/logout" style={{ textDecoration: "none" }}>
                  <div className="mt-4 mobile-link bg-white flex items-center rounded-xl mx-3 px-3 py-3">
                    <img src={logout} alt="logout" />
                    <p className="m-0 ml-2 text-lg font-normal text-faraday-night">
                      Logout
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            <span className="version text-night-secondary">
              PointBreak v1.0.0
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileSideNav;
