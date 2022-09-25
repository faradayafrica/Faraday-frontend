import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const NotificationLoader = () => {
  const el = useRef();
  const q = gsap.utils.selector(el);

  useEffect(() => {
    gsap.fromTo(
      q(".notification-loader-item"),
      {
        y: +200,
        ease: "power2.inOut",
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        repeat: -2,
        repeatDelay: 1,
      }
    );
  });

  return (
    <div ref={el} className=".notification-loader">
      <div className="animate-pulse border-b notification-loader-item">
        <div className="w-full p-3 flex  ">
          <div className="w-6 h-6 mr-2 bg-background2"></div>

          <div className="w-full">
            <div className="w-8 h-8 rounded-full  bg-background2"></div>
            <div className=" h-3 rounded-xl  bg-background2 mt-2"></div>
            <div className="w-[150px] h-3 rounded-xl  bg-background2 mt-2"></div>
          </div>
        </div>
      </div>

      <div className="animate-pulse border-b notification-loader-item">
        <div className="w-full p-3 flex  bg-white">
          <div className="w-6 h-6 mr-2 bg-background2"></div>

          <div className="w-full">
            <div className="w-8 h-8 rounded-full  bg-background2"></div>
            <div className=" h-3 rounded-xl  bg-background2 mt-2"></div>
            <div className="w-[55px] h-3 rounded-xl  bg-background2 mt-2"></div>
          </div>
        </div>
      </div>

      <div className="animate-pulse border-b notification-loader-item">
        <div className="w-full p-3 flex  bg-white">
          <div className="w-6 h-6 mr-2 bg-background2"></div>

          <div className="w-full">
            <div className="w-8 h-8 rounded-full  bg-background2"></div>
            <div className=" h-3 rounded-xl  bg-background2 mt-2"></div>
            <div className="w-[112px] h-3 rounded-xl  bg-background2 mt-2"></div>
          </div>
        </div>
      </div>

      <div className="animate-pulse border-b notification-loader-item">
        <div className="w-full p-3 flex  bg-white">
          <div className="w-6 h-6 mr-2 bg-background2"></div>

          <div className="w-full">
            <div className="w-8 h-8 rounded-full  bg-background2"></div>
            <div className=" h-3 rounded-xl  bg-background2 mt-2"></div>
            <div className="w-[190px] h-3 rounded-xl  bg-background2 mt-2"></div>
          </div>
        </div>
      </div>

      <div className="animate-pulse border-b notification-loader-item">
        <div className="w-full p-3 flex  bg-white">
          <div className="w-6 h-6 mr-2 bg-background2"></div>

          <div className="w-full">
            <div className="w-8 h-8 rounded-full  bg-background2"></div>
            <div className=" h-3 rounded-xl  bg-background2 mt-2"></div>
            <div className="w-[140px] h-3 rounded-xl  bg-background2 mt-2"></div>
          </div>
        </div>
      </div>

      <div className="animate-pulse border-b notification-loader-item">
        <div className="w-full p-3 flex  bg-white">
          <div className="w-6 h-6 mr-2 bg-background2"></div>

          <div className="w-full">
            <div className="w-8 h-8 rounded-full  bg-background2"></div>
            <div className=" h-3 rounded-xl  bg-background2 mt-2"></div>
            <div className="w-[80px] h-3 rounded-xl  bg-background2 mt-2"></div>
          </div>
        </div>
      </div>

      <div className="animate-pulse border-b notification-loader-item">
        <div className="w-full p-3 flex  bg-white">
          <div className="w-6 h-6 mr-2 bg-background2"></div>

          <div className="w-full">
            <div className="w-8 h-8 rounded-full  bg-background2"></div>
            <div className=" h-3 rounded-xl  bg-background2 mt-2"></div>
            <div className="w-[40px] h-3 rounded-xl  bg-background2 mt-2"></div>
          </div>
        </div>
      </div>

      <div className="animate-pulse border-b notification-loader-item">
        <div className="w-full p-3 flex  bg-white">
          <div className="w-6 h-6 mr-2 bg-background2"></div>

          <div className="w-full">
            <div className="w-8 h-8 rounded-full  bg-background2"></div>
            <div className=" h-3 rounded-xl  bg-background2 mt-2"></div>
            <div className="w-[40px] h-3 rounded-xl  bg-background2 mt-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationLoader;
