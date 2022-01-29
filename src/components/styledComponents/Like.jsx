import React from "react";
import { useEffect } from "react";
import "../../animation.scss";
import { ReactComponent as IncreaseIcon } from "../../images/arrow-inc.svg";
import { ReactComponent as DecreaseIcon } from "../../images/arrow-dec.svg";

function Like({ question, handleDislike, handleLike, answer }) {
  // console.log(question);
  console.log(answer);

  useEffect(() => {
    var bubblyButtons = document.getElementsByClassName("bubbly-button");

    const animateButton = (e) => {
      e.preventDefault();
      //reset animation
      e.target.classList.remove("animate");

      e.target.classList.add("animate");
      setTimeout(function () {
        e.target.classList.remove("animate");
      }, 700);
    };

    for (var i = 0; i < bubblyButtons.length; i++) {
      bubblyButtons[i].addEventListener("click", animateButton, false);
    }
  }, []);

  return (
    <div className='like bubbly-button'>
      <button
        data-toggle='tooltip'
        title='like'
        onClick={() => handleLike(question)}
        className='btn like-icon'
      >
        <IncreaseIcon fill={question?.isLiked ? "#3F3F41" : "none"} />
      </button>
      <p className='profile-name my-0'>{question?.voteCount}</p>
      <button
        data-toggle='tooltip'
        title='dislike'
        onClick={() => handleDislike(question)}
        className='btn like-icon'
      >
        <DecreaseIcon fill={question?.isDisliked ? "#3F3F41" : "none"} />
      </button>
    </div>
  );
}

export default Like;
