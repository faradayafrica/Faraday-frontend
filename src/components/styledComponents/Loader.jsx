import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "../../loader.scss";

function Loader({ onRefresh }) {
  const [loading, setLoading] = useState(true);

  // const refreshPage = () => {
  //   window.location.reload(false);
  // };

  // this displays a retry btn after spinning for a while
  // This is wrong, it updates state for an unmounted component
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => {
      setLoading(true);
    };
  }, []);

  return (
    <React.Fragment>
      <div className="text-xl mt-24 w-full scale-[60%] row  items-center justify-center mx-auto">
        {loading === true ? (
          <div className=" w-100 text-center mb-6">Your page is loading...</div>
        ) : (
          <div className=" w-100 text-center mb-6">Any second now...</div>
        )}
        <div className="loader"></div>
      </div>
    </React.Fragment>
  );
}

export default Loader;
