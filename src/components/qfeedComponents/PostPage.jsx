import PostComponent from "./PostComponent";

const PostPage = (props) => {
  const backToHome = () => {
    props.history.replace("/");
  };
  return (
    <div className="absolute bg-white z-20 top-0 left-0 h-screen w-screen qfeed-wrapper sm:static sm:w-auto ">
      <div className=" w-full ">
        <div className="min-h-[70px] sm:min-h-[0px]  "> </div>
        <div className="">
          <PostComponent hidePost={backToHome} {...props} />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
