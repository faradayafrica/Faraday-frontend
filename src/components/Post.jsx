import React from "react";
import Form from "./common/Form";
import Joi from "joi-browser";
import TagsInput from "../components/styledComponents/tagsInput";
class Post extends Form {
  state = {
    data: {
      title: "",
      body: "",
    },
    tags: [],

    errors: {},
  };

  schema = {
    title: Joi.string().max(160).label("Title"),
    body: Joi.string().max(500).label("Body"),
  };

  render() {
    const selectedTags = (tags) => {
      // console.log(tags);
      this.setState({ tags });
      console.log(this.state.tags);
    };

    return (
      <div className="profile__container">
        <div>
          <form onSubmit={this.handleSubmit}>
            <h1 className=" section-header">Ask a Question</h1>
            {this.renderTextArea("title", "Type your question title", 4, true)}
            <TagsInput selectedTags={selectedTags} tags={this.state.tags} />
            {this.renderTextArea("body", "Write your question content here", 4)}
            {this.renderButton("Post Question", false)}
          </form>
        </div>
      </div>
    );
  }
  doSubmit = () => {
    console.log("question sent");
  };
}

export default Post;
