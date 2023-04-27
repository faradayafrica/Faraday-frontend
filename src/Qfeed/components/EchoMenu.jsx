import gsap from "gsap";
import React, { useRef, useEffect } from "react";
import { ReactComponent as BroadCastIcon } from "../assets/broadcast.svg";
import { ReactComponent as PenIcon } from "../assets/pen.svg";

function EchoMenu({
  question,
  echoMenu,
  setEchoMenu,
  handleEcho,
  setIsPennedOpen,
}) {
  const echo_menu = useRef();

  // Gsap animation
  const handleQuestionMenu = () => {
    gsap.fromTo(
      echo_menu.current,
      { y: 0, opacity: 1 },
      { y: +50, opacity: 0, duration: 0.2, ease: "power2.inOut" }
    );
    setTimeout(() => {
      setEchoMenu(!echoMenu);
    }, 200);
  };

  const hideMenu = () => {
    handleQuestionMenu();
    // setConfirmDelete(false);
  };

  useEffect(() => {
    setTimeout(() => {
      gsap.fromTo(
        echo_menu.current,
        { y: +50, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.inOut" }
      );
    }, 200);
  }, [echoMenu]);

  return (
    <>
      {echoMenu ? (
        <>
          <div
            className='fixed top-0 right-0 h-screen w-full left-0 z-20 bg-[#00000022]'
            onClick={() => {
              hideMenu();
            }}
          ></div>

          <div
            ref={echo_menu}
            className='absolute top-6 z-50 left-4 ask-shadow border bg-white rounded-xl p-1 mx-auto w-72 opacity-0'
          >
            <button
              className='px-4 py-2 hover:bg-background rounded-lg w-full text-left flex items-center gap-4 disabled:text-gray-500 disabled:cursor-not-allowed'
              onClick={() => handleEcho()}
              disabled={question.echoed_by_user ? true : false}
            >
              <BroadCastIcon />
              <div>
                <h4 className='font-semibold'>Echo</h4>
                <p className='text-sm text-[#6C757D]'>Instantly share post</p>
              </div>
            </button>
            <button
              className='px-4 py-2 hover:bg-background rounded-lg w-full text-left flex items-center gap-4'
              onClick={() => {
                hideMenu();
                setIsPennedOpen(true);
              }}
            >
              <PenIcon />
              <div>
                <h4 className='font-semibold'>Pen</h4>
                <p className='text-sm text-[#6C757D]'>
                  Attach a coment before sharing{" "}
                </p>
              </div>
            </button>
          </div>
        </>
      ) : null}
    </>
  );
}

export default EchoMenu;
