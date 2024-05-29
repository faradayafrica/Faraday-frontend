import React, { useState, useEffect, useCallback } from "react";
import { RxCross2 } from "react-icons/rx";
import auth from "../../../common/services/authService";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Slider from "./Slider"; // Import the Slider component

const CompletionBanner = () => {
  const [eduVerified, setEduVerified] = useState(false);
  const [bioVerified, setBioVerified] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { profileData: user } = useSelector(
    (state) => state.qfeed.feed.profile
  );

  const fetchUserData = useCallback(async () => {
    try {
      const user = await auth.getCurrentUser();
      console.log(user);
      setIsLoggedIn(!!user);
      if (user) {
        const isEduVerified = user.edu_verified ?? false;
        const isBioVerified = user.bio_verified ?? false;
        setEduVerified(isEduVerified);
        setBioVerified(isBioVerified);
        console.log(isEduVerified, isBioVerified);
        setShowBanner(!isBioVerified || !isEduVerified);
      } else {
        setShowBanner(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoggedIn(false);
      setShowBanner(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    const handleUserUpdate = () => {
      fetchUserData();
    };

    window.addEventListener("userUpdated", handleUserUpdate);

    return () => {
      window.removeEventListener("userUpdated", handleUserUpdate);
    };
  }, [fetchUserData]);

  const handleCloseBanner = () => {
    setShowBanner(false);
  };

  // Conditionally render based on user login and verification status
  if (!isLoggedIn || !showBanner) {
    return null;
  }

  return (
    <div>
      <div className="w-full lg:h-[13rem] bg-gradient-to-r from-green-600 via-green-800 to-green-900 text-white px-5 py-4 rounded-lg">
        <div className="flex items-center justify-end">
          <RxCross2
            size={24}
            className="cursor-pointer"
            onClick={handleCloseBanner}
          />
        </div>
        <h1 className="text-xl font-bold">
          {eduVerified
            ? "You haven't added your bio details"
            : "You haven't added your school details"}
        </h1>
        <p className="mt-2 text-[16px]">
          {eduVerified
            ? "Add your bio details to get a personalized feed including suggested posts, articles, and other students within your school and nearby schools."
            : "Add your school details to get a personalized feed including suggested posts, articles, and other students within your school and nearby schools."}
        </p>
        <div className="mt-5 flex gap-16 items-center">
          <button
            className="text-black bg-white p-2 rounded-lg w-[10rem] text-[16px] text-center"
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
        <div className="h-full">
          <Box className="border-2 flex justify-center items-center h-screen">
            <Slider user={user} onClose={handleClose} />{" "}
            {/* Pass user data to Slider */}
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default CompletionBanner;
