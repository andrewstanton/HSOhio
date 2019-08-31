import styled from "styled-components"

import { Width } from "../../utilities"

export const Wrapper = styled.div`
  margin: auto;
  max-width: ${Width.wrapper};
  width: ${props => props.width || "90%"};
`
