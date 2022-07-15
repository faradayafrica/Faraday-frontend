import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "../images/profile1.png";
import ProfileIcon from "../images/profile.svg";
import "../styles/mobileSideNav.scss";
import { getCurrentUser } from "../services/authService";
import { useLocation } from "react-router-dom";

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
          <div
            className="p-2 rounded-xl bg-slate-200 cursor-pointer hover:bg-slate-300 absolute top-4 left-4 z-40 "
            id="sidenav-btn"
            data-toggle="tooltip"
            title="mobile-sidenav"
            onClick={handleMobileMenuClick}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 18H3V16H21V18ZM21 13H3V11H21V13ZM21 8H3V6H21V8Z"
                fill="#3F3F41"
              />
            </svg>
          </div>
        )}

        <div className="side">
          <div className="side-container">
            <div className="side-overlay" onClick={handleMobileMenuClick}></div>
            <div className="side-header">
              <div className="flex justify-start">
                <div
                  className="p-2 bg-slate-200 rounded-xl float-left cursor-pointer"
                  data-toggle="tooltip"
                  title="close"
                  onClick={handleMobileMenuClick}
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"
                      fill="#6C757D"
                    />
                  </svg>
                </div>

                <h3 className="text-lg font-bold ">Account info</h3>
              </div>
              <div className="mt-4 bg-red-100 rounded-xl p-3">
                <div className="flex">
                  <img
                    src={Avatar}
                    alt=""
                    className="rounded-full mr-2"
                    width="40px"
                    height="40px"
                  />
                  <div>
                    <h2 className="name">
                      {user?.first_name} {user?.last_name}
                    </h2>
                    <p className="username">@{user?.username}</p>
                  </div>
                </div>

                {/* Number of questions and Soulutions  */}
                <div className="flex mt-3">
                  <p className=" mr-2">
                    <span className="font-semibold">200 </span> Questions
                  </p>
                  <p className="">
                    <span className="font-semibold">10 </span> Solution
                  </p>
                </div>
              </div>
            </div>

            <div className="side-links">
              <div onClick={handleMobileMenuClick}>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <div className="mobile-link flex items-center rounded-t-xl bg-red-100 mx-3 px-3 py-3">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2 6.57335V19.3593C2 20.1677 2.32335 20.976 2.92964 21.488C3.29341 21.7979 3.73802 22 4.29042 22H17.7635C18.262 22 18.7066 21.7979 18.9895 21.5823C19.7575 21.0165 20.0404 20.2889 20.0539 19.3458C20.0539 19.2784 20.0674 19.2515 20.0674 19.1841V19.0763C20.0539 16.6243 20.0674 14.1452 20.0674 11.6796C19.4341 11.8952 18.7335 12.1647 18.3428 12.3668C18.3024 12.3802 18.262 12.3937 18.2216 12.4207V16.6916C18.2216 16.9341 18.2081 17.1497 18.2081 17.3787C18.2081 17.8368 18.2081 18.3084 18.2081 18.7799C18.2081 19.6826 18.2755 20.1542 17.521 20.1946C17.3997 20.1946 17.2919 20.1811 17.1841 20.1946C16.9012 20.235 6.75599 20.2081 6.47305 20.2081C6.19012 20.2081 5.94761 20.1946 5.67814 20.1946C5.3009 20.1946 4.4521 20.235 4.15569 20.1003C3.96707 20.0195 3.85928 19.8308 3.85928 19.5749C3.85928 19.5075 3.84581 19.4805 3.84581 19.3997C3.84581 19.3323 3.84581 19.265 3.84581 19.1976C3.84581 19.0494 3.83234 18.9416 3.83234 18.8069L3.81886 14.6976C3.81886 14.1183 3.83234 13.5793 3.83234 13.0135V10.4805C3.83234 10.1841 3.84581 9.94162 3.84581 9.64521V7.11228C3.84581 6.8024 3.81886 6.20958 4.03443 6.02096C4.22305 5.84581 4.4521 5.84581 4.70808 5.84581C4.8024 5.84581 4.82934 5.83234 4.91018 5.83234C8.29192 5.79192 11.768 5.83234 15.1362 5.83234C15.5539 5.83234 17.3862 5.80539 17.7096 5.87275C17.9656 5.92665 18.1272 6.0479 18.1811 6.30389C18.2216 6.55988 18.1811 6.86976 18.2081 7.13922C18.235 7.40868 18.2216 7.73204 18.2216 8.01497C18.2216 8.32485 18.235 8.58084 18.235 8.87725V9.60479C18.8009 9.37575 19.3937 9.16018 19.9731 8.9985L20.0674 8.95808V7.07186C20.0674 6.38473 19.9865 5.65719 19.6228 5.10479C19.5823 5.02395 19.5284 4.97006 19.4746 4.88922C19.0704 4.37725 18.262 4 17.5883 4H4.50599C4.16916 4 3.77844 4.10778 3.46856 4.22904C2.53892 4.61976 2 5.5494 2 6.57335Z"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.7682 13.8734C11.6739 13.806 11.4179 13.5365 11.3236 13.4288C11.0946 13.2132 10.8655 12.9976 10.6095 12.8225L10.4748 12.7282C10.4344 12.7012 10.3805 12.6743 10.3401 12.6473C10.2997 12.6069 10.2458 12.58 10.2054 12.553C9.62601 12.2701 9.06015 12.068 8.39997 11.8928C7.82063 11.7581 7.16045 11.5964 6.54069 11.6638C6.47332 11.6773 6.40596 11.6907 6.33859 11.7042C6.33859 11.9332 6.32512 12.1084 6.32512 12.3374C6.32512 12.5395 6.29817 12.7686 6.29817 12.9707C6.29817 13.4018 6.25775 13.8195 6.25775 14.2506C6.31164 14.2506 6.31164 14.2371 6.37901 14.2371C7.20087 14.2371 7.55116 14.2506 8.29218 14.5335C8.75027 14.6952 9.16793 14.9647 9.5317 15.2746C9.55865 15.3015 9.57212 15.315 9.59907 15.3419C9.7338 15.4362 9.86853 15.5844 9.97631 15.7057L10.0976 15.8539C10.4209 16.2446 10.6634 16.5949 10.906 17.0395C11.1485 17.4976 11.3371 17.9692 11.4988 18.4542C11.5122 18.5216 11.5392 18.6159 11.5661 18.6698C11.647 18.6294 11.7682 18.6024 11.8625 18.5755L12.7787 18.2791C12.8865 18.2386 12.9808 18.2117 13.0751 18.1847L13.6949 17.9826C13.7892 17.9557 13.9239 17.9288 14.0048 17.8883C14.0048 17.8479 13.9913 17.794 13.9913 17.7401C13.9643 17.5111 13.9239 17.2551 13.9239 17.0126C13.9239 16.9452 13.9104 16.9317 13.9104 16.8644C13.8835 16.1099 13.9509 15.4497 14.1934 14.7356C14.3416 14.2776 14.5706 13.8734 14.8401 13.4826L15.0287 13.2267C15.1904 13.038 15.4868 12.7012 15.6754 12.553C15.864 12.3913 16.0527 12.2297 16.2548 12.068L16.5242 11.8794C16.7128 11.7446 16.9015 11.6234 17.1036 11.5156C17.3595 11.3539 17.7503 11.1249 18.0332 11.0171C18.0871 10.9901 18.1275 10.9632 18.1814 10.9362C18.2353 10.9093 18.2892 10.8958 18.3431 10.8689C18.9898 10.5455 20.4449 10.0335 21.1185 9.84492L21.8461 9.62935C21.9673 9.58893 22.0886 9.54851 22.2233 9.52157C22.1829 9.4542 21.9269 8.37636 21.9 8.26857L21.6575 7.33893C21.6305 7.24462 21.617 7.10989 21.5766 7.02905C21.4149 7.04253 20.1215 7.44672 19.9733 7.50061C19.2727 7.70271 18.5452 7.97217 17.8715 8.2551C17.8042 8.28205 17.7503 8.30899 17.6829 8.33594L17.144 8.56498C17.0901 8.6054 17.0362 8.63235 16.9688 8.65929C16.8476 8.69971 16.7263 8.76708 16.6185 8.82097C16.2817 9.00959 15.9449 9.18474 15.6215 9.40031C15.2039 9.66977 14.7997 9.95271 14.4089 10.2626C14.2742 10.3838 14.126 10.4916 13.9913 10.6264C13.9509 10.6802 13.9104 10.7072 13.8566 10.7476C13.641 10.9632 13.4119 11.1788 13.2233 11.4213L12.8865 11.8524C12.4958 12.3644 12.1724 12.9033 11.9164 13.4826C11.876 13.5635 11.7682 13.7791 11.7682 13.8734Z"
                      />
                    </svg>
                    <p className="m-0 ml-2 text-xl font-semibold">Qfeed</p>
                  </div>
                </Link>

                <Link
                  to={`/me/${currentUser.username}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="mobile-link flex items-center bg-red-100 mx-3 px-3 py-3">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 22C10.488 22.0043 8.9952 21.6622 7.63598 21C7.13853 20.758 6.66191 20.4754 6.21098 20.155L6.07398 20.055C4.8338 19.1396 3.81985 17.9522 3.10998 16.584C2.37571 15.1679 1.99489 13.5952 1.99993 12C1.99993 6.47715 6.47713 2 12 2C17.5228 2 22 6.47715 22 12C22.005 13.5944 21.6245 15.1664 20.891 16.582C20.1821 17.9494 19.1696 19.1364 17.931 20.052C17.4637 20.394 16.9679 20.6951 16.449 20.952L16.369 20.992C15.0089 21.6577 13.5142 22.0026 12 22ZM12 17C10.5015 16.9971 9.12764 17.834 8.44298 19.167C10.6844 20.2772 13.3156 20.2772 15.557 19.167V19.162C14.8715 17.8305 13.4976 16.9954 12 17ZM12 15C14.1661 15.0028 16.1634 16.1701 17.229 18.056L17.244 18.043L17.258 18.031L17.241 18.046L17.231 18.054C19.76 15.8691 20.6643 12.3423 19.4986 9.21011C18.333 6.07788 15.3431 4.00032 12.001 4.00032C8.65889 4.00032 5.66897 6.07788 4.50333 9.21011C3.33769 12.3423 4.24198 15.8691 6.77098 18.054C7.83724 16.169 9.83434 15.0026 12 15ZM12 14C9.79084 14 7.99998 12.2091 7.99998 10C7.99998 7.79086 9.79084 6 12 6C14.2091 6 16 7.79086 16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0608 14 12 14ZM12 8C10.8954 8 9.99998 8.89543 9.99998 10C9.99998 11.1046 10.8954 12 12 12C13.1045 12 14 11.1046 14 10C14 8.89543 13.1045 8 12 8Z" />
                    </svg>
                    <p className="m-0 ml-2 text-xl font-semibold">Profile</p>
                  </div>
                </Link>

                <Link to="/notification" style={{ textDecoration: "none" }}>
                  <div className="mobile-link flex items-center bg-red-100 mx-3 px-3 py-3">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 22C10.8954 22 10 21.1046 10 20H14C14 21.1046 13.1046 22 12 22ZM20 19H4V17L6 16V10.5C6 7.038 7.421 4.793 10 4.18V2H14V4.18C16.579 4.792 18 7.036 18 10.5V16L20 17V19ZM12 5.75C10.7797 5.6712 9.60278 6.21728 8.875 7.2C8.25255 8.18456 7.94714 9.33638 8 10.5V17H16V10.5C16.0528 9.33639 15.7474 8.18458 15.125 7.2C14.3972 6.21728 13.2203 5.6712 12 5.75Z" />
                    </svg>
                    <p className="m-0 ml-2 text-xl font-semibold">
                      Notification
                    </p>
                  </div>
                </Link>

                <Link to="/logout" style={{ textDecoration: "none" }}>
                  <div className="mobile-link flex items-center rounded-b-xl bg-red-100 mx-3 px-3 py-3">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19 21H10C8.89543 21 8 20.1046 8 19V15H10V19H19V5H10V9H8V5C8 3.89543 8.89543 3 10 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21ZM12 16V13H3V11H12V8L17 12L12 16Z" />
                    </svg>

                    <p className="m-0 ml-2 text-xl font-semibold">Logout</p>
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
