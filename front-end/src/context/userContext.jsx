import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const storedResponseData = localStorage.getItem("responseData");
      if (storedResponseData) {
        const parsedResponseData = JSON.parse(storedResponseData);

        if (!parsedResponseData.error && parsedResponseData.user) {
          setUser(parsedResponseData.user);
          setIsLoggedIn(true);
          console.log("Authenticated User:", parsedResponseData.user);
          console.log("User_Id:", parsedResponseData.user.id);
        } else {
          console.log("Error:", parsedResponseData.error);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
    }
  };

  const logout = async () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (!confirmed) return;

    try {
      await axios.get("https://localhost:7000/logout");
      // Clear local storage
      localStorage.clear();
      setUser(null);
      setIsLoggedIn(false);
      toast.success("Logged Out Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const { data } = await axios.post("https://localhost:7000/login", {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
        setIsLoggedIn(false);
      } else {
        await fetchUserData();
        setIsLoggedIn(true);
        toast.success("Login Successful");
      }
    } catch (error) {
      console.log(error.toString());
      setIsLoggedIn(false);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, isLoggedIn, logout, loginUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Add PropTypes validation
UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children is required and of type "node"
};
