import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../provider";
import { jwtDecode } from "jwt-decode";
import { createUser, login as userLogin } from "../api";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = () => {
      setLoading(true);
      // getting the token from locals storage if exist
      const userToken = localStorage.getItem("survey");

      if (userToken) {
        // decode the token
        const user = jwtDecode(userToken);
        // setting the user from token

        setUser(user);
      }

      setLoading(false);
    };
    getUser();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    // make api call
    let data = await userLogin(email, password);

    if (data.success) {
      const user = jwtDecode(data.token);
      // set the user to state
      setUser(user);
      // setting the user or token in local storage
      localStorage.setItem("survey", data.token);

      setLoading(false);
      return {
        success: true,
      };
    } else {
      setLoading(false);
      return {
        success: false,
        message: data.message,
      };
    }
  };

  const logout = () => {
    // set the user to null
    setUser(null);
    // remove the token from local storage
    localStorage.removeItem("survey");
  };

  const signup = async (userName, email, password, confirmPassword) => {
    setLoading(false);
    // make api call
    let data = await createUser(userName, email, password, confirmPassword);
    if (data.success) {
      setLoading(false);
      return {
        success: true,
      };
    } else {
      setLoading(false);

      return {
        success: false,
        message: data.message,
      };
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    signup,
  };
};
