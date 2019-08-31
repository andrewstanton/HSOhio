import React from "react"
import styled from "styled-components"
import { rgba } from "polished"

import { Color, Wrapper, Media } from "../../utilities"

export const Banner = styled.div`
  background: ${props => `url(${props.image})` || "grey"};
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
`

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

export const InnerBanner = ({ children, height = "500px", ...props }) => (
  <StyledInnerBanner height={height} {...props}>
    <Wrapper>
      <InnerBannerOverlay>{children}</InnerBannerOverlay>
    </Wrapper>
  </StyledInnerBanner>
)
