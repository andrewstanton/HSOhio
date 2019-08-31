import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import { Color, Wrapper, Media } from "../../utilities"

import logo from "../../../images/logo.png"

const height = 100

const StyledHeader = styled.header`
  background: ${Color.white};
  padding: 0;
  color: ${Color.white};
  height: ${height}px;
`

const logoWidth = "250px"

const StyledWrapper = styled(Wrapper)`
  display: flex;
  justify-content: flex-start;

  .logo {
    max-height: ${height}px;
    transition: all 0.1s ease-in-out;
    border-top: 0px solid ${Color.red};

    &:hover {
      border-top: 10px solid ${Color.red};
    }
  }
`

const Header = ({ siteMetadata = {} }) => {
  return (
    <>
      <StyledHeader>
        <StyledWrapper>
          <Link to="/">
            <img src={logo} alt={siteMetadata.name} className="logo" />
          </Link>
        </StyledWrapper>
      </StyledHeader>
    </>
  )
}

export default Header
