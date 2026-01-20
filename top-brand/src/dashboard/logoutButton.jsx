import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../api/api";
import Confirm from "../components/modals/Confirm";
import AuthModal from "../components/modals/AuthModal";
import LoadingModal from "../components/modals/LoadingModal";

const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    setShowModal(false);

    try {
      await axios.post(
        `${BASE_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      localStorage.removeItem("accessToken");
      window.location.reload();
           
    } catch (error) {
      console.error(
        "Logout failed:",
        error.response?.data?.message || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <div>
        <button
          onClick={() => setShowModal(true)}
          className="text-sm cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* CONFIRM LOGOUT */}
      <AuthModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Confirm
          onCloseConfirm={() => setShowModal(false)}
          handleLogout={handleLogout}
        >
          <p className="text-maintext font-semibold text-lg mb-2 w-2/3 m-auto leading-6">Are you sure you want to log out?</p>
          <p className="text-sm text-text">You’ll need to sign in again to access your account.</p>
        </Confirm>
      </AuthModal>

      {/* LOADING MODAL */}
      <AuthModal isOpen={isLoading} onClose={() => {}}>
        <LoadingModal
          text="Signing you out..."
          subText="Ending your session securely"
        />
      </AuthModal>
    </div>
  );
};

export default LogoutButton;
