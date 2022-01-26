import React from "react";
import { WelcomeContent } from "./styled/WelcomeCompStyled.jsx";
import Logo from "../images/faraday-icon.svg";

function WelcomeComp() {
  return (
    <WelcomeContent>
      <img src={Logo} alt='faraday icon' />
      <h2>Welcome to the community!</h2>
      <p>Suggested things you can do.</p>
    </WelcomeContent>
  );
}

export default WelcomeComp;