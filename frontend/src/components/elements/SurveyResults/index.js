import React from "react"

import { Query, AlignCenter, ErrorAlert } from "../../utilities"
import API, { returnData } from "../../../API"

const getResults = () => API.get(`report`).then(returnData)

export const SurveyResults = () => (
  <Query query={getResults}>
    {({ loading, error, result }) => (
      <div>
        {loading && <AlignCenter>Loading...</AlignCenter>}
        {error && <ErrorAlert error={error} />}
        {JSON.stringify(result)}
      </div>
    )}
  </Query>
)
