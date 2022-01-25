import React, { Component } from "react";
// import departmentIcon from "../../images/department.svg";
import { ReactComponent as MenuIcon } from "../../images/dropdown-menu.svg";
import { QuestionProfileHeading } from "../styled/QuestionPageStyled";

class QuestionProfile extends Component {
  render() {
    const { fname, lname, username, image } = this.props.question;
    console.log(this.props.question);
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

            <button className='btn p-0'>
              <MenuIcon />
            </button>
          </div>
        </div>
        <span className='profile__date'>September 15, 2021</span>
      </QuestionProfileHeading>
    );
  }
}

export default QuestionProfile;
