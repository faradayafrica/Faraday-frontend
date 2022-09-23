import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const NotificationLoader = () => {
  const loader = useRef();

  useEffect(() => {
    gsap.from(loader.current, {
      y: +200,
      opacity: 0,
      stagger: 0.1,
      ease: "power2.inOut",
      delay: 0.6,
    });
  });

  return (
    <div ref={loader} className=".notification-loader">
      <div className="animate-pulse border-b">
        <div className="w-full p-3 flex  ">
          <div className="w-6 h-6 mr-2 bg-background2"></div>

          <div className="w-full">
            <div className="w-8 h-8 rounded-full  bg-background2"></div>
            <div className=" h-3 rounded-xl  bg-background2 mt-2"></div>
            <div className="w-[150px] h-3 rounded-xl  bg-background2 mt-2"></div>
          </div>
        </div>
      </div>

      <div className="animate-pulse border-b">
        <div className="w-full p-3 flex  bg-white">
          <div className="w-6 h-6 mr-2 bg-background2"></div>

          <div className="w-full">
            <div className="w-8 h-8 rounded-full  bg-background2"></div>
            <div className=" h-3 rounded-xl  bg-background2 mt-2"></div>
            <div className="w-[55px] h-3 rounded-xl  bg-background2 mt-2"></div>
          </div>
        </div>
      </div>

      <div className="animate-pulse border-b">
        <div className="w-full p-3 flex  bg-white">
          <div className="w-6 h-6 mr-2 bg-background2"></div>

          <div className="w-full">
            <div className="w-8 h-8 rounded-full  bg-background2"></div>
            <div className=" h-3 rounded-xl  bg-background2 mt-2"></div>
            <div className="w-[112px] h-3 rounded-xl  bg-background2 mt-2"></div>
          </div>
        </div>
      </div>

      <div className="animate-pulse border-b">
        <div className="w-full p-3 flex  bg-white">
          <div className="w-6 h-6 mr-2 bg-background2"></div>

          <div className="w-full">
            <div className="w-8 h-8 rounded-full  bg-background2"></div>
            <div className=" h-3 rounded-xl  bg-background2 mt-2"></div>
            <div className="w-[190px] h-3 rounded-xl  bg-background2 mt-2"></div>
          </div>
        </div>
      </div>

      <div className="animate-pulse border-b">
        <div className="w-full p-3 flex  bg-white">
          <div className="w-6 h-6 mr-2 bg-background2"></div>

          <div className="w-full">
            <div className="w-8 h-8 rounded-full  bg-background2"></div>
            <div className=" h-3 rounded-xl  bg-background2 mt-2"></div>
            <div className="w-[140px] h-3 rounded-xl  bg-background2 mt-2"></div>
          </div>
        </div>
      </div>

      <div className="animate-pulse border-b">
        <div className="w-full p-3 flex  bg-white">
          <div className="w-6 h-6 mr-2 bg-background2"></div>

          <div className="w-full">
            <div className="w-8 h-8 rounded-full  bg-background2"></div>
            <div className=" h-3 rounded-xl  bg-background2 mt-2"></div>
            <div className="w-[80px] h-3 rounded-xl  bg-background2 mt-2"></div>
          </div>
        </div>
      </div>

      <div className="animate-pulse border-b">
        <div className="w-full p-3 flex  bg-white">
          <div className="w-6 h-6 mr-2 bg-background2"></div>

          <div className="w-full">
            <div className="w-8 h-8 rounded-full  bg-background2"></div>
            <div className=" h-3 rounded-xl  bg-background2 mt-2"></div>
            <div className="w-[40px] h-3 rounded-xl  bg-background2 mt-2"></div>
          </div>
        </div>
      </div>

      <div className="animate-pulse border-b">
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
