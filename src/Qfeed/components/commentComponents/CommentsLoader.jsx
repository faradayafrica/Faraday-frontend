import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import LazyReply from "./LazyReply";
import "../../styles/comment.css";

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
        <div style={{ margin: 0 }} className={`comment-wrapper`}>
          <div className="offset">
            <LazyReply />
            <LazyReply />
            <LazyReply />
            <LazyReply />
          </div>
        </div>
      ) : (
        <div style={{ margin: 0 }} className={`comment-wrapper`}>
          <div className="offset">
            <LazyReply />
            <LazyReply />
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsLoader;
