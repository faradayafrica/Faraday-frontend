import React from "react";
import Myspinner from "../../../common/components/Spinner";
import { ReactComponent as FaradayLogo } from "../../../common/assets/logo-green.svg";

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
          <h2>Hello Chinagorom Ngozichukwu</h2>
          <p>
            Choose a cool username so others can easily find you on Faraday!
          </p>
        </div>

        <form></form>
      </div>
    </div>
  );
}

export default CreateUsername;
