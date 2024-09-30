"use client";

import React from "react";

class ClassComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    };

    // not needed if using arrow function for incrementCounter
    // this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>Counter: {this.state.count}</p>
        <button onClick={this.incrementCounter}>Increase</button>
      </div>
    );
  }
}

export default ClassComponent;
