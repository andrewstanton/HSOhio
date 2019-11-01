import styled from "styled-components";
import { Color } from "../Color";

export const Card = styled.div`
  padding: 2.5rem;
  border-radius: 2px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    color: ${Color.green};
  }
`;

export const WhiteCard = styled(Card)`
  background: ${Color.white};
`;
