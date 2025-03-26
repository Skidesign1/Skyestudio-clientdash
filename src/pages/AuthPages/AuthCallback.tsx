import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const platform = params.get("platform");
    const user = params.get("user");

    if (user) {
      localStorage.setItem("authUser", user);
      alert(`${platform} login successful!`);
      navigate("/dashboard");
    } else {
      alert("Authentication failed!");
      navigate("/");
    }
  }, [navigate]);

  return <h2>Authenticating...</h2>;
};

export default AuthCallback;
