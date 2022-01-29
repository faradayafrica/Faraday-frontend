import styled from 'styled-components';

export const WelcomeContent = styled.div`
  background: #05b851;
  width: 100%;
  padding: 28px;
  font-family: Work Sans;

  h2 {
    color: #fff;
    margin-bottom: 0;
    font-weight: bold;
    font-size: 28px;
    line-height: 33px;
    margin-top: 1rem;
  }

  p {
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 0;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
  }

  button {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-family: Work Sans;
    background: #ffffff6c;
    color: #fff;
    padding: 0.8rem;
    border: none;
    border-radius: 8px;
    text-align: left;
    margin-top: 1rem;
  }

  @media (min-width: 576px) {
    h2 {
      font-size: 36px;
      line-height: 42px;
    }

    p {
    }
  }
`;
