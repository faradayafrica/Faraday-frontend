import React, { Component } from 'react';
import img from "../../images/profile2.png"

class Profile extends Component {
    render() { 
      return (
        <React.Fragment>
        {this.props.user && 
        <div>
          <div className="profile-wall row justify-content-center m-0">
            {/* <img className="mx-auto" src={this.props.user.profile_pic} alt="" /> */}
            <img className="mx-auto" src={img} alt="" />
          </div>

          <div className="solution-info">
            <div className="info-item ">
              <p className="num">123</p>
              <p className="title icon-container-secondary">Questions</p>
            </div>

            <div className="info-item ">
            <p className="num">123</p>
              <p className="title icon-container-secondary">Solutions</p>
            </div>

            <div className="info-item ">
            <p className="num">123</p>
              <p className="title icon-container-secondary">Followers</p>
            </div>
          </div>

          <div className="personal-info text-center mt-4">
            <p className="name h3">{this.props.user.last_name} {this.props.user.first_name}</p>
            <p className="username icon-container-secondary h6 mt-1"> @{this.props.user.username}</p>
            <p className="bio mt-4">This is where the bio goes. Not more that 35 characters. Thank you</p>
          </div>
         
        </div>}

        </React.Fragment>

      )
    }
}
 
export default Profile;
