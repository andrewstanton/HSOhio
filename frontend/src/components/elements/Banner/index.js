import React from "react"
import styled from "styled-components"
import { darken } from "polished"
import { rgba } from "polished"

import { Color, Wrapper, Media } from "../../utilities"

export const Banner = styled.div`
${props =>
  props.image
    ? `
  background-image: url(${props.image});
`
    : `
  background: grey;
`}
  background-position: ${props => props.position || "center center"};
  overflow: hidden;
  background-size: cover;
  height: ${props => props.height || "auto"};
`

const StyledInnerBanner = styled(Banner)`
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;

  h1 {
    line-height: 2.25rem;
    margin-bottom: 1rem;
  }

  position: relative;
`

export const StyledBottomBanner = styled.div`
  background: ${Color.pink};
  color: ${Color.white};
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;

  a {
    color: ${Color.white};
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      color: ${darken(0.3, Color.pink)};
    }
  }
`

export const BottomBanner = ({ children, ...props }) => (
  <StyledBottomBanner {...props}>
    <Wrapper>{children}</Wrapper>
  </StyledBottomBanner>
)

const InnerBannerOverlay = styled.div`
  padding: 3rem;
  background: ${rgba(Color.pink, 0.8)};
  width: 40%;
  max-width: 450px;
  color: ${Color.white};
  box-sizing: border-box;

  ${Media.below.tablet`
    width: 100%;
    max-width: 100%;
  `}
`

export const InnerBanner = ({
  children,
  bottomBanner,
  height = "500px",
  ...props
}) => (
  <StyledInnerBanner height={height} {...props}>
    <Wrapper>
      {children && <InnerBannerOverlay>{children}</InnerBannerOverlay>}
    </Wrapper>
    {bottomBanner && bottomBanner()}
  </StyledInnerBanner>
)
