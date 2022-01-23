import styled from "styled-components";

export const WelcomeContent = styled.div`
  background: #05b851;
  width: 100%;
  padding: 20px;
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

  @media (min-width: 576px) {
    h2 {
      font-size: 36px;
      line-height: 42px;
    }

    p {
    }
  }
`;
