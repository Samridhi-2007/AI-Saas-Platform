/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 * @description Auth Sync Page for the app
 */
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

const AuthSyncPage = () => {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded, userId } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      localStorage.removeItem("clerkUserId");
      console.log("Not signed in. Redirecting to login...");
      navigate("/");
      return;
    }

    if (isSignedIn && userId) {
      localStorage.setItem("clerkUserId", userId);
      console.log("✅ Clerk User ID saved:", userId); // 🔥 Add this for debug
      navigate("/app/today");
    }
  }, [userId, isSignedIn, isLoaded, navigate]);

  return null;
};

export default AuthSyncPage;
