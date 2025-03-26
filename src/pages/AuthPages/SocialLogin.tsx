import React from "react";

const SocialLogin = () => {
  const handleLogin = (platform: string) => {
    window.location.href = `http://localhost:5000/api/social/${platform}`;
  };

  return (
    <div className="social-login">
      <button onClick={() => handleLogin("instagram")} className="btn instagram">
        Login with Instagram
      </button>
      <button onClick={() => handleLogin("tiktok")} className="btn tiktok">
        Login with TikTok
      </button>
    </div>
  );
};

export default SocialLogin;
