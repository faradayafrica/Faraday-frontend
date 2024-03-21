import React from "react";
import { ReactComponent as GoogleIcon } from "../../common/assets/google.svg";
import { Link } from "react-router-dom";

function OrGoogle({ login }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <span className="w-1/2 h-[1px] bg-[#E4E4E4]"></span>
        <span className="font-medium text-[#545454]">OR</span>
        <span className="w-1/2 h-[1px] bg-[#E4E4E4]"></span>
      </div>

      <button className="font-medium text-[#1C1C1C] flex gap-2 justify-center border w-full py-2   border-[#AFAFAF] rounded-[50px]">
        <GoogleIcon />
        Sign in with Google
      </button>

      {login ? (
        <div className="font-medium">
          <span>Don't have an account? </span>
          <Link to="/signup" className="text-[#0043CE]">
            Create one
          </Link>
        </div>
      ) : (
        <div className="font-medium">
          <span>Already have an account? </span>
          <Link to="/login" className="text-[#0043CE]">
            Sign in
          </Link>
        </div>
      )}
    </div>
  );
}

export default OrGoogle;
