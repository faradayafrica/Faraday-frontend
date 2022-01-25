import React, { Component } from "react";
import { ReactComponent as BroadcastIcon } from "../../images/broadcast-icon.svg";
import { ReactComponent as BookmarkIcon } from "../../images/bookmark-question.svg";

class ButtonBar extends Component {
  render() {
    const { isEchoed, isBookmarked, id } = this.props.question;

    return (
      <div className='engagement-bar mt-3'>
        <div className={this.renderClasses()}>
          <button
            className='icon-container p-0  bubbly-button'
            onClick={() => this.props.onEcho(id)}
          >
            <BroadcastIcon
              stroke={isEchoed ? "#05B851" : "#595959"}
              fill={isEchoed ? "#05B851" : "none"}
              width={30}
              height={30}
            />
          </button>
          <button
            className='icon-container p-0  bubbly-button'
            onClick={() => this.props.onBookmark(id)}
          >
            <BookmarkIcon
              stroke={isBookmarked ? "#05B851" : "#595959"}
              fill={isBookmarked ? "#05B851" : "none"}
              width={30}
              height={30}
            />
          </button>
        </div>
      </div>
    );
  }

  renderClasses = () => {
    let classes = "engagement-container";
    if (!this.props.fluid) {
      classes += " container-fluid ";
    }

    return classes;
  };
}

export default ButtonBar;
