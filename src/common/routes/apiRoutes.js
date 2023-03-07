const apiBase = process.env.REACT_APP_API_URL;

const apiRoutes = {
  // Authentification
  getSchool: "https://univast.faraday.africa/academia/schools/NG",
  // Qfeed
  fetchQuestions: apiBase + "/qfeed/que/fetch/",
  deleteQuestion: apiBase + "/qfeed/que/delete/",
  vote: apiBase + "/qfeed/que/vote_que/",
  postQuestion: apiBase + "/qfeed/que/create_que/",

  // Notification
  // Profile
};

export default apiRoutes;
