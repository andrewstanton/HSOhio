import React, { Fragment } from "react"

class Mutation extends React.Component {
  static defaultProps = {
    mutation: () => {},
    postFunc: () => {},
    queryQueue: [],
    //refreshQueries: [],
  }

  state = {
    loading: false,
    error: null,
    result: null,
    unmounted: false,
  }

  fireMutation = async (variables = null) => {
    const { mutation, postFunc } = this.props //, refreshQueries, addToQueue

    // Loading Queue
    if (!this.unmounted) {
      this.setState({
        ...this.state,
        loading: true,
      })
    }

    // Send To API
    try {
      const result = await mutation(variables)

      if (!this.unmounted) {
        this.setState({
          ...this.state,
          loading: false,
          error: null,
          result,
        })
      }

      // If Post Function Exists
      if (typeof postFunc !== "undefined") {
        postFunc({ result })
      }
    } catch (error) {
      if (!this.unmounted) {
        this.setState({
          ...this.state,
          loading: false,
          error,
          result: null,
        })
      }

      return error
    }

    // Refresh Queries After Mutation If Set
    // if (Array.isArray(refreshQueries) && refreshQueries.length > 0) {
    //   addToQueue(refreshQueries);
    // }
  }

  render() {
    const { loading, error, result } = this.state
    const { children } = this.props
    return (
      <Fragment>
        {children(this.fireMutation, { loading, error, result })}
      </Fragment>
    )
  }
}

// export const Mutation = props => (
//   <ApiContextConsumer>
//     {context => <MutationContext {...props} {...context} />}
//   </ApiContextConsumer>
// );

export default Mutation
