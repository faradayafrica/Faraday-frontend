import React from "react";
import Myspinner from "../../../common/components/Spinner";
import { ReactComponent as FaradayLogo } from "../../../common/assets/logo-green.svg";
import Input from "../../../common/components/form/input";
import PrimaryButton from "../../../common/components/PrimaryButton";

function CreateUsername() {
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
            Hello Chinagorom Ngozichukwu
          </h2>
          <p className="text-sm">
            Choose a cool username so others can easily find you on Faraday!
          </p>
        </div>

        <form className="space-y-4">
          <Input name="email" placeholder={"Email"} />
          <Input name="username" placeholder={"Username"} />

          <PrimaryButton cta={"Continue"} wide />
        </form>
      </div>
    </div>
  );
}

export default CreateUsername;
