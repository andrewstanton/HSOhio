import React from "react"
import styled, { keyframes } from "styled-components"
import { lighten } from "polished"

import { Color } from "../../utilities"

const barGrow = props => {
  return keyframes`
    0% {
        width: 0%;
    }
    100% {
        width: ${props.percentage}%;
    }
`
}

const StyledChart = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5rem;
`

const ChartBar = styled.div`
  position: relative;
  border: 1px solid ${Color.red};
  margin-bottom: 0.5rem;
  height: 60px;
`
const ChartLabel = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  top: 50%;
  font-weight: bold;
  color: ${Color.red};
`

const ChartData = styled.div`
  background: ${lighten(0.35, Color.red)};
  position: absolute;
  top: 0;
  left: 0;
  height: 60px;
  transition: all 5s ease-in-out;
  width: ${props => `${props.percentage}%`};
  animation: ${props => barGrow(props)} 2s ease-in-out 0s 1;
`

const DataNode = ({ label, percentage, count }) => (
  <ChartBar>
    <ChartData percentage={percentage} />
    <ChartLabel>
      {label} - {Math.round(percentage)}%
    </ChartLabel>
  </ChartBar>
)

export const Chart = ({ headers = [], data = [] }) => {
  return (
    <StyledChart>
      {data.map((node, ix) => (
        <DataNode {...node} key={ix} />
      ))}
    </StyledChart>
  )
}
