import { useState, useEffect } from "react";

const DiscussionPage = ({ match, questions }) => {
  const thisQuestion = questions.filter((q) => q.id === match.params.id)[0];
  console.log("discussion", thisQuestion);
  return <div className="mt-20">{thisQuestion?.content}</div>;
};

export default DiscussionPage;
