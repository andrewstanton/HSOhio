import React from "react"
import styled from "styled-components"

import { Chart } from "../Chart"
import { Query, AlignCenter, ErrorAlert, Color } from "../../utilities"
import API, { returnData } from "../../../API"

const getResults = () => API.get(`report`).then(returnData)

const RedHeader = styled.h1`
  color: ${Color.red};
`

const GraphBuilder = ({ result = [] }) => {
  const reduce = result.filter(a => a.count !== 0)
  const dataPoints = reduce.map(data => ({
    label: data.label,
    count: data.count,
    percentage: data.percentage,
  }))

  return dataPoints.length > 1 ? (
    <>
      <AlignCenter>
        <RedHeader>
          Thanks For Taking Survey! Here Is What CLE Does To Stay Fit
        </RedHeader>
      </AlignCenter>
      <Chart data={dataPoints} />
    </>
  ) : null
}

export const SurveyResults = () => (
  <Query query={getResults}>
    {({ loading, error, result }) => (
      <div>
        {loading && <AlignCenter>Loading...</AlignCenter>}
        {error && <ErrorAlert error={error} />}
        {!loading && <GraphBuilder result={result} />}
      </div>
    )}
  </Query>
)
