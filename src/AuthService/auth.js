import { useState } from "react";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    navigate("/dashboard")
  };

  return { isLoggedIn, login, logout };
};
