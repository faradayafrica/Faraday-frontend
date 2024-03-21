import React from "react";
import Myspinner from "../../../common/components/Spinner";
import { ReactComponent as FaradayLogo } from "../../../common/assets/logo-green.svg";
import Input from "../../../common/components/form/input";
import PrimaryButton from "../../../common/components/PrimaryButton";
import { Link } from "react-router-dom";

function RecoverAccount() {
  return (
    <div className="login-page">
      {/* the spinner */}
      <div id="spinnerContainer" className="spinner-container vanish">
        <Myspinner />
      </div>

      <div className="form-container">
        <div className="logo-container ">
          <FaradayLogo className="mx-auto" />
        </div>

        <div>
          <h2 className="form-title text-[#1C1C1C] font-bold">
            Recover Account
          </h2>
          <p className="text-sm">
            Please fill in details associated to the account you want to
            recover.
          </p>
        </div>

        <form className="space-y-4">
          <Input name="email" placeholder={"Email"} />

          <PrimaryButton cta={"Continue"} wide />
        </form>

        <div className=" text-sm mt-8">
          <span>Remembered your password? </span>
          <Link to="/login" className="text-[#0043CE] font-medium">
            Try logging in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecoverAccount;
