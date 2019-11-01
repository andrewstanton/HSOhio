import React from "react";

import { reduceOrEmptyState } from "../commonFunctions";

class Form extends React.Component {
  state = {};

  componentDidMount() {
    const { state } = this.props;
    this.setState({
      ...state,
    });
  }

  handleChange = e => {
    const val = e.target.type == "checkbox" ? e.target.checked : e.target.value;
    this.setState({ [e.target.name]: val });
  };

  updateState = ({ key, value }) => {
    this.setState({
      [key]: value,
    });
  };

  isInvalid = () => {
    const { required, isInvalid } = this.props;
    const empty = required.some(
      id =>
        this.state[id] === "" ||
        this.state[id] === null ||
        typeof this.state[id] === "undefined",
    );

    if (empty) {
      return true;
    }

    const customValidation = isInvalid({ state: this.state });
    if (customValidation) {
      return true;
    }

    return false;
  };

  submitForm = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const reduce = this.props.reduceState;
    const values = reduceOrEmptyState({ reduce, state: this.state });
    onSubmit(values);
  };

  render() {
    const { children } = this.props;
    return (
      <form className="form" onSubmit={this.submitForm}>
        {children({
          handleChange: this.handleChange,
          setState: this.updateState,
          state: this.state,
          isInvalid: this.isInvalid(),
        })}
      </form>
    );
  }
}

Form.defaultProps = {
  state: [],
  required: [],
  reduceState: true,
  isInvalid: () => {},
  onSubmit: () => {},
  isLoading: false,
};

export default Form;
