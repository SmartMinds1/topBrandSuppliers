import axios from "axios";

axios.defaults.withCredentials = true; // ensures cookies are always sent

// Verify if the access token is still valid
export const verifyAccessToken = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return false;

  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/verify-access",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const user = response.data?.user;
    if (user) {
      // Save role if available
      if (user.role) localStorage.setItem("userRole", user.role);
      if (user.username) localStorage.setItem("username", user.username);
    }
    return user || false;
  } catch (error) {
    console.warn("Access token expired or invalid, trying refresh...");
    return await refreshAccessToken();
  }
};

// Try refreshing the access token silently using the cookie
export const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/refresh-token", // ✅ match backend route
      {},
      { withCredentials: true }
    );
    const newToken = response.data.accessToken;
    if (newToken) {
      localStorage.setItem("accessToken", newToken);

      // If the refresh endpoint also returns user data, store it
      if (response.data.role)
        localStorage.setItem("userRole", response.data.role);
      if (response.data.username)
        localStorage.setItem("username", response.data.username);

      return true;
    }
    return false;
  } catch (error) {
    console.error(
      "Token refresh failed, You need to sing in",
      error.response?.data || error.message
    );
    return false;
  }
};
