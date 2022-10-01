import { useEffect, useRef } from "react";
import { gsap } from "gsap";

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

          <div className="mt-2">
            <div className="w-full  py-1 flex  animate-pulse">
              <div>
                <div className="w-12 h-12 mr-2 bg-background2 rounded-full float-left"></div>
              </div>
              <div className="w-full">
                <div className=" h-24 rounded-xl  bg-background2 mt-2"></div>
              </div>
            </div>
            <div className="w-full  py-1 flex  animate-pulse">
              <div>
                <div className="w-12 h-12 mr-2 bg-background2 rounded-full float-left"></div>
              </div>
              <div className="w-full">
                <div className=" h-24 rounded-xl  bg-background2 mt-2"></div>
              </div>
            </div>
            <div className="w-full  py-1 flex  animate-pulse">
              <div>
                <div className="w-12 h-12 mr-2 bg-background2 rounded-full float-left"></div>
              </div>
              <div className="w-full">
                <div className=" h-24 rounded-xl  bg-background2 mt-2"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div ref={el} className="mt-4">
      {!short ? (
        <>
          <div className="px-3 animate-pulse border-b-[1px]  py-2">
            <div className="flex">
              <div className="w-14 mr-2 cursor-pointer  ">
                <div className="w-12 h-12 rounded-full mr-2 bg-background2 float-left"></div>
              </div>
              <div className=" w-full  ">
                <div className="max-w-[350px] h-3 rounded-xl bg-background2 mt-2"></div>
                <div className="w-[150px] h-3 rounded-xl bg-background2 mt-2"></div>{" "}
                <div className=" h-32 w-full rounded-xl bg-background2 mt-4"></div>
                <div className="mt-3 py-2 border-background2 border-t-[1px] ">
                  <div className="flex justify-between pr-12 sm:w-96 items-center">
                    <button className="w-16 h-10 rounded-lg bg-background2"></button>
                    <button className="w-16 h-10 rounded-lg bg-background2"></button>
                    <button className="w-16 h-10 rounded-lg bg-background2 "></button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-3 animate-pulse border-b-[1px]  py-2">
            <div className="flex">
              <div className="w-14 mr-2 cursor-pointer  ">
                <div className="w-12 h-12 rounded-full mr-2 bg-background2 float-left"></div>
              </div>
              <div className=" w-full  ">
                <div className="max-w-[350px] h-3 rounded-xl bg-background2 mt-2"></div>
                <div className="w-[150px] h-3 rounded-xl bg-background2 mt-2"></div>{" "}
                <div className=" h-32 w-full rounded-xl bg-background2 mt-4"></div>
                <div className="mt-3 py-2 border-background2 border-t-[1px] ">
                  <div className="flex justify-between pr-12 sm:w-96 items-center">
                    <button className="w-16 h-10 rounded-lg bg-background2"></button>
                    <button className="w-16 h-10 rounded-lg bg-background2"></button>
                    <button className="w-16 h-10 rounded-lg bg-background2 "></button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-3 animate-pulse border-b-[1px]  py-2">
            <div className="flex">
              <div className="w-14 mr-2 cursor-pointer  ">
                <div className="w-12 h-12 rounded-full mr-2 bg-background2 float-left"></div>
              </div>
              <div className=" w-full  ">
                <div className="max-w-[350px] h-3 rounded-xl bg-background2 mt-2"></div>
                <div className="w-[150px] h-3 rounded-xl bg-background2 mt-2"></div>{" "}
                <div className=" h-32 w-full rounded-xl bg-background2 mt-4"></div>
                <div className="mt-3 py-2 border-background2 border-t-[1px] ">
                  <div className="flex justify-between pr-12 sm:w-96 items-center">
                    <button className="w-16 h-10 rounded-lg bg-background2"></button>
                    <button className="w-16 h-10 rounded-lg bg-background2"></button>
                    <button className="w-16 h-10 rounded-lg bg-background2 "></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full px-3 py-1 flex question-loader-item animate-pulse">
          <div>
            <div className="w-12 h-12 mr-2 bg-background2 rounded-full float-left"></div>
          </div>

          <div className="w-full">
            <div className=" h-24 rounded-xl  bg-background2 mt-2"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionsLoader;
