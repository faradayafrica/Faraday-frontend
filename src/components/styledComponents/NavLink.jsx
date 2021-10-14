import { Link } from 'react-router-dom';
import React, { Component } from 'react';

class NavLink extends Component {
  render() {
    const { item, focus, green, icon } = this.props.link;
    const url = `/${item.toLowerCase()}`;

    return (
      <Link
        to={url}
        className='align-item-center'
        style={{ textDecoration: 'none' }}
      >
        <button
          className={this.renderNavlink(focus, green)}
          onClick={() => this.props.handleLink(item)}
        >
          <div className={this.renderNavIcon(focus)}>{icon}</div>
          <p className='mx-2'> {item}</p>
        </button>
      </Link>
    );
  }

  renderNavlink = (focus, green) => {
    let classes = 'navlink btn ';
    if (focus) {
      classes += 'active-nav ';
    }
    if (green === true) {
      classes += ' btn-green';
    }

    return classes;
  };

  renderNavIcon = focus => {
    if (focus === true) {
      return 'icon active-icon';
    } else {
      return 'icon';
    }
  };
}

export default NavLink;
