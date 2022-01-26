import React from "react";
import { Link } from "react-router-dom";
// import image from "../../images/profile.png"
import Dropdown from "react-bootstrap/Dropdown";
import { ReactComponent as MenuIcon } from "../images/dropdown-menu.svg";

function DropdownComp({ dropdownItems }) {
  return (
    <Dropdown>
      <Dropdown.Toggle
        className='navlink btn  '
        variant=''
        id='dropdown-basic'
        bsPrefix='p-2'
      >
        <button className='btn p-0'>
          <MenuIcon />
        </button>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {dropdownItems.map((item, i) => (
          <Dropdown.Item key={i} className='dropdown-link'>
            <Link to='/sponsors' style={{ textDecoration: "none" }}>
              <p
                className='mx-2 my-auto .dont-break'
                style={{
                  display: "inline",
                  position: "relative",
                  top: 2,
                  color: "#5551FE",
                }}
              >
                {item.name}
              </p>
            </Link>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownComp;
