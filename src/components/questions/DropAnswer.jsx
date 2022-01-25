import React from "react";
import Button from "../Button";
import { DropAnswerContainer } from "../styled/QuestionPageStyled";

function DropAnswer() {
  return (
    <DropAnswerContainer>
      <h3>Drop an answer</h3>
      <textarea name='' id='' placeholder='Add to the discussion'></textarea>

      <Button>Submit</Button>
    </DropAnswerContainer>
  );
}

export default DropAnswer;
