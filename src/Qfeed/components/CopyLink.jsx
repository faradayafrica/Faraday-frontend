import Loader from "../../common/components/Loader";
import closeImg from "../assets/close.svg";
import copy from "../assets/copy.svg";
import { useCallback, useEffect, useRef, useState } from "react";
import { SuccessToast } from "../../common/components/CustomToast";
import { ShareQuestion } from "./QuestionComponent";
import copy2 from "../assets/copy-2.svg";
import checked from "../assets/check.svg";
import link from "../assets/link.svg";
import { Fragment } from "react";
import gsap from "gsap";
import SecondaryButton from "../../common/components/SecondaryButton";
import PrimaryButton from "../../common/components/PrimaryButton";
import { Dialog, Transition } from "@headlessui/react";
import { toPng } from "html-to-image";

const CopyLink = (props) => {
  const {
    isCopyLinkModal,
    shortLink,
    isCopied,
    toggleCopyLinkModal,
    handleIsCopied,
    questionProp,
  } = props;

  const copy_modal = useRef();
  const share_node = useRef(null);
  const [isChecked, setIsChecked] = useState("one");

  const handleChecked = (ev) => {
    setIsChecked(ev.target.value);
  };

  const handleCopyLinkModal = () => {
    gsap.fromTo(
      copy_modal.current,
      { y: 0, opacity: 1 },
      { y: +100, opacity: 0, duration: 0.2, ease: "power2.inOut" }
    );
    setTimeout(() => {
      toggleCopyLinkModal(false);
    }, 200);
  };

  useEffect(() => {
    setTimeout(() => {
      gsap.fromTo(
        copy_modal.current,
        { y: +100, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.inOut" }
      );
    }, 200);
  }, [isCopyLinkModal]);

  const handleDownload = useCallback(() => {
    if (share_node.current === null) {
      return;
    }

    toPng(share_node.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${questionProp.question.title}`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [share_node]);

  const copyQuestionLink = () => {
    const copyText = document.getElementById("link");
    navigator.clipboard.writeText(copyText.value);

    handleIsCopied(true);
    SuccessToast("Link copied");
  };

  return (
    <>
      {isCopyLinkModal ? (
        <div className="fixed top-0 left-0  w-full bg-transparent z-50">
          <div
            onClick={handleCopyLinkModal}
            className=" absolute top-0 h-screen w-full  bg-[#00000022]"
          ></div>
          <div
            ref={copy_modal}
            className="z-10 lg:w-[1024px] mx-auto h-screen flex justify-center items-start sm:items-start opacity-0"
          >
            <div
              onClick={() => handleCopyLinkModal()}
              className=" fixed h-screen w-full"
            ></div>
            <div className="w-[52rem] bg-white rounded-xl border ask-shadow p-6 relative my-24 mx-8 sm:mx-4  ">
              <button
                onClick={() => handleCopyLinkModal()}
                className="p-2 right-1 top-1 absolute rounded-lg hover:bg-danger-highlight hover:hot-shadow hidden sm:block"
              >
                <img src={closeImg} alt="close modal" />
              </button>

              <div className="grid md:grid-cols-2 gap-2">
                <div>
                  <div
                    ref={share_node}
                    className={`relative px-8 py-28 ${
                      isChecked === "one"
                        ? "bg-[linear-gradient(101deg,#FEECD4_-2.93%,_#F4FBF3_53.9%,#D6F8EE_100%)]"
                        : isChecked === "two"
                        ? "bg-[#F1FBEF]"
                        : "bg-[#FDF1DF]"
                    }  rounded-md`}
                  >
                    <ShareQuestion questionProp={questionProp} />

                    <div className="absolute bottom-[40px] left-0 right-0 border-2 border-[#35C567]  text-[#35C567] text-center rounded-md max-w-[120px] mx-auto bg-white p-2">
                      <p className="text-[10px] font-bold">
                        Join the Cool Club
                      </p>
                      <p className="text-[6px]">
                        https://www.app.faraday.africa
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1 justify-center mt-4">
                    <label htmlFor="one" className="flex ">
                      <input
                        id="one"
                        type="radio"
                        name="share-gradient"
                        className="peer/one appearance-none "
                        value={"one"}
                        onChange={handleChecked}
                      />
                      <div className=" peer-checked/one:border-2 peer-checked/one:border-brand bg-[linear-gradient(101deg,#FEECD4_-2.93%,_#F4FBF3_53.9%,#D6F8EE_100%)] w-3 h-3 rounded-full"></div>
                    </label>

                    <label htmlFor="two" className="flex ">
                      <input
                        id="two"
                        type="radio"
                        name="share-gradient"
                        className="peer/two appearance-none "
                        checked={isChecked.two}
                        value={"two"}
                        onChange={handleChecked}
                      />
                      <div className="peer-checked/two:border-2 peer-checked/two:border-brand bg-[#F1FBEF] w-3 h-3 rounded-full"></div>
                    </label>

                    <label htmlFor="three" className="flex ">
                      <input
                        id="three"
                        type="radio"
                        name="share-gradient"
                        className="peer/three appearance-none "
                        value={"three"}
                        onChange={handleChecked}
                      />
                      <div className="peer-checked/three:border-2 peer-checked/three:border-brand bg-[#FEECD4] w-3 h-3 rounded-full"></div>
                    </label>
                  </div>
                </div>

                <div className="px-2 py-3">
                  <h5 className="font-bold">Share Question</h5>
                  {shortLink ? (
                    <>
                      <p className="text-faraday-night opacity-70 text-sm mb-4 mt-2">
                        Share your question on social media to help more people
                        find it. Copy the short URL below or download and share
                        the question shot!
                      </p>
                      <div
                        className={`p-2 ${
                          isCopied ? "bg-[#F1FBEF]" : "bg-[#F7F7F7]"
                        } rounded-lg flex items-center justify-between mb-4`}
                      >
                        {/* <span id="link">{`https://frda.me/${shortLink}`}</span> */}
                        <img src={link} className="" alt="copy" />

                        <input
                          id="link"
                          value={`https://frda.me/${shortLink}`}
                          className={`bg-transparent  text-sm w-full mx-1 font-bold text-[#6C757D]`}
                          readOnly
                        />

                        {isCopied ? (
                          <button className="w-10 h-10 p-2">
                            <img src={checked} className="" alt="checked" />
                          </button>
                        ) : (
                          <button className="w-10 h-10 p-2 rounded-lg bg-white">
                            <img
                              src={copy2}
                              className=""
                              onClick={() => copyQuestionLink()}
                              alt="copy"
                            />
                          </button>
                        )}
                      </div>

                      {/* <PrimaryButton wide>Download Image</PrimaryButton> */}
                    </>
                  ) : (
                    <div className="mt-4">
                      <Loader />
                    </div>
                  )}

                  <button
                    onClick={handleDownload}
                    className="mt-3 px-4 py-[7px] sm:py-[9px] rounded-lg font-semibold text-white bg-[#011945] hover:bg-faraday-night-hover cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none w-full"
                  >
                    Download Image
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        " "
      )}
    </>
  );
};

export default CopyLink;
