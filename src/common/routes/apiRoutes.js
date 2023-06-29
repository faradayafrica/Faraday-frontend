const apiBase = process.env.REACT_APP_API_URL;

const apiRoutes = {
  // Authentification
  getCountries: "https://univast.faraday.africa/academia/countries",
  getSchool: "https://univast.faraday.africa/academia/schools/",

  // Qfeed
  fetchQuestions: apiBase + "/qfeed/que/fetch/",
  deleteQuestion: apiBase + "/qfeed/que/delete/",
  vote: apiBase + "/qfeed/que/vote/",
  postQuestion: apiBase + "/qfeed/que/create_que/",
  markBookmark: apiBase + "/qfeed/que/bookmark/",

  // Comments
  fetchComments: apiBase + "/qfeed/que/comments/",
  markSolution: apiBase + "/qfeed/que/marksolution/",
  deleteComment: apiBase + "/qfeed/que/comments/delete/",
  createcomment: apiBase + "/qfeed/que/create_comment/",

  // Notification
  // Profile

  userBookmarks: apiBase + "/qfeed/que/bookmarks/",
};

export default apiRoutes;
