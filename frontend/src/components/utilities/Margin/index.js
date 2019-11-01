import styled from "styled-components"
import { applyStyleModifiers } from "styled-components-modifiers"

const units = ["0.2rem", "1rem", "1.5rem", "2rem", "3rem"]

const MARGIN_MODIFIERS_CONFIG = {
  m1: () => `
    margin: ${units[0]};
  `,
  m2: () => `
    margin: ${units[1]};
  `,
  m3: () => `
    margin: ${units[2]};
  `,
  m4: () => `
    margin: ${units[3]};
  `,
  m5: () => `
    margin: ${units[4]};
  `,
  mt1: () => `
    margin-top: ${units[0]};
  `,
  mt2: () => `
    margin-top: ${units[1]};
  `,
  mt3: () => `
    margin-top: ${units[2]};
  `,
  mt4: () => `
    margin-top: ${units[3]};
  `,
  mt5: () => `
    margin-top: ${units[4]};
  `,
  mb1: () => `
    margin-bottom: ${units[0]};
  `,
  mb2: () => `
    margin-bottom: ${units[1]};
  `,
  mb3: () => `
    margin-bottom: ${units[2]};
  `,
  mb4: () => `
    margin-bottom: ${units[3]};
  `,
  mb5: () => `
    margin-bottom: ${units[4]};
  `,
  ml1: () => `
    margin-left: ${units[0]};
  `,
  ml2: () => `
    margin-left: ${units[1]};
  `,
  ml3: () => `
    margin-left: ${units[2]};
  `,
  ml4: () => `
    margin-left: ${units[3]};
  `,
  ml5: () => `
    margin-left: ${units[4]};
  `,
  mr1: () => `
    margin-right: ${units[0]};  
  `,
  mr2: () => `
    margin-right: ${units[1]};  
  `,
  mr3: () => `
    margin-right: ${units[2]};  
  `,
  mr4: () => `
    margin-right: ${units[3]};  
  `,
  mr5: () => `
    margin-right: ${units[4]};
  `,
  mx1: () => `
    margin-left: ${units[0]};
    margin-right: ${units[0]};
  `,
  mx2: () => `
    margin-left: ${units[1]};
    margin-right: ${units[1]};
  `,
  mx3: () => `
    margin-left: ${units[2]};
    margin-right: ${units[2]};
  `,
  mx4: () => `
    margin-left: ${units[3]};
    margin-right: ${units[3]};
  `,
  mx5: () => `
    margin-left: ${units[4]};
    margin-right: ${units[4]};
  `,
  my1: () => `
    margin-top: ${units[0]};
    margin-bottom: ${units[0]};
  `,
  my2: () => `
    margin-top: ${units[1]};
    margin-bottom: ${units[1]};
  `,
  my3: () => `
    margin-top: ${units[2]};
    margin-bottom: ${units[2]};
  `,
  my4: () => `
    margin-top: ${units[3]};
    margin-bottom: ${units[3]};
  `,
  my5: () => `
    margin-top: ${units[4]};
    margin-bottom: ${units[4]};
  `,
}

export const Margin = styled.div`
  display: block;
  ${applyStyleModifiers(MARGIN_MODIFIERS_CONFIG)}
`
