// This is a landing page where the user is directed to enter their new password after resetting.
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/api";

const ResetPassword = () => {
  const { token } = useParams(); // Get token from the URL
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // useNavigate hook for navigation

  useEffect(() => {
    if (!token) {
      setError("Invalid token.");
    }
  }, [token]);

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (!newPassword || newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/reset-password/${token}`,
        { newPassword }
      );
      setMessage(response.data.message);
      setError("");
      setTimeout(() => {
        navigate("/login"); // Redirect to login after successful reset
      }, 2000);
    } catch (error) {
      setMessage("");
      setError(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Reset Your Password</h2>
      <form onSubmit={handlePasswordReset}>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit" className="auth-submit-btn">
          Reset Password
        </button>
      </form>
      {message && <p className="responseMessage success">{message}</p>}
      {error && <p className="responseMessage error">{error}</p>}
    </div>
  );
};

export default ResetPassword;
