"use client";

import createClass from "create-react-class";

const CreateClassComponent = createClass({
  getInitialState: function () {
    return {
      text: localStorage.getItem("text") || "",
    };
  },

  componentDidUpdate: function () {
    localStorage.setItem("text", this.state.text);
  },

  onChangeText: function (event) {
    this.setState({ text: event.target.value });
  },

  render: function () {
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
  },
});

export default CreateClassComponent;
