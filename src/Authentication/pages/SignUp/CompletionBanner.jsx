import React, { useState, useEffect } from "react";
import { RxCross2, RxHeight } from "react-icons/rx";
import auth from "../../../common/services/authService";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddSchoolDetail from "./AddSchoolDetail";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "10%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: 10,
  bgcolor: "background.paper",
  boxShadow: 24,
  // p: 4,
  width: 500,
  height: 0,
  '@media (max-width: 600px)': {
    width: 350,
  },
};


const CompletionBanner = () => {
  const [eduVerified, setEduVerified] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [showBanner, setShowBanner] = useState(false); // State to control the visibility of the banner
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const {
    profileData: user,
    userQuestions: questions,
    userSolutions: solutions,
    userBookmarks: bookmarks,
  } = useSelector((state) => state.qfeed.feed.profile);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const user = await auth.isLoggedIn();
        setIsLoggedIn(!!user); // Set isLoggedIn to true only if user is truthy (not null/undefined)
        if (user) {
          const isEduVerified = user?.edu_verified ?? false;
          setEduVerified(isEduVerified);
          setShowBanner(!isEduVerified); // Show banner only if unverified
        }
      } catch (error) {
        console.error("Error checking user status:", error);
        setIsLoggedIn(false);
        setShowBanner(false); // Hide banner on error
      }
    };

    checkUserStatus();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const checkVerificationStatus = async () => {
        try {
          const user = await auth.getCurrentUser();
          const isEduVerified = user?.edu_verified ?? false;
          setEduVerified(isEduVerified);
          setShowBanner(!isEduVerified); // Update banner based on verification status
        } catch (error) {
          console.error("Error fetching user verification status:", error);
          setShowBanner(false); // Hide banner on error
        }
      };

      checkVerificationStatus();
    }
  }, [isLoggedIn]); // Dependency array includes isLoggedIn

  const handleCloseBanner = () => {
    setShowBanner(false); // Set showBanner state to false to hide the banner
  };

  // Only render the banner if relevant conditions are met
  if (!isLoggedIn || eduVerified || !showBanner) {
    return null;
  }

  return (
    <div className="">
      <div className="w-full lg:h-[13rem] bg-gradient-to-r from-green-600 via-green-800 to-green-900 text-white px-5 py-4 rounded-lg">
        <div className="flex items-center justify-end">
          <RxCross2
            size={24}
            className="cursor-pointer"
            onClick={handleCloseBanner}
          />
        </div>
        <h1 className="text-xl font-bold">
          You haven’t added your school details
        </h1>
        <p className="mt-2 text-[16px]">
          Add your school details to get a personalized feed including suggested
          posts, articles, and other students within your school and nearby
          schools.
        </p>
        <div className="mt-5 flex gap-16 items-center">
          <button
            to="/update-school-detail"
            className="text-black bg-white p-2 rounded-lg w-[10rem]  text-[16px] text-center"
            onClick={handleOpen}
          >
            Complete details
          </button>
          <p className="text-[16px] cursor-pointer" onClick={handleCloseBanner}>
            Maybe Later
          </p>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddSchoolDetail  user={user} />
        </Box>
      </Modal>
    </div>
  );
};

export default CompletionBanner;
