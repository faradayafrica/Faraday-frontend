import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/mobileBottomNav.scss";

function MobileBottomNav() {
  const [links] = useState([
    {
      item: "Qfeed",
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='21'
          height='18'
          viewBox='0 0 21 18'
          fill='none'
        >
          <path
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M0 2.57335V15.3593C0 16.1677 0.323353 16.976 0.929641 17.488C1.29341 17.7979 1.73802 18 2.29042 18H15.7635C16.262 18 16.7066 17.7979 16.9895 17.5823C17.7575 17.0165 18.0404 16.2889 18.0539 15.3458C18.0539 15.2784 18.0674 15.2515 18.0674 15.1841V15.0763C18.0539 12.6243 18.0674 10.1452 18.0674 7.67964C17.4341 7.89521 16.7335 8.16467 16.3428 8.36677C16.3024 8.38024 16.262 8.39371 16.2216 8.42066V12.6916C16.2216 12.9341 16.2081 13.1497 16.2081 13.3787C16.2081 13.8368 16.2081 14.3084 16.2081 14.7799C16.2081 15.6826 16.2755 16.1542 15.521 16.1946C15.3997 16.1946 15.2919 16.1811 15.1841 16.1946C14.9012 16.235 4.75599 16.2081 4.47305 16.2081C4.19012 16.2081 3.94761 16.1946 3.67814 16.1946C3.3009 16.1946 2.4521 16.235 2.15569 16.1003C1.96707 16.0195 1.85928 15.8308 1.85928 15.5748C1.85928 15.5075 1.84581 15.4805 1.84581 15.3997C1.84581 15.3323 1.84581 15.265 1.84581 15.1976C1.84581 15.0494 1.83234 14.9416 1.83234 14.8069L1.81886 10.6976C1.81886 10.1183 1.83234 9.57934 1.83234 9.01347V6.48054C1.83234 6.18413 1.84581 5.94162 1.84581 5.64521V3.11228C1.84581 2.8024 1.81886 2.20958 2.03443 2.02096C2.22305 1.84581 2.4521 1.84581 2.70808 1.84581C2.8024 1.84581 2.82934 1.83234 2.91018 1.83234C6.29192 1.79192 9.76797 1.83234 13.1362 1.83234C13.5539 1.83234 15.3862 1.80539 15.7096 1.87275C15.9656 1.92665 16.1272 2.0479 16.1811 2.30389C16.2216 2.55988 16.1811 2.86976 16.2081 3.13922C16.235 3.40868 16.2216 3.73204 16.2216 4.01497C16.2216 4.32485 16.235 4.58084 16.235 4.87725V5.60479C16.8009 5.37575 17.3937 5.16018 17.9731 4.9985L18.0674 4.95808V3.07186C18.0674 2.38473 17.9865 1.65719 17.6228 1.10479C17.5823 1.02395 17.5284 0.97006 17.4746 0.889222C17.0704 0.377245 16.262 0 15.5883 0H2.50599C2.16916 0 1.77844 0.107784 1.46856 0.229042C0.538922 0.61976 0 1.5494 0 2.57335Z'
            fill='#6C757D'
          />
          <path
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M9.76829 9.87336C9.67398 9.806 9.41799 9.53654 9.32368 9.42875C9.09464 9.21318 8.8656 8.99761 8.60961 8.82247L8.47488 8.72815C8.43446 8.70121 8.38057 8.67426 8.34015 8.64732C8.29973 8.6069 8.24584 8.57995 8.20542 8.553C7.62608 8.27007 7.06021 8.06797 6.40003 7.89282C5.82069 7.75809 5.16051 7.59642 4.54075 7.66378C4.47338 7.67726 4.40602 7.69073 4.33865 7.7042C4.33865 7.93324 4.32518 8.10839 4.32518 8.33744C4.32518 8.53953 4.29823 8.76857 4.29823 8.97067C4.29823 9.40181 4.25781 9.81947 4.25781 10.2506C4.3117 10.2506 4.3117 10.2371 4.37907 10.2371C5.20093 10.2371 5.55123 10.2506 6.29224 10.5335C6.75033 10.6952 7.16799 10.9647 7.53176 11.2746C7.55871 11.3015 7.57218 11.315 7.59913 11.3419C7.73386 11.4362 7.86859 11.5844 7.97638 11.7057L8.09763 11.8539C8.42099 12.2446 8.6635 12.5949 8.90602 13.0395C9.14853 13.4976 9.33715 13.9692 9.49883 14.4542C9.5123 14.5216 9.53925 14.6159 9.5662 14.6698C9.64703 14.6294 9.76829 14.6024 9.8626 14.5755L10.7788 14.2791C10.8866 14.2386 10.9809 14.2117 11.0752 14.1847L11.6949 13.9826C11.7892 13.9557 11.924 13.9288 12.0048 13.8883C12.0048 13.8479 11.9913 13.794 11.9913 13.7401C11.9644 13.5111 11.924 13.2551 11.924 13.0126C11.924 12.9452 11.9105 12.9317 11.9105 12.8644C11.8836 12.1099 11.9509 11.4497 12.1934 10.7356C12.3416 10.2776 12.5707 9.87336 12.8401 9.48265L13.0288 9.22666C13.1904 9.03803 13.4869 8.70121 13.6755 8.553C13.8641 8.39133 14.0527 8.22965 14.2548 8.06797L14.5243 7.87935C14.7129 7.74462 14.9015 7.62336 15.1036 7.51558C15.3596 7.3539 15.7503 7.12486 16.0333 7.01708C16.0872 6.99013 16.1276 6.96318 16.1815 6.93624C16.2354 6.90929 16.2892 6.89582 16.3431 6.86887C16.9898 6.54552 18.4449 6.03354 19.1186 5.84492L19.8461 5.62935C19.9674 5.58893 20.0887 5.54851 20.2234 5.52157C20.183 5.4542 19.927 4.37636 19.9 4.26857L19.6575 3.33893C19.6306 3.24462 19.6171 3.10989 19.5767 3.02905C19.415 3.04253 18.1216 3.44672 17.9734 3.50061C17.2728 3.70271 16.5452 3.97217 15.8716 4.2551C15.8042 4.28205 15.7503 4.30899 15.683 4.33594L15.144 4.56498C15.0901 4.6054 15.0363 4.63235 14.9689 4.65929C14.8476 4.69971 14.7264 4.76708 14.6186 4.82097C14.2818 5.00959 13.9449 5.18474 13.6216 5.40031C13.2039 5.66977 12.7997 5.95271 12.409 6.26259C12.2743 6.38384 12.1261 6.49163 11.9913 6.62636C11.9509 6.68025 11.9105 6.7072 11.8566 6.74762C11.641 6.96318 11.412 7.17875 11.2234 7.42127L10.8866 7.85241C10.4958 8.36438 10.1725 8.9033 9.91649 9.48265C9.87608 9.56348 9.76829 9.77905 9.76829 9.87336Z'
            fill='#6C757D'
          />
        </svg>
      ),
      focus: false,
    },
    {
      item: "Explore",
      icon: (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M18.677 19.6069L12.962 13.8909C10.4196 15.6984 6.91642 15.2562 4.90285 12.8738C2.88929 10.4914 3.03714 6.96349 5.24298 4.7579C7.44824 2.55134 10.9765 2.40285 13.3594 4.41631C15.7422 6.42977 16.1846 9.93334 14.377 12.4759L20.092 18.1919L18.678 19.6059L18.677 19.6069ZM9.48498 4.99988C7.58868 4.99946 5.95267 6.33057 5.56745 8.18733C5.18224 10.0441 6.15369 11.9162 7.89366 12.6701C9.63362 13.4241 11.6639 12.8527 12.7552 11.3019C13.8466 9.75117 13.699 7.64721 12.402 6.2639L13.007 6.8639L12.325 6.1839L12.313 6.1719C11.5648 5.41907 10.5464 4.99702 9.48498 4.99988Z'
            fill='#6C757D'
          />
        </svg>
      ),
      focus: false,
    },
    {
      item: "Notification",
      icon: (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M12 22C10.8954 22 10 21.1046 10 20H14C14 21.1046 13.1046 22 12 22ZM20 19H4V17L6 16V10.5C6 7.038 7.421 4.793 10 4.18V2H14V4.18C16.579 4.792 18 7.036 18 10.5V16L20 17V19ZM12 5.75C10.7797 5.6712 9.60278 6.21728 8.875 7.2C8.25255 8.18456 7.94714 9.33638 8 10.5V17H16V10.5C16.0528 9.33639 15.7474 8.18458 15.125 7.2C14.3972 6.21728 13.2203 5.6712 12 5.75Z' />
        </svg>
      ),
      focus: false,
    },
    {
      item: "Direct",
      icon: (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M19.2 19.4H4.8C3.80589 19.4 3 18.5941 3 17.6V6.7217C3.04195 5.75829 3.83568 4.99909 4.8 5H19.2C20.1941 5 21 5.80589 21 6.8V17.6C21 18.5941 20.1941 19.4 19.2 19.4ZM4.8 8.4812V17.6H19.2V8.4812L12 13.28L4.8 8.4812ZM5.52 6.8L12 11.12L18.48 6.8H5.52Z' />
        </svg>
      ),
      focus: false,
    },
  ]);
  const [allowNav, setAllowNav] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const allowedRoutes = [
      "qfeed",
      "explore",
      "notification",
      "direct",
      "profile",
    ];

    if (!allowedRoutes.includes(location.pathname.replace("/", ""))) {
      setAllowNav(!allowNav);
    }
  }, [location.pathname]);

  const handleClick = (e) => {
    let activeItem = document.querySelector(".nav__active");
    let navBorder = document.querySelector(".nav__border");

    if (activeItem === e.target) return;

    if (activeItem) {
      activeItem.classList.remove("nav__active");
    }

    e.target.classList.add("nav__active");

    offsetMenuBorder(e.target, navBorder);
  };

  useEffect(() => {
    let activeItem = document.querySelector(".nav__active");
    let navBorder = document.querySelector(".nav__border");

    offsetMenuBorder(activeItem, navBorder);
  }, []);

  useEffect(() => {
    let activeItem = document.querySelector(".nav__active");
    let navBorder = document.querySelector(".nav__border");

    window.addEventListener("resize", () => {
      if (window.innerWidth < 578) offsetMenuBorder(activeItem, navBorder);
    });
  });

  function offsetMenuBorder(element, navBorder) {
    const offsetActiveItem = element.getBoundingClientRect();
    const container = document.querySelector(".qfeedNav-container");

    let left;
    if (container && offsetActiveItem) {
      left =
        Math.floor(
          offsetActiveItem.left -
            container.offsetLeft -
            (navBorder.offsetWidth - offsetActiveItem.width) / 2
        ) + "px";
    }
    navBorder.style.transform = `translate3d(${left}, 0 , 0)`;
  }

  return (
    <div className={`qfeedNav-container ${allowNav ? "block" : "none"}`}>
      <div className='qfeedNav-links'>
        {links.map((link, i) => (
          <Link key={i} to={`/${link.item.toLowerCase()}`}>
            <button
              className={`btn ${i === 0 ? "nav__active" : "nav__button"}`}
              onClick={(e) => handleClick(e)}
            >
              {link.icon}
            </button>
          </Link>
        ))}
      </div>
      <div className='nav__border'></div>
    </div>
  );
}

export default MobileBottomNav;