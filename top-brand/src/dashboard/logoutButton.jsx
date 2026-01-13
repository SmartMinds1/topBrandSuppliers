import React from "react";
//import axios from "axios";
import { useNavigate } from "react-router-dom";
//import { BASE_URL } from "../api/api";

const LogoutButton = () => {
 // const navigate = useNavigate();

 /*  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/auth/logout`,
        {}, // no body needed — refresh token will come from cookie
        {
          withCredentials: true, //  send cookies along with request
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // still needed for access validation
          },
        }
      ); */

      // Optional: clear any stored access token
/*       localStorage.removeItem("accessToken");

      navigate("/");
    } catch (error) {
      console.error(
        "Logout failed:",
        error.response?.data?.message || error.message
      );
    }
  }; */

  return <button /* onClick={handleLogout} */ className="text-sm cursor-pointer">Logout</button>;
};
 
export default LogoutButton;
