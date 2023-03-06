import React, { Component } from "react";
import notFound from "../assets/memes/notfound.jpg";
import { Link } from "react-router-dom";

class NotFound extends Component {
  render() {
    return (
      <div className="bg-white absolute top-0 left-0 w-full h-screen flex justify-center">
        <div className="max-w-[230px] sm:max-w-[400px] mt-28">
          <img
            className="m-3 mt-3 mx-auto border-brand-highlight rounded-lg border bg-background "
            src={notFound}
            alt=""
          />

          <div className="p-3 border-brand-highlight rounded-lg border bg-background mt-3 text-center">
            <p className="text-sm sm:text-base ">
              Click here to navigate back to the Question feed
            </p>
            <Link to="/">
              <button className="cursor:pointer mx-auto px-4 py-[9px] rounded-lg font-semibold text-white bg-brand hover:bg-brand-dark">
                Qfeed
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
