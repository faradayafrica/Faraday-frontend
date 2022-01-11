import React, { Component } from "react";
import Header from "../styledComponents/Header";
import PostComponent from "../styledComponents/postComponent";

class Questions extends Component {
  render() {
    return (
      <div className='' style={{ position: "relative" }}>
        <div className='header sticky-nav '>
          <Header>Qfeed</Header>
        </div>
        <PostComponent onPost={this.props.onPost} user={this.props.user} />
        {this.props.renderQuestion()}

        <button className='btn btn-green rounded-circle btn--add position-fixed'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C21.9939 17.5203 17.5203 21.9939 12 22ZM4 12.172C4.04732 16.5732 7.64111 20.1095 12.0425 20.086C16.444 20.0622 19.9995 16.4875 19.9995 12.086C19.9995 7.68451 16.444 4.10977 12.0425 4.086C7.64111 4.06246 4.04732 7.59876 4 12V12.172ZM13 17H11V13H7V11H11V7H13V11H17V13H13V17Z'
              fill='#fff'
            />
          </svg>
        </button>
      </div>
    );
  }
}

export default Questions;
