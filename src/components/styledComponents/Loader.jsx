import React from "react";
import { useState } from "react";
import "../../loader.scss";

function Loader() {
  return (
    <React.Fragment>
      <div className="p-3 border-brand-highlight rounded-xl border bg-background m-3">
        <div className="text-xl w-full scale-[60%] row  items-center justify-center mx-auto">
          <div className=" w-100 text-center mb-6">
            This might take a while...
          </div>

          <div className="loader"></div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Loader;
