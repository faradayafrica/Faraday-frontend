import QuestionsLoader from "../../Qfeed/components/QuestionsLoader";
import "../styles/profile.css";

const ProfileHomeLoader = () => {
  return (
    <div className="bg-white">
      <div className="min-h-[70px] sm:min-h-[20px] bg-slate-300 animate-pulse">
        {" "}
      </div>

      <div className=" text-sm sm:text-base">
        <div className=" bg-slate-300 flex items-center justify-center h-24 animate-pulse">
          <div
            className="h-24 w-24 bg-white rounded-full relative top-8 "
            style={{ objectFit: "cover", border: "3px solid #f8f9fa " }}
          ></div>
        </div>

        <div className="px-3 mt-4 ">
          <div className="flex justify-between items-end ">
            <div className="mt-2 animate-pulse">
              <div className="font-bold text-sm sm:text-base min-w-[7rem] h-3 bg-slate-300 rounded-md"></div>
              <div className="text-xm text-night-secondary mt-2 w-[4rem] h-3 bg-slate-300 rounded-md"></div>
            </div>

            <div className="h-10 w-24 bg-slate-300 rounded-md animate-pulse">
              {/* follow button */}
            </div>
          </div>

          <p className="mt-3 h-10 w-full bg-slate-300 rounded-md animate-pulse">
            {/* bio */}
          </p>
        </div>
        <QuestionsLoader />
      </div>
    </div>
  );
};

export default ProfileHomeLoader;
