import React from "react"
import styled, { css } from "styled-components"
import { applyStyleModifiers } from "styled-components-modifiers"

import { Wrapper, Type, Color } from "../../utilities"

const MODIFIER_CONFIG = {
  light: () => css`
    background-color: ${Color.light_grey};
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    h7,
    h8 {
      color: ${Color.red};
    }
  `,
}

const StyledSection = styled.section`
  padding: 4em 2em;
  background-color: ${Color.white};
  overflow: hidden;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  h7,
  h8 {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    font-family: ${Type.header};
    text-align: center;
    color: ${Color.orange};
  }

  ${applyStyleModifiers(MODIFIER_CONFIG)};
`

export const Section = ({ children, ...props }) => (
  <StyledSection {...props}>
    <Wrapper>{children}</Wrapper>
  </StyledSection>
)
