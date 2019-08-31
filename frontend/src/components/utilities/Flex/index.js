import styled from "styled-components"

import { Media } from "../Media"

export const Flex = styled.div`
  display: flex;
  justify-content: space-between;

  > div {
    flex-grow: 1;
    flex-basis: 0;
  }

  ${Media.below.tablet`
    flex-wrap: wrap;

    > div {
      flex: 100%;
    }
  `}
`
