import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import CommentsLoader from "./commentComponents/CommentsLoader";
import uuid from "react-uuid";

const QuestionsLoader = ({ type, short }) => {
  const el = useRef();
  const q = gsap.utils.selector(el);

  useEffect(() => {
    gsap.fromTo(
      q(".question-loader-item"),
      {
        y: +200,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "power2.inOut",
      }
    );
  });

  if (type === "profile") {
    return (
      <div className="profile-question-section flex items-start mt-4">
        <div className="question-container border rounded-xl mb-3 mr-3 p-2 animate-pulse">
          <div className="profile-row text-[12px] text-night-secondary flex items-center justify-start py-2 ">
            <div className="h-3 w-3 rounded-full bg-slate-300 "></div>
            <span className="ml-1 bg-slate-300 h-3 w-24 rounded-lg"></span>{" "}
            {/* <span className="ml-1">{question?.user.username}</span>{" "} */}
            <span className="ml-1 bg-slate-300 h-3 w-6 rounded-lg"></span>
          </div>
          <div className=" bg-slate-300 h-24 w-full rounded-lg"></div>
          {/* <p className="bg-[#F1FBEF77] p-2 pt-3 m-[2px] border-t relative text-sm"></p> */}
        </div>

        <div className="question-container border rounded-xl mb-3 mr-3 p-2 animate-pulse">
          <div className="profile-row text-[12px] text-night-secondary flex items-center justify-start py-2 ">
            <div className="h-3 w-3 rounded-full bg-slate-300 "></div>
            <span className="ml-1 bg-slate-300 h-3 w-24 rounded-lg"></span>{" "}
            {/* <span className="ml-1">{question?.user.username}</span>{" "} */}
            <span className="ml-1 bg-slate-300 h-3 w-6 rounded-lg"></span>
          </div>
          <div className=" bg-slate-300 h-24 w-full rounded-lg"></div>
          {/* <p className="bg-[#F1FBEF77] p-2 pt-3 m-[2px] border-t relative text-sm"></p> */}
        </div>

        <div className="question-container border rounded-xl mb-3 mr-3 p-2 animate-pulse">
          <div className="profile-row text-[12px] text-night-secondary flex items-center justify-start py-2 ">
            <div className="h-3 w-3 rounded-full bg-slate-300 "></div>
            <span className="ml-1 bg-slate-300 h-3 w-24 rounded-lg"></span>{" "}
            {/* <span className="ml-1">{question?.user.username}</span>{" "} */}
            <span className="ml-1 bg-slate-300 h-3 w-6 rounded-lg"></span>
          </div>
          <div className=" bg-slate-300 h-24 w-full rounded-lg"></div>
          {/* <p className="bg-[#F1FBEF77] p-2 pt-3 m-[2px] border-t relative text-sm"></p> */}
        </div>

        <div className="question-container border rounded-xl mb-3 mr-3 p-2 animate-pulse">
          <div className="profile-row text-[12px] text-night-secondary flex items-center justify-start py-2 ">
            <div className="h-3 w-3 rounded-full bg-slate-300 "></div>
            <span className="ml-1 bg-slate-300 h-3 w-24 rounded-lg"></span>{" "}
            {/* <span className="ml-1">{question?.user.username}</span>{" "} */}
            <span className="ml-1 bg-slate-300 h-3 w-6 rounded-lg"></span>
          </div>
          <div className=" bg-slate-300 h-24 w-full rounded-lg"></div>
          {/* <p className="bg-[#F1FBEF77] p-2 pt-3 m-[2px] border-t relative text-sm"></p> */}
        </div>
      </div>
    );
  }

  if (type === "discussion") {
    return (
      <>
        <div className="bg-white mb-2 py-5 px-3">
          <div className=" animate-pulse">
            <div className="flex">
              <div className="w-11 mr-2 cursor-pointer  ">
                <div className="w-11 h-11 rounded-full mr-2 bg-slate-300 float-left"></div>
              </div>
              <div className=" w-full">
                <div className="max-w-[350px] h-2 rounded-xl bg-slate-300 mt-2"></div>
                <div className="w-[150px] h-2 rounded-xl bg-slate-300 mt-2"></div>{" "}
              </div>
            </div>
            <div className="h-2 mt-4 w-full rounded-l-md bg-slate-300 mb-[6px]"></div>
            <div className="h-2 w-full bg-slate-300 mb-[6px]"></div>
            <div className="h-2 w-full bg-slate-300 mb-[6px]"></div>
            <div className="h-2 w-full bg-slate-300 mb-[6px]"></div>
            <div className="h-2 w-full bg-slate-300 mb-[6px]"></div>
            <div className="h-2 w-full bg-slate-300 mb-[6px]"></div>
            <div className="h-2 w-full bg-slate-300 mb-[6px]"></div>
            <div className="h-2 w-full bg-slate-300 mb-[6px]"></div>
            <div className="h-2 w-full bg-slate-300 mb-[6px]"></div>
            <div className="h-2 w-full bg-slate-300 mb-[6px]"></div>
            <div className="h-2 w-24 rounded-r-md bg-slate-300 mb-[6px]"></div>
          </div>
        </div>

        <CommentsLoader />
      </>
    );
  }

  return (
    <div ref={el} className="mt-4 bg-background">
      {!short ? (
        <>
          {Array(3)
            .fill(null)
            .map((_, ind) => (
              <div className="bg-white mb-2 py-5 px-3" key={uuid()}>
                <div className=" animate-pulse">
                  <div className="flex">
                    <div className="w-11 mr-2 cursor-pointer  ">
                      <div className="w-11 h-11 rounded-full mr-2 bg-slate-300 float-left"></div>
                    </div>
                    <div className=" w-full">
                      <div className="max-w-[350px] h-2 rounded-xl bg-slate-300 mt-2"></div>
                      <div className="w-[150px] h-2 rounded-xl bg-slate-300 mt-2"></div>{" "}
                    </div>
                  </div>
                  <div className="h-2 mt-4 w-full rounded-l-md bg-slate-300 mb-[6px]"></div>
                  <div className="h-2 w-full bg-slate-300 mb-[6px]"></div>
                  <div className="h-2 w-full bg-slate-300 mb-[6px]"></div>
                  <div className="h-2 w-full bg-slate-300 mb-[6px]"></div>
                  <div className="h-2 w-full bg-slate-300 mb-[6px]"></div>
                  <div className="h-2 w-full bg-slate-300 mb-[6px]"></div>
                  <div className="h-2 w-full bg-slate-300 mb-[6px]"></div>
                  <div className="h-2 w-24 rounded-r-md bg-slate-300 mb-[6px]"></div>
                </div>
              </div>
            ))}
        </>
      ) : (
        <>
          <div className="bg-white mb-2 py-5 px-3">
            <div className=" animate-pulse">
              <div className="flex">
                <div className="w-11 mr-2 cursor-pointer  ">
                  <div className="w-11 h-11 rounded-full mr-2 bg-slate-300 float-left"></div>
                </div>
                <div className=" w-full">
                  <div className="max-w-[350px] h-2 rounded-xl bg-slate-300 mt-2"></div>
                  <div className="w-[150px] h-2 rounded-xl bg-slate-300 mt-2"></div>{" "}
                </div>
              </div>
              <div className="h-2 mt-4 w-full rounded-l-md bg-slate-300 mb-[6px]"></div>
              <div className="h-2 w-full bg-slate-300 mb-[6px]"></div>
              <div className="h-2 w-full bg-slate-300 mb-[6px]"></div>
              <div className="h-2 w-full bg-slate-300 mb-[6px]"></div>
              <div className="h-2 w-full bg-slate-300 mb-[6px]"></div>
              <div className="h-2 w-full bg-slate-300 mb-[6px]"></div>
              <div className="h-2 w-full bg-slate-300 mb-[6px]"></div>
              <div className="h-2 w-full bg-slate-300 mb-[6px]"></div>
              <div className="h-2 w-full bg-slate-300 mb-[6px]"></div>
              <div className="h-2 w-full bg-slate-300 mb-[6px]"></div>
              <div className="h-2 w-24 rounded-r-md bg-slate-300 mb-[6px]"></div>
            </div>
          </div>

          <div className="h-12"></div>
        </>
      )}
    </div>
  );
};

export default QuestionsLoader;
