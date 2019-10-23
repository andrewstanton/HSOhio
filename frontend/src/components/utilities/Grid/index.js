import React from "react";
import styled from "styled-components";
import { applyStyleModifiers } from "styled-components-modifiers";

import { Media } from "../Media";

const GRID_MODIFIERS = {
  thirds1x2: () => `
    grid-template-columns: 1fr 2fr;
  `,
  thirds2x1: () => `
    grid-template-columns: 2fr 1fr;
  `,
  gap: () => `
    grid-gap: 1rem;
  `,
  thirds: () => `
    grid-template-columns: 1fr 1fr 1fr;
  `,
};

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  ${Media.below.tablet`
    grid-template-columns: 1fr;
    grid-row-gap: 2rem;
  `}

  ${applyStyleModifiers(GRID_MODIFIERS)}
`;

export const Grid = ({ children, ...props }) => (
  <StyledGrid {...props}>{children}</StyledGrid>
);
