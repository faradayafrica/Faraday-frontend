import React from "react";
import { useEffect } from "react";
import "../../animation.scss";
import { ReactComponent as IncreaseIcon } from "../../images/arrow-inc.svg";

function Like({ voteCount = 0, isLiked = true, isDisliked, id }) {
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
      <button className='btn'>
        <IncreaseIcon />
      </button>
      <div
        data-toggle='tooltip'
        title='like'
        // onClick={() => props.onLike(id)}
        className='like-icon'
      >
        {isLiked ? (
          <svg
            width='16'
            height='10'
            viewBox='0 0 16 10'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M13.3193 10C15.0798 10 15.9815 7.88974 14.7646 6.61755L9.81854 1.44665C9.05452 0.64791 7.78746 0.620351 6.98944 1.38512L1.59371 6.55603C0.292404 7.80311 1.17513 10 2.97753 10H13.3193Z'
              fill='#05B851'
            />
          </svg>
        ) : (
          <svg
            width='16'
            height='10'
            viewBox='0 0 16 10'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M2.97753 9.5L13.3193 9.5C14.6397 9.5 15.316 7.9173 14.4033 6.96317L9.45722 1.79226C8.8842 1.19321 7.93391 1.17254 7.33539 1.74611L1.93967 6.91702C0.963684 7.85233 1.62573 9.5 2.97753 9.5Z'
              stroke='#3F3F41'
            />
          </svg>
        )}
      </div>
      <p className='profile-name'>{voteCount}</p>
      <div
        data-toggle='tooltip'
        title='dislike'
        // onClick={() => props.onDislike(id)}
        className='like-icon '
      >
        {isDisliked ? (
          <svg
            width='16'
            height='10'
            viewBox='0 0 16 10'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M2.68067 0C0.920202 0 0.0185101 2.11026 1.23538 3.38245L6.18146 8.55335C6.94548 9.35209 8.21254 9.37965 9.01056 8.61488L14.4063 3.44397C15.7076 2.19689 14.8249 0 13.0225 0L2.68067 0Z'
              fill='#05B851'
            />
          </svg>
        ) : (
          <svg
            width='16'
            height='10'
            viewBox='0 0 16 10'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M13.0225 0.5L2.68067 0.5C1.36032 0.5 0.684049 2.0827 1.5967 3.03683L6.54278 8.20774C7.1158 8.80679 8.06609 8.82746 8.66461 8.25389L14.0603 3.08298C15.0363 2.14767 14.3743 0.5 13.0225 0.5Z'
              stroke='#3F3F41'
            />
          </svg>
        )}
      </div>
    </div>
  );
}

export default Like;
