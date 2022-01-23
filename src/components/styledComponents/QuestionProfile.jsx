import React, { Component } from "react";
// import departmentIcon from "../../images/department.svg";
import MenuIcon from "../../images/dropdown-menu.svg";

class QuestionProfile extends Component {
  render() {
    const { fname, lname, username, image } = this.props.question;
    return (
      <div className='horinzontal-align txt w-100'>
        <img className='profile-image' src={image} alt='profile' />

        <div className='ml-2 d-flex justify-content-between'>
          <div>
            <p className='profile-name text-dark mb-0'>
              {fname} {lname}
            </p>
            <p className='mb-0'>@{username}</p>
          </div>

          <button className='btn mr-0 p-0 d-block'>
            <img src={MenuIcon} alt='' />
          </button>
        </div>

        {/* <div className='horinzontal-align'>
            <img src={departmentIcon} alt='department icon' />
            <p className='dont-break'>{department}</p>
          </div> */}
      </div>
    );
  }
}

export default QuestionProfile;
