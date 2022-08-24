import toast from "react-hot-toast";

export async function SuccessToast(message) {
  toast.success(message, {
    style: {
      border: "1px solid #05b851",
      padding: "16px",
      color: "#2C974B",
      backgroundColor: "#F1FBEF",
    },
    iconTheme: {
      primary: "#05b851",
      secondary: "#FFFAEE",
    },
  });
}

export async function ErrorToast(message) {
  toast.error(message, {
    style: {
      border: "1px solid #05b851",
      padding: "16px",
      color: "#2C974B",
      backgroundColor: "#F1FBEF",
    },
    iconTheme: {
      primary: "#05b851",
      secondary: "#FFFAEE",
    },
  });
}

export async function PromiseToast(success_msg, error_msg, promise) {
  toast.promise(promise, {
    loading: "Loading",
    success: success_msg,
    error: error_msg,
  }, {
    style: {
      border: "1px solid #05b851",
      padding: "16px",
      color: "#2C974B",
      backgroundColor: "#F1FBEF",
    },
    iconTheme: {
      primary: "#05b851",
      secondary: "#FFFAEE",
    },
  });
}

export default {
ErrorToast,
SuccessToast
};
