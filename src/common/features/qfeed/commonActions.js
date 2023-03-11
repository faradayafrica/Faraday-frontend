export const findTargetComment = (arr, parent_id, lvl = 3) => {
  let targetComment;
  // Traverse the comments: Find the mother Comment this response is related
  for (const comment of arr) {
    // Check if the comment has any replies
    if (comment.replies && comment.replies.data) {
      // Check if any of the replies have an object whose id == child parent_id
      for (const reply of comment.replies.data) {
        if (reply.id === parent_id) {
          targetComment = comment;
          break;
        }
      }
    }

    // Break out of the outer loop if we found the target comment
    if (targetComment) {
      break;
    }
  }
  return targetComment;
};
