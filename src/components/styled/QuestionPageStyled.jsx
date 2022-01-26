import styled from "styled-components";

export const QuestionBodyContent = styled.div`
  font-family: Work Sans;

  .question__title {
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 130%;
    color: #3f3f41;
    transition: color 200ms ease-in;

    &:hover {
      color: #05b851;
    }
  }

  .question__tags {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    color: #6c757d;
    margin-bottom: 0;

    span + span {
      margin-left: 5px;
    }
  }

  @media (min-width: 576px) {
    .question__title {
      font-size: 24px;
    }
  }
`;

export const QuestionTitleContainer = styled.div`
  font-family: Work Sans;
  display: flex;
  align-items: center;
`;

export const QuestionTitle = styled(QuestionBodyContent)`
  .question__title {
    font-size: 20px;
  }
`;

export const QuestionProfileHeading = styled.div`
  font-family: Work Sans;

  > div {
    display: flex;
  }

  .profile__heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-left: 10px;

    h3,
    p {
      margin-bottom: 0;
    }

    h3 {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 19px;
      color: #3f3f41;
    }
  }

  .profile__date {
    font-size: 10px;
    line-height: 12px;
    color: #6c757d;
  }

  .profile__username {
    font-size: 12px;
    line-height: 16px;
    color: #6c757d;
  }

  @media (min-width: 576px) {
    .profile__heading {
      h3 {
        font-size: 16px;
      }
    }

    .profile__username {
      font-size: 14px;
    }
  }
`;

export const QuestionContent = styled.div`
  p {
    font-family: Work Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 130%;
    color: #3f3f41;
    margin-bottom: 0;
  }

  p + p {
    margin-top: 5px;
  }
`;

export const DropAnswerContainer = styled.div`
  padding: 14px;

  h3 {
    font-family: Work Sans;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
  }

  textarea {
    font-family: Work Sans;
    width: 100%;
    height: 100%;
    min-height: 100px;
    padding: 10px;
    border: none;
  }
`;

export const EngagementBtn = styled.div`
  font-family: Work Sans;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    color: #3f3f41;
  }

  div:nth-of-type(1) {
    gap: 10px;
  }
`;
