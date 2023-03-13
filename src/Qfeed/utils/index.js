import { toast } from "react-hot-toast";
import {
  LoadingToast,
  SuccessToast,
  ErrorToast,
} from "../../common/components/CustomToast";
import http from "../../common/services/httpService";

export const handleSaveQues = async (question, setQuestionMenu, refetch) => {
  const url =
    process.env.REACT_APP_API_URL + `/qfeed/que/bookmark/${question.id}/`;

  LoadingToast("Loading");

  try {
    if (question.bookmarked === false) {
      await http.post(url);

      toast.dismiss();
      SuccessToast("Added to your Bookmarks");
    } else {
      await http.post(url);

      toast.dismiss();
      SuccessToast("Removed from your Bookmarks");
    }
  } catch (e) {
    console.log(e);
    toast.dismiss();
    ErrorToast("Something went wrong!");
  } finally {
    setQuestionMenu(false);
    refetch && refetch();
  }
};
