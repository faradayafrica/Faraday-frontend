import { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import DiscussionPage from "../components/qfeedComponents/DiscussionPage.jsx";
import TimeLine from "../components/qfeedComponents/Timeline.jsx";
import NotFound from "./NotFound.jsx";
import http from "../services/httpService";
import SideNav from "../components/styledComponents/SideNav.jsx";

const Qfeed = (props) => {
  const [questions, setQuestions] = useState([]);
  const [loader, setLoader] = useState(true);

  const apiEndpoint = process.env.REACT_APP_API_URL + "/qfeed/que/fetch/";

  const updateQuestions = (updatedQuestions) => {
    setQuestions([...updatedQuestions]);
    // console.log("present 4rm Qfeed", updatedQuestions);
  };

  const retry = async () => {
    setLoader(true);
    try {
      const { data } = await http.get(apiEndpoint);
      setQuestions(data.results);
      console.log("all recieved ques", data.results);
    } catch (err) {
      console.warn(err.message);
      setLoader(false);
    }
  };

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const { data } = await http.get(apiEndpoint);
        setQuestions(data.results);
      } catch (err) {
        console.warn(err.message);
        setLoader(false);
      }
    }

    fetchQuestions();
  }, []);

  return (
    <>
      <SideNav {...props} />
      <div className="w-full route-wrapper">
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
                retry={retry}
                loader={loader}
                {...props}
              />
            )}
          />

          <Route path="/not-found" component={NotFound} />
          <Redirect push to="/not-found" />
        </Switch>
      </div>
    </>
  );
};

export default Qfeed;
