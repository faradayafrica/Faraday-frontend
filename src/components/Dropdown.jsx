import React from "react";
import { Link } from "react-router-dom";
// import image from "../../images/profile.png"
import Dropdown from "react-bootstrap/Dropdown";
import { ReactComponent as MenuIcon } from "../images/dropdown-menu.svg";

function DropdownComp({ dropdownItems, answersDropdown }) {
  return (
    <Dropdown>
      <Dropdown.Toggle
        className='navlink p-0 '
        variant=''
        id='dropdown-basic'
        // bsPrefix='p-2'
      >
        <MenuIcon />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {dropdownItems.map((item, i) => (
          <Dropdown.Item key={i} className='dropdown-link'>
            <Link
              to='/sponsors'
              style={{
                textDecoration: "none",
                display: "inline-block",
                height: "max-content",
              }}
            >
              <p
                className='mx-2 my-1 .dont-break'
                style={{
                  display: "inline",
                  position: "relative",
                  top: 2,
                  color: "#5551FE",
                  fontSize: "14px",
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
