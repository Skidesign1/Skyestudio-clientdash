import React, { useState, useEffect } from "react";
import axios from "axios";

import WhatHappening from "../../components/Dashboard/Ecommerce/WhatHappening";
import ExpectedEarnings from "../../components/Dashboard/Ecommerce/ExpectedEarnings";
import ExpectedEarnings2 from "../../components/Dashboard/Ecommerce/ExpectedEarnings2";
import RevenueThisMonth from "../../components/Dashboard/Ecommerce/RevenueThisMonth";
import RevenueTargetByCountry from "../../components/Dashboard/CRMSystem/RevenueTargetByCountry";
import ProjectStats from "../../components/Dashboard/ProjectManagement/ProjectStats";
import NewCustomersThisMonth from "../../components/Dashboard/Ecommerce/NewCustomersThisMonth";
import NewCustomersThisMonth2 from "../../components/Dashboard/Ecommerce/NewCustomersThisMonth2";
import NewCustomersThisMonth3 from "../../components/Dashboard/Ecommerce/NewCustomersThisMonth3";
import StatsBoxes from "../../components/Dashboard/Ecommerce/StatsBoxes";
import DataBoxes from "../../components/Dashboard/Ecommerce/StatsBoxes/data";
import WeeklySales from "../../components/Dashboard/Ecommerce/WeeklySales";
import ChatContent from "../../components/Chat/ChatContent";

const EcommercePage = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    handleRedirect();
    initializeFacebookSDK();
  }, []);

  const initializeFacebookSDK = () => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: "1498943767275613",
        cookie: true,
        xfbml: true,
        version: "v19.0",
      });

      FB.getLoginStatus(function (response) {
        if (response.status === "connected") {
          console.log("User is logged in:", response.authResponse.accessToken);
          sessionStorage.setItem("accessToken", response.authResponse.accessToken);
        } else {
          console.log("User is not logged in or not authorized.");
        }
      });
    };

    (function (d, s, id) {
      if (d.getElementById(id)) return;
      const js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      const fjs = d.getElementsByTagName(s)[0];
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  };

  const loginWithFacebook = () => {
    FB.login((response) => {
      if (response.authResponse) {
        console.log("User logged in:", response);
        getFacebookUserData();
      } else {
        console.log("User cancelled login or did not fully authorize.");
      }
    }, { scope: "pages_show_list" });
  };

  const getFacebookUserData = () => {
    FB.api("/me", { fields: "id,first_name,last_name,email,picture" }, (response) => {
      if (response && !response.error) {
        console.log("Facebook user data:", response);
        sessionStorage.setItem("facebookId", response.id);
        sessionStorage.setItem("userId", response.id);
        window.location.href = "/home";
      } else {
        console.error("Error fetching user data:", response.error);
      }
    });
  };

  const logoutFromFacebook = () => {
    FB.logout((response) => {
      console.log("Logged out from Facebook:", response);
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("facebookId");
      sessionStorage.removeItem("userId");
    });
  };

  const getUserIdAndToken = () => {
    const userId = window.sessionStorage.getItem("userId");
    const token = window.sessionStorage.getItem("accessToken");

    console.log(userId, token);
    if (!userId || !token) {
      alert("Please log in to continue.");
      window.location.href = "/";
    }
  };

  const loginWithTikTok = () => {
    const clientKey = "sbawz0j0lszjjiahx5";
    const redirectUri = "https://a-skystuduser.vercel.app/home";
    const scope = "user.info.basic";
    const state = "random_string";
    const authUrl = `https://www.tiktok.com/v2/auth/authorize/?client_key=${clientKey}&scope=${scope}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;
    
    window.location.href = authUrl;
  };

  const getOAuthUrl = async () => {
    const API_URL = "https://skyestudio-backend.onrender.com/tiktok";
    const response = await axios.get(`${API_URL}/oauth`);
    return response.data.url;
  };

  const exchangeCodeForAccessToken = async (code) => {
    const API_URL = "https://skyestudio-backend.onrender.com/tiktok";
    const payload = { code };
    const response = await axios.post(`${API_URL}/tiktokaccesstoken`, payload);
    return response.data;
  };

  const login = async () => {
    try {
      const oauthUrl = await getOAuthUrl();
      window.location.href = oauthUrl;
    } catch (error) {
      console.error("Error getting OAuth URL:", error);
    }
  };

  const handleRedirect = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    
    if (code) {
      try {
        const data = await exchangeCodeForAccessToken(code);
        localStorage.setItem("access_token", data.access_token);
      } catch (error) {
        console.error("Error exchanging code for access token:", error);
      }
    }
  };

  return (
    <div className="row">
      <div className="col-12 d-flex justify-content-end">
        <button onClick={login} className="btn btn-primary link-account-btn">
          Link TikTok Account
        </button>
      </div>
      <div className="col-xxl-7 col-xxxl-6">
        <WhatHappening />
        <div className="row">
          <div className="col-lg-6 col-xxxl-6 col-md-6"><ExpectedEarnings /></div>
          <div className="col-lg-6 col-xxxl-6 col-md-6"><ExpectedEarnings2 /></div>
          <div className="col-xl-12 col-lg-6 col-xxxl-6 col-md-12"><RevenueThisMonth /></div>
          <div className="col-xl-12 col-lg-6 col-xxxl-6 col-md-12"><NewCustomersThisMonth /></div>
        </div>
      </div>
      <div className="col-xxl-5 col-xxxl-6">
        <StatsBoxes />
        <WeeklySales />
      </div>
      <div className="d-flex gap-5">
        <div><RevenueTargetByCountry /></div>
        <div>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex justify-content-between">
              <NewCustomersThisMonth2 />
              <NewCustomersThisMonth3 />
            </div>
            <DataBoxes />
          </div>
        </div>
      </div>
      <div><ProjectStats /></div>
      <div>
        <h4>Comment & Messages</h4>
        <ChatContent />
      </div>
    </div>
  );
};

export default EcommercePage;
