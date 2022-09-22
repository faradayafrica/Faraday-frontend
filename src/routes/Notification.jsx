import { useEffect } from "react";
import http from "../services/httpService";
import { PromiseToast } from "../components/common/CustomToast";

// icons import
import liked from "../images/qfeed/red-love.svg";
import comment from "../images/notification/comment.svg";
import mark from "../images/qfeed/mark.svg";
import profile from "../images/profile2.png";

const Notification = () => {
  const apiEndpoint = process.env.REACT_APP_API_URL + `/notifications/`;

  useEffect(() => {
    try {
      const promise = http.get(apiEndpoint).then((resp) => {
        console.log(resp.data);
      });

      PromiseToast("Did it", "Couldn't do it", promise);
    } catch (e) {
      console.throw(e);
    }
  });
  
  return (
    <div className="relative w-full route-wrapper ">
      <div className="min-h-[70px] sm:min-h-[0px] bg-transparent"> </div>
      <h1 className="text-2xl sm:text-2xl m-3 font-bold">Notification</h1>

      <div className="bg-brand-highlight w-full p-3 flex">
        <img
          src={liked}
          className="w-7 h-7 rounded-full mr-2"
          style={{ objectFit: "fill" }}
          alt=""
        />

        <div className="">
          <img
            src={profile}
            className="w-8 h-8 rounded-full"
            style={{ objectFit: "cover" }}
            alt=""
          />
          Jome Favorite and 5 others reacted on your question
        </div>
      </div>

      <div className="bg-brand-highlight w-full p-3 flex">
        <img
          src={comment}
          className="w-7 h-7  mr-2"
          style={{ objectFit: "fill" }}
          alt=""
        />

        <div className="">
          <img
            src={profile}
            className="w-8 h-8 rounded-full"
            style={{ objectFit: "cover" }}
            alt=""
          />
          Jome Favorite and 5 others reacted on your question
        </div>
      </div>

      <div className="bg-brand-highlight w-full p-3 flex">
        <img
          src={mark}
          className="w-7 h-7  mr-2"
          style={{ objectFit: "fill" }}
          alt=""
        />

        <div className="">
          <img
            src={profile}
            className="w-8 h-8 rounded-full"
            style={{ objectFit: "cover" }}
            alt=""
          />
          Jome Favorite and 5 others reacted on your question
        </div>
      </div>
    </div>
  );
};

export default Notification;
