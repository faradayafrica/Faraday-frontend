import React, { Component } from "react";
import notFound from "../images/memes/notfound.jpg";
import { Link } from "react-router-dom";

class NotFound extends Component {
  render() {
    return (
      <div className="bg-white absolute top-0 left-0 w-full h-screen flex justify-center items-center">
        <div className="m-4 text-center">
          {/* <h2 className="text-2xl font-bold">
            The URL don carry you go where we no know!
          </h2> */}
          <img
            className="max-w-[230px] md:max-w-[400px] mx-auto rounded-xl"
            src={notFound}
            alt=""
          />

          <div className="p-3 border-brand-highlight rounded-xl border bg-background mt-3">
            <p> Click here to navigate back to the Question feed</p>
            <Link to="/">
              <button className="px-4 py-[10px] rounded-xl text-semibold text-white bg-brand hover:bg-brand-dark">
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
