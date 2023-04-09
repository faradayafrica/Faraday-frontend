import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import CommentsLoader from "./commentComponents/CommentsLoader";

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
            <div className="h-3 w-3 rounded-full bg-background2 "></div>
            <span className="ml-1 bg-background2 h-3 w-24 rounded-lg"></span>{" "}
            {/* <span className="ml-1">{question?.user.username}</span>{" "} */}
            <span className="ml-1 bg-background2 h-3 w-6 rounded-lg"></span>
          </div>
          <div className=" bg-background2 h-24 w-full rounded-lg"></div>
          {/* <p className="bg-[#F1FBEF77] p-2 pt-3 m-[2px] border-t relative text-sm"></p> */}
        </div>

        <div className="question-container border rounded-xl mb-3 mr-3 p-2 animate-pulse">
          <div className="profile-row text-[12px] text-night-secondary flex items-center justify-start py-2 ">
            <div className="h-3 w-3 rounded-full bg-background2 "></div>
            <span className="ml-1 bg-background2 h-3 w-24 rounded-lg"></span>{" "}
            {/* <span className="ml-1">{question?.user.username}</span>{" "} */}
            <span className="ml-1 bg-background2 h-3 w-6 rounded-lg"></span>
          </div>
          <div className=" bg-background2 h-24 w-full rounded-lg"></div>
          {/* <p className="bg-[#F1FBEF77] p-2 pt-3 m-[2px] border-t relative text-sm"></p> */}
        </div>

        <div className="question-container border rounded-xl mb-3 mr-3 p-2 animate-pulse">
          <div className="profile-row text-[12px] text-night-secondary flex items-center justify-start py-2 ">
            <div className="h-3 w-3 rounded-full bg-background2 "></div>
            <span className="ml-1 bg-background2 h-3 w-24 rounded-lg"></span>{" "}
            {/* <span className="ml-1">{question?.user.username}</span>{" "} */}
            <span className="ml-1 bg-background2 h-3 w-6 rounded-lg"></span>
          </div>
          <div className=" bg-background2 h-24 w-full rounded-lg"></div>
          {/* <p className="bg-[#F1FBEF77] p-2 pt-3 m-[2px] border-t relative text-sm"></p> */}
        </div>

        <div className="question-container border rounded-xl mb-3 mr-3 p-2 animate-pulse">
          <div className="profile-row text-[12px] text-night-secondary flex items-center justify-start py-2 ">
            <div className="h-3 w-3 rounded-full bg-background2 "></div>
            <span className="ml-1 bg-background2 h-3 w-24 rounded-lg"></span>{" "}
            {/* <span className="ml-1">{question?.user.username}</span>{" "} */}
            <span className="ml-1 bg-background2 h-3 w-6 rounded-lg"></span>
          </div>
          <div className=" bg-background2 h-24 w-full rounded-lg"></div>
          {/* <p className="bg-[#F1FBEF77] p-2 pt-3 m-[2px] border-t relative text-sm"></p> */}
        </div>
      </div>
    );
  }

  if (type == "discussion") {
    return (
      <>
        <div className="px-3 animate-pulse">
          <div className="flex">
            <div className="w-14 mr-2 cursor-pointer  ">
              <div className="w-12 h-12 rounded-full mr-2 bg-background2 float-left"></div>
            </div>
            <div className=" w-full">
              <div className="max-w-[350px] h-3 rounded-xl bg-background2 mt-2"></div>
              <div className="w-[150px] h-3 rounded-xl bg-background2 mt-2"></div>{" "}
            </div>
          </div>
          <div className=" h-32 w-full rounded-xl bg-background2 mt-2"></div>

          <div className="mt-3 py-2 border-background2 border-t-[1px] border-b-[1px]">
            <div className="flex justify-between pr-12 sm:w-96 items-center">
              <button className="w-16 h-10 rounded-lg bg-background2"></button>
              <button className="w-16 h-10 rounded-lg bg-background2"></button>
              <button className="w-16 h-10 rounded-lg bg-background2 "></button>
            </div>
          </div>

          <CommentsLoader />

          {/* <div className='mt-2'>
            <div className='w-full  py-1 flex  animate-pulse'>
              <div>
                <div className='w-12 h-12 mr-2 bg-background2 rounded-full float-left'></div>
              </div>
              <div className='w-full'>
                <div className=' h-24 rounded-xl  bg-background2 mt-2'></div>
              </div>
            </div>
            <div className='w-full  py-1 flex  animate-pulse'>
              <div>
                <div className='w-12 h-12 mr-2 bg-background2 rounded-full float-left'></div>
              </div>
              <div className='w-full'>
                <div className=' h-24 rounded-xl  bg-background2 mt-2'></div>
              </div>
            </div>
            <div className='w-full  py-1 flex  animate-pulse'>
              <div>
                <div className='w-12 h-12 mr-2 bg-background2 rounded-full float-left'></div>
              </div>
              <div className='w-full'>
                <div className=' h-24 rounded-xl  bg-background2 mt-2'></div>
              </div>
            </div>
          </div> */}
        </div>
      </>
    );
  }

  return (
    <div ref={el} className="mt-4 bg-white">
      {!short ? (
        <>
          {Array(3)
            .fill(null)
            .map((_, ind) => (
              <div
                key={ind}
                className="px-3 animate-pulse border-b-[1px]  py-2"
              >
                <div className="flex">
                  <div className="w-14 mr-2 cursor-pointer  ">
                    <div className="w-12 h-12 rounded-full mr-2 bg-background2 float-left"></div>
                  </div>
                  <div className=" w-full  ">
                    <div className="max-w-[350px] h-3 rounded-xl bg-background2 mt-2"></div>
                    <div className="w-[150px] h-3 rounded-xl bg-background2 mt-2"></div>{" "}
                    <div className=" h-32 w-full rounded-xl bg-background2 mt-4"></div>
                    <div className="mt-3 py-2 border-background2 border-t-[1px] ">
                      <div className="flex justify-between items-center max-w-lg mx-auto">
                        <div className="w-16 h-10 rounded-lg bg-background2"></div>
                        <div className="w-16 h-10 rounded-lg bg-background2"></div>
                        <div className="w-16 h-10 rounded-lg bg-background2 "></div>
                        <div className="w-16 h-10 rounded-lg bg-background2 "></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </>
      ) : (
        <>
          <div className="px-3 animate-pulse border-b-[1px] question-loader-item py-2">
            <div className="flex">
              <div className="w-14 mr-2 cursor-pointer  ">
                <div className="w-12 h-12 rounded-full mr-2 bg-background2 float-left"></div>
              </div>
              <div className=" w-full  ">
                <div className="max-w-[350px] h-3 rounded-xl bg-background2 mt-2"></div>
                <div className="w-[150px] h-3 rounded-xl bg-background2 mt-2"></div>{" "}
                <div className=" h-32 w-full rounded-xl bg-background2 mt-4"></div>
                <div className="mt-3 py-2 border-background2 border-t-[1px] ">
                  <div className="flex justify-between items-center max-w-lg mx-auto">
                    <div className="w-16 h-10 rounded-lg bg-background2"></div>
                    <div className="w-16 h-10 rounded-lg bg-background2"></div>
                    <div className="w-16 h-10 rounded-lg bg-background2 "></div>
                    <div className="w-16 h-10 rounded-lg bg-background2 "></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-12"></div>
        </>
      )}
    </div>
  );
};

export default QuestionsLoader;
