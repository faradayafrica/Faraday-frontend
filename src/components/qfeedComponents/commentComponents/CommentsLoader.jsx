import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CommentsLoader = ({ short }) => {
  const el = useRef();
  const q = gsap.utils.selector(el);

  useEffect(() => {
    gsap.fromTo(
      q(".comment-loader-item"),
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

  return (
    <div ref={el}>
      {!short ? (
        <div className="animate-pulse comment-loader-item mt-2">
          <div className="w-full px-3 py-1 flex  animate-pulse">
            <div>
              <div className="w-12 h-12 mr-2 bg-background2 rounded-full float-left"></div>
            </div>

            <div className="w-full">
              <div className=" h-24 rounded-xl  bg-background2 mt-2"></div>
            </div>
          </div>

          <div className="w-full px-3 py-1 flex  animate-pulse">
            <div>
              <div className="w-12 h-12 mr-2 bg-background2 rounded-full float-left"></div>
            </div>

            <div className="w-full">
              <div className=" h-24 rounded-xl  bg-background2 mt-2"></div>
            </div>
          </div>

          <div className="w-full px-3 py-1 flex  animate-pulse">
            <div>
              <div className="w-12 h-12 mr-2 bg-background2 rounded-full float-left"></div>
            </div>

            <div className="w-full">
              <div className=" h-24 rounded-xl  bg-background2 mt-2"></div>
            </div>
          </div>

          <div className="w-full px-3 py-1 flex  animate-pulse">
            <div>
              <div className="w-12 h-12 mr-2 bg-background2 rounded-full float-left"></div>
            </div>

            <div className="w-full">
              <div className=" h-24 rounded-xl  bg-background2 mt-2"></div>
            </div>
          </div>

          <div className="w-full px-3 py-1 flex  animate-pulse">
            <div>
              <div className="w-12 h-12 mr-2 bg-background2 rounded-full float-left"></div>
            </div>

            <div className="w-full">
              <div className=" h-24 rounded-xl  bg-background2 mt-2"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full px-3 py-1 flex  animate-pulse">
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

export default CommentsLoader;
