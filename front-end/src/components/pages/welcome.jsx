import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
function WelcomeUser() {
  const { user } = useContext(UserContext);

  return <h1>Welcome to To-Do! {user ? user.name : "Guest"}</h1>;
}

export default WelcomeUser;
