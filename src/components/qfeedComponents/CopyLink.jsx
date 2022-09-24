import Loader from "../styledComponents/Loader";
import closeImg from "../../images/qfeed/close.svg";
import copy from "../../images/qfeed/copy.svg";
import { useState } from "react";
import { SuccessToast } from "../common/CustomToast";

const CopyLink = ({
  isCopyLinkModal,
  shortLink,
  isCopied,
  toggleCopyLinkModal,
  handleIsCopied,
}) => {
  const copyQuestionLink = () => {
    const copyText = document.getElementById("link");
    navigator.clipboard.writeText(copyText.value);

    handleIsCopied(true);
    SuccessToast("Link copied");
  };
  return (
    <>
      {isCopyLinkModal ? (
        <div className="fixed top-0 left-0  w-full bg-transparent z-10">
          <div
            className=" absolute top-0 h-screen w-full  bg-[#00000022]"
            onClick={() => toggleCopyLinkModal()}
          ></div>
          <div className="z-10 lg:w-[1024px] mx-auto h-screen flex justify-center items-start sm:items-start">
            <div className="w-[28rem] bg-white rounded-xl border ask-shadow p-2 relative my-24 mx-8 sm:mx-4  ">
              <button className="p-2 right-1 top-1 absolute rounded-lg hover:bg-danger-highlight hover:hot-shadow hidden sm:block">
                <img
                  src={closeImg}
                  onClick={() => toggleCopyLinkModal()}
                  alt="close modal"
                />
              </button>

              <div className="px-2 py-3">
                <h5 className="font-semibold">Here's a link to the question</h5>
                {shortLink ? (
                  <>
                    <p className="text-secondary">
                      Copy this link and share with people you want to see the
                      question.
                    </p>
                    <div className="p-2 bg-background rounded-lg flex items-center justify-between">
                      {/* <span id="link">{`https://frda.me/${shortLink}`}</span> */}

                      <input
                        id="link"
                        value={`https://frda.me/${shortLink}`}
                        className="bg-transparent"
                        readOnly
                      />

                      {isCopied ? (
                        <span className="p-2 rounded-lg">Copied!</span>
                      ) : (
                        <button className="w-10 h-10 p-2 rounded-lg hover:bg-background2">
                          <img
                            src={copy}
                            className=""
                            onClick={() => copyQuestionLink()}
                            alt="copy"
                          />
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="mt-4">
                    <Loader />
                  </div>
                )}
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
