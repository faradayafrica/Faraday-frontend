import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/mobileBottomNav.scss";

function MobileBottomNav({ links, handleLink }) {
  const [allowNav, setAllowNav] = useState(true);
  const location = useLocation();
  const bottomNav = useRef();

  useEffect(() => {
    const allowedRoutes = [
      "/qfeed",
      "/explore",
      "/notification",
      "/direct",
      "/profile",
      "/me/",
    ];

    if (!location.pathname.includes(allowedRoutes)) {
      setAllowNav(false);
    } else {
      setAllowNav(true);
    }

    let navBorder = document.querySelector(".nav__border");

    if (!allowedRoutes.includes(location.pathname)) {
      // console.log(navBorder);
      navBorder.style.display = "none !important";
    } else {
      navBorder.style.display = "block";
    }

    // console.log(location.pathname);
  }, [location.pathname]);

  // useEffect(() => {
  //   console.log(allowNav, "allowNav");
  //   console.log(bottomNav, "bottomNav");
  // }, [allowNav]);

  const handleClick = (e, item) => {
    let activeItem = document.querySelector(".nav__active");
    let navBorder = document.querySelector(".nav__border");

    if (activeItem === e.target) return;

    if (activeItem) {
      activeItem.classList.remove("nav__active");
    }

    e.target.classList.add("nav__active");

    handleLink(item);

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
      if (window.innerWidth < 578) {
        offsetMenuBorder(activeItem, navBorder);
      }
    });
  });

  function offsetMenuBorder(element, navBorder) {
    const offsetActiveItem = element?.getBoundingClientRect();
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
    <div
      ref={bottomNav}
      className={`qfeedNav-container ${allowNav ? "block" : "hidden"}`}
    >
      <div className='qfeedNav-links'>
        {links?.map((link, i) => {
          return (
            link?.mobile && (
              <Link key={i} to={`/${link.item.toLowerCase()}`}>
                <button
                  // className={`btn ${i === 0 ? "nav__active" : "nav__button"}`}
                  className={`btn ${
                    link.focus ? "nav__active" : "nav__button"
                  }`}
                  onClick={(e) => handleClick(e, link.item)}
                >
                  {link.icon}
                </button>
              </Link>
            )
          );
        })}
      </div>
      <div className='nav__border'></div>
    </div>
  );
}

export default MobileBottomNav;
