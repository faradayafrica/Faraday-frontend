import React, { Component } from "react";

class Tags extends Component {
  render() {
    return (
      <React.Fragmanent>
        <p>#{this.props.tag}</p>
      </React.Fragmanent>
    );
  }
}

export default Tags;
