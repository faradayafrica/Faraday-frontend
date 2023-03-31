import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

// icons import
import logout from "../assets/nav/logout.svg";
import menu from "../assets/nav/menu.svg";
import profile from "../assets/nav/profile.svg";
import bell from "../assets/nav/bell.svg";
import qfeed from "../assets/nav/qfeed.svg";
import close from "../assets/nav/close_md.svg";

//styles import
import "../styles/mobileSideNav.scss";
import "../styles/topnav.css";
import { currentUserThunk } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "./PrimaryButton";

function MobileSideNav() {
  const [isQfeed, setQfeed] = useState();
  const [isNotification, setNotification] = useState();
  const [isProfile, setIsProfile] = useState(false);

  const currentUser = getCurrentUser();
  const location = useLocation();

  const { data: user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setQfeed(location.pathname === "/" || location.pathname === "/qfeed");
    setNotification(location.pathname === "/notification");
  }, [location.pathname]);

  const renderBottomLink = (focus) => {
    let qfeedClasses = "w-50 h-12 flex justify-center items-center rounded-xl";

    if (focus === true) {
      qfeedClasses += " bg-background active-icon";
      return qfeedClasses;
    } else {
      return qfeedClasses;
    }
  };

  useEffect(() => {
    const allowedRoutes = ["/qfeed", "/"];

    if (!allowedRoutes.includes(location.pathname)) {
      setIsProfile(false);
    } else {
      setIsProfile(true);
    }
  }, [location.pathname]);

  const handleMobileMenuClick = () => {
    let mobileSidenav = document.querySelector(".side");

    mobileSidenav.classList.toggle("side-active");
  };

  const app = useRef();
  const nav = useRef();
  const t1 = useRef();

  useEffect(() => {
    setTimeout(() => {
      t1.current = gsap
        .timeline()
        .fromTo(
          app.current,
          { y: -200, opacity: 0 },
          { y: 0, opacity: 1, ease: "power2.inOut" }
        )
        .fromTo(
          nav.current,
          { y: 200, opacity: 0 },
          { y: 0, opacity: 1, ease: "power2.inOut", stagger: 0.3 }
        );
    }, 50);
  });

  // useEffect(() => {
  //   if (currentUser?.username) {
  //     dispatch(currentUserThunk({ username: currentUser?.username }));
  //   } else {
  //     // Skip
  //   }
  // });

  return (
    <>
      <div className="mobile-sidenav">
        {/* Hamburger */}
        <div className="w-full fixed top-0 left-0 z-[1000] p-2">
          {/* fixed top nav for mobile */}
          {currentUser.username ? (
            <div
              ref={app}
              id="topnav"
              className="ask-shadow nav-container rounded-xl bg-white flex justify-between"
            >
              <>
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
              </>
            </div>
          ) : (
            <div className="p-2 rounded-lg border bg-background  text-center flex justify-between justify-items-center">
              <p className="font-bold m-0 my-auto">Faraday Guest Mode</p>
              <Link to={`/login`} style={{ textDecoration: "none" }}>
                <PrimaryButton>Login</PrimaryButton>
              </Link>
            </div>
          )}
        </div>

        {/* fixed bottom nav for mobile */}
        {isProfile && (
          <div
            ref={nav}
            className="nav-container fixed bottom-0 left-0 z-10 w-full bg-white py-1 px-3 flex border"
            id="bottomnav"
          >
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
                <img src={bell} alt="notification" />
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
                      src={currentUser?.profile_pic}
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
                        {user?.profile?.questions ||
                          currentUser?.question_count}
                      </span>{" "}
                      Questions
                    </p>
                    <p className="">
                      <span className="font-semibold">
                        {user?.profile?.solution || currentUser?.solution_count}
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
              PointBreak v1.3.0
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileSideNav;
