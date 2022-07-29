const CommentComponent = ({ comment }) => {
  return (
    <div className=" pt-3 pb-1 flex ">
      <img
        src={`https://api.faraday.africa${comment?.user.profile_pic}`}
        className="w-12 h-12 rounded-full mr-3 "
        alt=""
      />
      <div className=" w-full text-faraday-night">
        <p className="m-0  text-xs sm:text-base mr-2">
          <span className="mr-2 font-semibold">
            {comment?.user.firstname} {comment?.user.lastname}
          </span>
          <span className="mr-2 text-night-secondary">
            @{comment?.user.username}
          </span>
          <span className="mr-2 text-night-secondary">2hr</span>
        </p>
        <p className="text-xs sm:text-sm m-0 mb-2 text-faraday-night">
          {comment?.content}
        </p>
      </div>
    </div>
  );
};

export default CommentComponent;
