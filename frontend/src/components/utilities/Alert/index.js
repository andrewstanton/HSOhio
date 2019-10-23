import React from "react";
import styled from "styled-components";
import { applyStyleModifiers } from "styled-components-modifiers";
import { lighten } from "polished";

import { Type, Color } from "../";

const ALERT_MODIFERS_CONFIG = {
  primary: () => `
    background-color: ${Color.primary};
    color: ${Color.white};
    `,

  success: () => `
    background-color: ${Color.green};
    color: ${Color.white};
  `,

  danger: () => `
    background-color: ${Color.red};
    color: ${Color.white};
  `,

  default: () => `
    background-color:${lighten(0.5, Color.grey)};
    color: ${Color.white};
  `,
};

export const Alert = styled.div`
  padding: 1rem;
  text-align: center;
  margin-bottom: 0.3rem;
  font-family: ${Type.header};
  font-weight: bold;

  ${applyStyleModifiers(ALERT_MODIFERS_CONFIG)};
`;
