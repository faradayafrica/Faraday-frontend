import styled from "styled-components";

export const QuestionBodyContent = styled.div`
  font-family: Work Sans;

  .question__title {
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 130%;
    color: #3f3f41;
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
`;
