import styled, { css } from "styled-components"
import { Link } from "gatsby"

import { applyStyleModifiers } from "styled-components-modifiers"

import { Color, Type, Media } from "../../utilities"

const MODIFIER_CONFIG = {
  red: () => css`
    background: transparent;
    color: ${Color.red} !important;
    border: 2px solid ${Color.red};

    &:hover {
      background: ${Color.red};
      color: ${Color.white} !important;
      border: 2px solid ${Color.red};
    }

    &:disabled {
      color: ${Color.grey} !important;
      border-color: ${Color.grey} !important;

      &:hover {
        cursor: default;
        background: transparent;
        color: ${Color.grey} !important;
      }
    }
  `,
  small: () => css`
    font-size: 0.9rem;
    padding: 0.5rem;
  `,
}

const buttonCSS = css`
  border: 0;
  border-radius: 3px;
  padding: 1.25rem 1.75rem;
  margin: 0;
  text-decoration: none;
  font-family: ${Type.header};
  font-size: 1.25rem;
  display: inline-block;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-top: ${({ marginTop }) => marginTop || "0"};
  margin-bottom: ${({ marginBottom }) => marginBottom || "0"};
  margin-left: ${({ marginLeft }) => marginLeft || "0"};
  margin-right: ${({ marginRight }) => marginRight || "0"};

  ${Media.below.tablet`
    font-size: 1rem;
    padding: 1rem 1.5rem;
  `}

  &:disabled {
    opacity: 0.5;
  }

  ${applyStyleModifiers(MODIFIER_CONFIG)}
`

export const Button = styled.button`
  ${buttonCSS}
`

export const ButtonLink = styled(Link)`
  ${buttonCSS}
  text-decoration: none !important;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export const ButtonHTMLLink = styled.a`
  ${buttonCSS}
  text-decoration: none !important;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export const BannerButton = styled(ButtonLink)`
  ${Media.below.tablet`
    padding: 1rem;
  `}
`
