import React, { Component } from "react";
// import departmentIcon from "../../images/department.svg";

import DropdownComp from "../Dropdown";
import { QuestionProfileHeading } from "../styled/QuestionPageStyled";

class QuestionProfile extends Component {
  render() {
    const { fname, lname, username, image } = this.props.question;
    // console.log(this.props.question);

    let dropdownItems = [
      {
        name: "Bookmark",
        link: "#",
      },
      {
        name: "Share",
        link: "#",
      },
      {
        name: "Report",
        link: "#",
      },
    ];

    return (
      <QuestionProfileHeading>
        <div>
          <img src={image} alt='profile' className='profile-image' />

          <div className='profile__heading'>
            <div>
              <h3>
                {fname} {lname}
              </h3>
              <p className='profile__username'>@{username}</p>
            </div>

            <DropdownComp dropdownItems={dropdownItems} />
          </div>
        </div>
        <span className='profile__date'>September 15, 2021</span>
      </QuestionProfileHeading>
    );
  }
}

export default QuestionProfile;
