import axios from "axios";
import React from "react";
import { handleLogoutapi } from "../API/Candidate";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { SetDataOnLocalStorage } from "../helper/helper";
import { RiShutDownLine } from "react-icons/ri";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const data = await handleLogoutapi();
      console.log(`logoutDaat`, data?.data.success);
      if (data?.data?.success == true) {
        toast.success("logged out successfully");
        const logoutData = "logegd out";
        SetDataOnLocalStorage(logoutData);
        navigate("/login");
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button
        onClick={() => {
          handleLogout();
        }}
        className="p-2 bg-white border-black text-black  rounded-lg "
      >
        <div className="flex justify-center items-center gap-2">
          <span>
            <RiShutDownLine />
          </span>
          <span> Logout</span>
        </div>
      </button>
    </div>
  );
}

export default Logout;
