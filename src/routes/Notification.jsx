import { useEffect } from "react";
import http from "../services/httpService";

const Notification = () => {
  const apiEndpoint = process.env.REACT_APP_API_URL + `/notifications/read/`;

  useEffect(() => {
    try {
      const promise = http.get(apiEndpoint).then((resp) => {
        console.log(resp);
      });
    } catch (e) {
      console.throw(e);
    }
  });
  return (
    <div className="relative w-full route-wrapper ">
      <div className="min-h-[70px] sm:min-h-[0px] bg-transparent"> </div>
      <h1 className="text-2xl sm:text-2xl m-3 font-bold">Notification</h1>

      <div className="bg-brand-highlight w-full"></div>
    </div>
  );
};

export default Notification;
