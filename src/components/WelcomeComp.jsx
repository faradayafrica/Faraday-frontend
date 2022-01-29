import React from 'react';
import { WelcomeContent } from './styled/WelcomeCompStyled.jsx';
import Logo from '../images/faraday-icon.svg';
import { ReactComponent as ChevronRight } from '../images/chevron_right.svg';

function WelcomeComp() {
  return (
    <WelcomeContent>
      <img style={{ marginTop: '3rem' }} src={Logo} alt='faraday icon' />
      <h2>Welcome to the community!</h2>
      <p>Suggested things you can do.</p>
      <button>
        Ask your first question
        <ChevronRight />
      </button>
      <button>
        Find scholars to follow
        <ChevronRight />
      </button>
    </WelcomeContent>
  );
}

export default WelcomeComp;
