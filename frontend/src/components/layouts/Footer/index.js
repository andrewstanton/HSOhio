import React from "react"
import styled from "styled-components"

import * as moment from "moment"

import { Color, Wrapper } from "../../utilities"

const StyledFooter = styled.div`
  background-color: ${Color.light_grey};
  color: ${Color.grey};
  padding: 1rem 0 3rem 0;
  font-size: 0.9rem;
  line-height: 200%;

  a {
    text-decoration: none;
    color: ${Color.white};
    &:hover {
      text-decoration: underline;
      color: ${Color.white};
    }
  }
`

const Footer = ({ siteMetadata = {} }) => {
  return (
    <StyledFooter>
      <Wrapper>
        &copy; {`${moment().format("YYYY")} `}
        {siteMetadata.name}
      </Wrapper>
    </StyledFooter>
  )
}

export default Footer
