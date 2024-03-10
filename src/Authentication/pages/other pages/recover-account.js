import React from "react";
import Myspinner from "../../../common/components/Spinner";
import { ReactComponent as FaradayLogo } from "../../../common/assets/logo-green.svg";

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
          <h2>Recover Account</h2>
          <p>
            Please fill in details associated to the account you want to
            recover.
          </p>
        </div>

        <form></form>
      </div>
    </div>
  );
}

export default RecoverAccount;
