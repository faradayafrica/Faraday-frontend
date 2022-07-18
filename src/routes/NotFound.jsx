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
          <Link to="/" className="text-faraday-night">
            <p className="mt-3 w-60 text-lg mx-auto">
              Click here to navigate back to the{" "}
              <span className="text-brand font-bold hover:underline">
                Question Feed
              </span>
            </p>
          </Link>
        </div>
      </div>
    );
  }
}

export default NotFound;
