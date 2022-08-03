import PostComponent from "./PostComponent";

const PostPage = (props) => {
  const backToHome = () => {
    props.history.replace("/");
  };
  return (
    <div className=" w-full">
      <div className="min-h-[70px] sm:min-h-[0px]  "> </div>
      <div className="">
        <PostComponent hidePost={backToHome} {...props} />
      </div>
    </div>
  );
};

export default PostPage;
