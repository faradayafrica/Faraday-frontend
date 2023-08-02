import { useRef, useEffect } from "react";
import gsap from "gsap";

const Modal = ({ visible, icon, title, message, cancel }) => {
  const modal = useRef();
  useEffect(() => {
    setTimeout(() => {
      gsap.fromTo(
        modal.current,
        { y: +50, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.inOut" }
      );
    }, 200);
  }, [visible]);

  return (
    <>
      {visible && (
        <div className="z-50  fixed top-0 left-0 w-full h-full bg-[#000000bb] flex justify-center items-center">
          <div
            ref={modal}
            className="bg-white p-12 rounded-3xl max-w-[450px] min-w-[400px] text-center opacity-0 m-12"
          >
            <div className="py-[5px] px-[3px]  rounded-full bg-background2 inline-flex justify-center items-center cursor-pointer">
              <img src={icon} className="h-7 w-7 mx-1" alt="disclaimer" />
            </div>
            <p className="text-xl font-bold mt-2 mb-1">{title}</p>
            <p className="mb-4">{message}</p>
            <button
              onClick={() => cancel()}
              className="bg-faraday-night text-white py-3 px-4 rounded-xl w-full"
            >
              Sounds good!
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
