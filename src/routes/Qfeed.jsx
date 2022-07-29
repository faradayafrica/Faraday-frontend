import { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import DiscussionPage from "../components/qfeedComponents/DiscussionPage.jsx";
import TimeLine from "../components/qfeedComponents/Timeline.jsx";
import NotFound from "./NotFound.jsx";
import http from "../services/httpService";

const Qfeed = () => {
  const [questions, setQuestions] = useState([]);

  const updateQuestions = (updatedQuestions) => {
    // console.log("compare", questions);
    setQuestions([...updatedQuestions]);
    console.log("present 4rm Qfeed", updatedQuestions);
  };

  useEffect(async () => {
    const apiEndpoint = process.env.REACT_APP_API_URL + "/qfeed/que/fetch/";
    try {
      const { data } = await http.get(apiEndpoint);
      setQuestions(data.results);
      console.log("all recieved ques", data.results);
      // console.log("Q", data);
    } catch (err) {
      console.warn(err.message);
    }
  }, []);

  return (
    <div className="w-full qfeed-wrapper">
      <Switch>
        <Route
          path="/qfeed/:id"
          render={(props) => (
            <DiscussionPage
              questions={questions}
              handleUpdatedQuestions={updateQuestions}
              {...props}
            />
          )}
        />

        <Route
          path="/"
          render={(props) => (
            <TimeLine
              questions={questions}
              handleUpdatedQuestions={updateQuestions}
              {...props}
            />
          )}
        />

        <Route path="/not-found" component={NotFound} />
        <Redirect push to="/not-found" />
      </Switch>
    </div>
  );
};

export default Qfeed;
