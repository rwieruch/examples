"use client";

import React from "react";

const withLocalStorage = (storageKey) => (Component) => {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        value: localStorage.getItem(storageKey) || "",
      };
    }

    componentDidUpdate() {
      localStorage.setItem(storageKey, this.state.value);
    }

    onChangeValue = (event) => {
      this.setState({ value: event.target.value });
    };

    render() {
      return (
        <Component
          value={this.state.value}
          onChangeValue={this.onChangeValue}
          {...this.props}
        />
      );
    }
  };
};

class ClassComponent extends React.Component {
  render() {
    return (
      <div>
        <p>Text: {this.props.value}</p>

        <input
          type="text"
          value={this.props.value}
          onChange={this.props.onChangeValue}
        />
      </div>
    );
  }
}

export default withLocalStorage("text")(ClassComponent);
