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
        className={this.renderNavlink(focus, green)}
        onClick={() => this.props.handleLink(item)}
        style={{ textDecoration: "none" }}
      >
        <button className="navlink-wrapper">
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
      return "icon h-7 w-7 active-icon";
    } else {
      return "icon h-7 w-7 ";
    }
  };
}

export default NavLink;
