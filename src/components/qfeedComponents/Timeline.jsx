import { useState, useEffect } from "react";
import { getCurrentUser } from "../../services/authService";

const TimeLine = ({ user }) => {
  const currentUser = getCurrentUser();
  console.log("Timeline", currentUser);
  return (
    <>
      <div className="min-h-[70px] sm:min-h-[10px]"> </div>
      <div className="p-2">
        <h1 className="text-3xl font-bold">Question Feed</h1>
      </div>
    </>
  );
};

export default TimeLine;
