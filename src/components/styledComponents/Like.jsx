import React from "react";
import { useEffect } from "react";
import "../../animation.scss";
import { ReactComponent as IncreaseIcon } from "../../images/arrow-inc.svg";
import { ReactComponent as DecreaseIcon } from "../../images/arrow-dec.svg";

function Like({
  voteCount,
  isLiked,
  isDisliked,
  id,
  // onLike,
  // onDislike,
  question,
  handleDislike,
  handleLike,
}) {
  const animateButton = (e) => {
    e.preventDefault();
    //reset animation
    e.target.classList.remove("animate");

    e.target.classList.add("animate");
    setTimeout(function () {
      e.target.classList.remove("animate");
    }, 700);
  };

  // const { voteCount = 0, isLiked = true, isDisliked, id } = props.question;
  // console.log(props.question);

  useEffect(() => {
    var bubblyButtons = document.getElementsByClassName("bubbly-button");

    for (var i = 0; i < bubblyButtons.length; i++) {
      bubblyButtons[i].addEventListener("click", animateButton, false);
    }
  }, []);

  return (
    <div className='like bubbly-button'>
      <button
        data-toggle='tooltip'
        title='like'
        onClick={() => handleLike(id)}
        className='btn like-icon'
      >
        <IncreaseIcon fill={isLiked ? "#3F3F41" : "none"} />
      </button>
      <p className='profile-name my-0'>{voteCount}</p>
      <button
        data-toggle='tooltip'
        title='dislike'
        onClick={() => handleDislike(id)}
        className='btn like-icon'
      >
        <DecreaseIcon fill={isDisliked ? "#3F3F41" : "none"} />
      </button>
    </div>
  );
}

export default Like;
