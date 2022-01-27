import React from "react";
import styled from "styled-components";

const ButtonStyled = styled.button`
  font-family: Work Sans;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 8px;
  background: ${({ bg }) => bg || "#05b851"};
  color: ${({ color }) => color || "#fff"};
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:hover {
    opacity: 1;
    background: #23933f;
  }
`;

function Button({ children }) {
  return <ButtonStyled>{children}</ButtonStyled>;
}

export default Button;
