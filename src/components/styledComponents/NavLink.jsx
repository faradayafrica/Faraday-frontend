import { Link } from "react-router-dom";
import React, { Component } from "react";

class NavLink extends Component {
  render() {
    const { item, focus, green, icon, url } = this.props.link;
    const newUrl = `/${item.toLowerCase()}`;

    return (
      <Link
        //url comes from the profile link as props
        to={url ? url : newUrl}
        className="align-item-center"
        style={{ textDecoration: "none" }}
      >
        <button
          className={this.renderNavlink(focus, green)}
          onClick={() => this.props.handleLink(item)}
        >
          <div className="nav-tooltip">{item}</div>
          <div className={this.renderNavIcon(focus)}>{icon}</div>
          <p className="mx-2 sidenav__item"> {item}</p>
        </button>
      </Link>
    );
  }

  renderNavlink = (focus, green) => {
    let classes = "navlink btn ";
    if (focus) {
      classes += "active-nav ";
    }
    if (green === true) {
      classes += " btn-green";
    }

    return classes;
  };

  renderNavIcon = (focus) => {
    if (focus === true) {
      return "icon active-icon";
    } else {
      return "icon";
    }
  };
}

export default NavLink;
