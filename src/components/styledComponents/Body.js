import styled from "styled-components";

const Body = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;

  /* border: solid 1px #05b851; ; */

  @media (min-width: 577px) {
    grid-template-columns: auto 1fr;
  }
`;

export default Body;
