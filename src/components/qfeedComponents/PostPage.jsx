import PostComponent from "./PostComponent";

const PostPage = (props) => {
  return (
    <>
      <div className=" w-full qfeed-wrapper">
        <div className="min-h-[70px] sm:min-h-[0px]  "> </div>
        <div className="">
          <PostComponent {...props} />
        </div>
      </div>
    </>
  );
};

export default PostPage;
