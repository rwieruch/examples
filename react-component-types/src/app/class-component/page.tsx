"use client";

import React from "react";

class ClassComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: localStorage.getItem("text") || "",
    };

    this.onChangeText = this.onChangeText.bind(this);
  }

  componentDidUpdate() {
    localStorage.setItem("text", this.state.text);
  }

  onChangeText(event) {
    this.setState({ text: event.target.value });
  }

  render() {
    return (
      <div>
        <p>Text: {this.state.text}</p>

        <input
          type="text"
          value={this.state.text}
          onChange={this.onChangeText}
        />
      </div>
    );
  }
}

export default ClassComponent;
