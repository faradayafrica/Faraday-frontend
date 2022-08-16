import ellipses from "../../../images/qfeed/ellipses.svg";
import CommentMenu from "./CommentMenu";
const CommentComponent = ({ comment, onToggleCommentMenu }) => {
  return (
    <div className=" pt-3 pb-1 flex pr-2 relative">
      <img
        src={`https://api.faraday.africa${comment?.user.profile_pic}`}
        className="w-12 h-12 rounded-full mr-3 "
        style={{ objectFit: "cover" }}
        alt={`${comment?.user.firstname} ${comment?.user.lastname}`}
      />
      <div
        className=" hover:bg-brand-highlight cursor-pointer absolute right-1 top-2 rounded-md"
        onClick={() => {
          onToggleCommentMenu(comment);
        }}
      >
        <img
          src={ellipses}
          className="w-6 h-6 rounded-full m-1 "
          style={{ objectFit: "cover" }}
          alt=""
        />
      </div>

      <div className=" w-full text-faraday-night">
        <p className="m-0  text-xs sm:text-base mr-2">
          <span className="mr-2 font-semibold">
            {comment?.user.firstname} {comment?.user.lastname}
          </span>
          <span className="mr-2 text-night-secondary">
            @{comment?.user.username}
          </span>
          <span className="mr-2 text-night-secondary">{comment?.created}</span>
        </p>
        <p className="text-sm sm:text-base m-0 mb-2 text-faraday-night">
          {comment?.content}
        </p>
      </div>
    </div>
  );
};

export default CommentComponent;
