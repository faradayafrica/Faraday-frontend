import profile1 from "../../images/profile2.png";
import love from "../../images/qfeed/love.svg";
import arrow from "../../images/qfeed/arrow-right.svg";

const Question = () => {
  return (
    <div className="question-component bg-brnd-highlight px-3 pt-3 sm:pt-4  flex justify-start">
      <img src={profile1} className="w-12 h-12 rounded-full mr-2" alt="" />
      <section className=" p-0">
        {/* Profile details */}
        <p className="flex m-0 text-night-secondary mb-1 text-sm sm:text-base">
          <span className="mr-2 font-medium">Olive Ada</span>
          <span className="mr-2"> @olibaby</span> <span>2h</span>
        </p>
        {/* Question head */}
        <p className="text-lg sm:text-xl leading-[120%] font-semibold m-0 mb-2">
          Lorem ipsum dolor sit amet, co no sectetur adipiscing elit. Ultr icies
          risus laoreet enim tristi?
        </p>
        {/* Question body --optional */}
        <p className="text-sm sm:text-base m-0">
          Lorem ipsum dolor sit amet, co no sectetur adipiscing elit. Ultr icies
          risus laoreet enim tristi?
        </p>

        <div className="my-2 px-3 py-2 bg-background w-20 flex justify-between items-center rounded-full cursor-pointer hover:bg-danger-highlight">
          <img src={love} alt="" /> <span className="ml-2 font-medium">32</span>
        </div>
        <div className="comment text-lg font-semibold text-brand py-[14px] flex justify-between">
          Leave a comment
          <img className="mr-2" src={arrow} alt="" />
        </div>
      </section>
    </div>
  );
};

export default Question;
