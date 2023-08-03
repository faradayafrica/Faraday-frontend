import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import close from "../../Qfeed/assets/close-sm.svg";

export async function NotificationToast(message, link = "/notification") {
  toast(
    (t) => (
      <Link
        // to={link}
        onClick={() => toast.dismiss(t.id)}
        className="bg-[#FFFAEE] relative"
      >
        <span className="pr-2 pl-0 flex text-sm item-center">
          <p className="mr-3" dangerouslySetInnerHTML={{ __html: message }}></p>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="absolute right-[-15px] top-0 p-2 cursor-pointer"
          >
            <img src={close} />
          </button>
        </span>
      </Link>
    ),
    {
      style: {
        border: "1px solid #76787C",
        padding: "16px",
        color: "#605647",
        backgroundColor: "#FFFAEE",
        fontSize: "14px",
        paddingTop: "8px",
        paddingBottom: "8px",
      },
      iconTheme: {
        primary: "#05b851",
        secondary: "#FFFAEE",
      },
    }
    // {
    //   icon: "🔔",
    //   style: {
    //     borderRadius: "8px",
    //     background: "#FFFAEE",
    //     color: "#000",
    //   },
    // }
  );
}

export async function SuccessToast(message) {
  toast.success(message, {
    style: {
      border: "1px solid #05b851",
      padding: "16px",
      color: "#2C974B",
      backgroundColor: "#F1FBEF",
      fontSize: "14px",
      paddingTop: "8px",
      paddingBottom: "8px",
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
      fontSize: "14px",
      paddingTop: "8px",
      paddingBottom: "8px",
    },
    iconTheme: {
      primary: "#05b851",
      secondary: "#FFFAEE",
    },
  });
}

export async function PromiseToast(success_msg, error_msg, promise) {
  toast.promise(
    promise,
    {
      loading: "Loading",
      success: success_msg,
      error: error_msg,
    },
    {
      style: {
        border: "1px solid #05b851",
        padding: "16px",
        color: "#2C974B",
        backgroundColor: "#F1FBEF",
        fontSize: "14px",
        paddingTop: "8px",
        paddingBottom: "8px",
      },
      iconTheme: {
        primary: "#05b851",
        secondary: "#FFFAEE",
      },
    }
  );
}
export async function LoadingToast(message) {
  toast.loading(message, {
    style: {
      border: "1px solid #05b851",
      padding: "16px",
      color: "#2C974B",
      backgroundColor: "#F1FBEF",
      fontSize: "14px",
      paddingTop: "8px",
      paddingBottom: "8px",
    },
    iconTheme: {
      primary: "#05b851",
      secondary: "#FFFAEE",
    },
  });
}

// Create an object to hold the named exports
const toastMethods = {
  ErrorToast,
  SuccessToast,
  NotificationToast,
  PromiseToast,
  LoadingToast,
};

// Export the object
export default toastMethods;
