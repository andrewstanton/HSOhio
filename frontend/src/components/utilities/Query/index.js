import React, { Fragment } from "react"

class Query extends React.Component {
  static defaultProps = {
    query: () => {},
    variables: null,
    id: null,
    // queryQueue: [],
  }

  state = {
    loading: false,
    error: null,
    result: [],
    unmounted: false,
    reload: false,
  }

  componentDidMount() {
    this.fetchData()
  }

  //   componentDidUpdate(oldProps) {
  //     const { queryQueue, id } = this.props
  //     if (
  //       queryQueue !== oldProps.queryQueue &&
  //       queryQueue.includes(id) &&
  //       !this.state.unmounted &&
  //       !this.state.reload
  //     ) {
  //       this.setState({
  //         ...this.state,
  //         reload: true,
  //       })

  //       this.fetchData()
  //     }
  //   }

  fetchData = async () => {
    const { query, variables, id, removeFromQueue } = this.props //queryQueue,

    // Loading Queue
    if (!this.state.unmounted) {
      this.setState({
        ...this.state,
        loading: true,
      })
    }

    // Send To Api
    try {
      console.log("HELLO!")
      const result = await query(variables)
      console.log("YO BO")
      console.log({ result })

      // Set State For Results
      if (!this.state.unmounted) {
        this.setState({
          ...this.state,
          loading: false,
          error: null,
          result,
        })
      }
    } catch (error) {
      if (!this.state.unmounted) {
        this.setState({
          ...this.state,
          loading: false,
          error,
          result: [],
        })
      }
    }

    // Remove From ID
    // if (queryQueue.includes(id)) {
    //   removeFromQueue(id)

    //   // Remove Reload State Component
    //   if (!this.state.unmounted && this.state.reload) {
    //     this.setState({
    //       ...this.state,
    //       reload: false,
    //     })
    //   }
    // }
  }

  render() {
    const { children } = this.props
    const { result, loading, error } = this.state
    return <Fragment>{children({ loading, error, result })}</Fragment>
  }
}

// export const Query = props => (
//   <ApiContextConsumer>
//     {context => <QueryContext {...props} {...context} />}
//   </ApiContextConsumer>
// )
export default Query
