import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/qfeedNav.scss";

function QfeedNav() {
  const [links] = useState([
    {
      item: "Qfeed",
      icon: (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M2 6.57335V19.3593C2 20.1677 2.32335 20.976 2.92964 21.488C3.29341 21.7979 3.73802 22 4.29042 22H17.7635C18.262 22 18.7066 21.7979 18.9895 21.5823C19.7575 21.0165 20.0404 20.2889 20.0539 19.3458C20.0539 19.2784 20.0674 19.2515 20.0674 19.1841V19.0763C20.0539 16.6243 20.0674 14.1452 20.0674 11.6796C19.4341 11.8952 18.7335 12.1647 18.3428 12.3668C18.3024 12.3802 18.262 12.3937 18.2216 12.4207V16.6916C18.2216 16.9341 18.2081 17.1497 18.2081 17.3787C18.2081 17.8368 18.2081 18.3084 18.2081 18.7799C18.2081 19.6826 18.2755 20.1542 17.521 20.1946C17.3997 20.1946 17.2919 20.1811 17.1841 20.1946C16.9012 20.235 6.75599 20.2081 6.47305 20.2081C6.19012 20.2081 5.94761 20.1946 5.67814 20.1946C5.3009 20.1946 4.4521 20.235 4.15569 20.1003C3.96707 20.0195 3.85928 19.8308 3.85928 19.5749C3.85928 19.5075 3.84581 19.4805 3.84581 19.3997C3.84581 19.3323 3.84581 19.265 3.84581 19.1976C3.84581 19.0494 3.83234 18.9416 3.83234 18.8069L3.81886 14.6976C3.81886 14.1183 3.83234 13.5793 3.83234 13.0135V10.4805C3.83234 10.1841 3.84581 9.94162 3.84581 9.64521V7.11228C3.84581 6.8024 3.81886 6.20958 4.03443 6.02096C4.22305 5.84581 4.4521 5.84581 4.70808 5.84581C4.8024 5.84581 4.82934 5.83234 4.91018 5.83234C8.29192 5.79192 11.768 5.83234 15.1362 5.83234C15.5539 5.83234 17.3862 5.80539 17.7096 5.87275C17.9656 5.92665 18.1272 6.0479 18.1811 6.30389C18.2216 6.55988 18.1811 6.86976 18.2081 7.13922C18.235 7.40868 18.2216 7.73204 18.2216 8.01497C18.2216 8.32485 18.235 8.58084 18.235 8.87725V9.60479C18.8009 9.37575 19.3937 9.16018 19.9731 8.9985L20.0674 8.95808V7.07186C20.0674 6.38473 19.9865 5.65719 19.6228 5.10479C19.5823 5.02395 19.5284 4.97006 19.4746 4.88922C19.0704 4.37725 18.262 4 17.5883 4H4.50599C4.16916 4 3.77844 4.10778 3.46856 4.22904C2.53892 4.61976 2 5.5494 2 6.57335Z'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M11.7682 13.8734C11.6739 13.806 11.4179 13.5365 11.3236 13.4288C11.0946 13.2132 10.8655 12.9976 10.6095 12.8225L10.4748 12.7282C10.4344 12.7012 10.3805 12.6743 10.3401 12.6473C10.2997 12.6069 10.2458 12.58 10.2054 12.553C9.62601 12.2701 9.06015 12.068 8.39997 11.8928C7.82063 11.7581 7.16045 11.5964 6.54069 11.6638C6.47332 11.6773 6.40596 11.6907 6.33859 11.7042C6.33859 11.9332 6.32512 12.1084 6.32512 12.3374C6.32512 12.5395 6.29817 12.7686 6.29817 12.9707C6.29817 13.4018 6.25775 13.8195 6.25775 14.2506C6.31164 14.2506 6.31164 14.2371 6.37901 14.2371C7.20087 14.2371 7.55116 14.2506 8.29218 14.5335C8.75027 14.6952 9.16793 14.9647 9.5317 15.2746C9.55865 15.3015 9.57212 15.315 9.59907 15.3419C9.7338 15.4362 9.86853 15.5844 9.97631 15.7057L10.0976 15.8539C10.4209 16.2446 10.6634 16.5949 10.906 17.0395C11.1485 17.4976 11.3371 17.9692 11.4988 18.4542C11.5122 18.5216 11.5392 18.6159 11.5661 18.6698C11.647 18.6294 11.7682 18.6024 11.8625 18.5755L12.7787 18.2791C12.8865 18.2386 12.9808 18.2117 13.0751 18.1847L13.6949 17.9826C13.7892 17.9557 13.9239 17.9288 14.0048 17.8883C14.0048 17.8479 13.9913 17.794 13.9913 17.7401C13.9643 17.5111 13.9239 17.2551 13.9239 17.0126C13.9239 16.9452 13.9104 16.9317 13.9104 16.8644C13.8835 16.1099 13.9509 15.4497 14.1934 14.7356C14.3416 14.2776 14.5706 13.8734 14.8401 13.4826L15.0287 13.2267C15.1904 13.038 15.4868 12.7012 15.6754 12.553C15.864 12.3913 16.0527 12.2297 16.2548 12.068L16.5242 11.8794C16.7128 11.7446 16.9015 11.6234 17.1036 11.5156C17.3595 11.3539 17.7503 11.1249 18.0332 11.0171C18.0871 10.9901 18.1275 10.9632 18.1814 10.9362C18.2353 10.9093 18.2892 10.8958 18.3431 10.8689C18.9898 10.5455 20.4449 10.0335 21.1185 9.84492L21.8461 9.62935C21.9673 9.58893 22.0886 9.54851 22.2233 9.52157C22.1829 9.4542 21.9269 8.37636 21.9 8.26857L21.6575 7.33893C21.6305 7.24462 21.617 7.10989 21.5766 7.02905C21.4149 7.04253 20.1215 7.44672 19.9733 7.50061C19.2727 7.70271 18.5452 7.97217 17.8715 8.2551C17.8042 8.28205 17.7503 8.30899 17.6829 8.33594L17.144 8.56498C17.0901 8.6054 17.0362 8.63235 16.9688 8.65929C16.8476 8.69971 16.7263 8.76708 16.6185 8.82097C16.2817 9.00959 15.9449 9.18474 15.6215 9.40031C15.2039 9.66977 14.7997 9.95271 14.4089 10.2626C14.2742 10.3838 14.126 10.4916 13.9913 10.6264C13.9509 10.6802 13.9104 10.7072 13.8566 10.7476C13.641 10.9632 13.4119 11.1788 13.2233 11.4213L12.8865 11.8524C12.4958 12.3644 12.1724 12.9033 11.9164 13.4826C11.876 13.5635 11.7682 13.7791 11.7682 13.8734Z'
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

  const handleClick = (e) => {
    let activeItem = document.querySelector(".nav__active");
    let navBorder = document.querySelector(".nav__border");

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
    <div className='qfeedNav-container'>
      <button className='btn btn-green rounded-circle btn--add'>
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C21.9939 17.5203 17.5203 21.9939 12 22ZM4 12.172C4.04732 16.5732 7.64111 20.1095 12.0425 20.086C16.444 20.0622 19.9995 16.4875 19.9995 12.086C19.9995 7.68451 16.444 4.10977 12.0425 4.086C7.64111 4.06246 4.04732 7.59876 4 12V12.172ZM13 17H11V13H7V11H11V7H13V11H17V13H13V17Z'
            fill='#fff'
          />
        </svg>
      </button>

      {/* */}
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

export default QfeedNav;
