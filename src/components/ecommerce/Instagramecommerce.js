import React, { useState, useEffect } from "react";
import axios from "axios";
import Instahappen from "../../components/Dashboard/Ecommerce/instagramhappen";
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
import "./InstaCommerce.css"; // Assuming styles are in a separate file

const InstaCommerce = () => {
  const [accessToken, setAccessToken] = useState(null);

  const loginIg = () => {
    axios
      .get("https://skyestudio-backend.onrender.com/auth/login-ig")
      .then((response) => {
        window.location.href = response.data.redirectURL;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getAccessToken = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      axios
        .get(`https://skyestudio-backend.onrender.com/auth/callback?code=${code}`)
        .then((response) => {
          const { access_token, user } = response.data;
          setAccessToken(access_token);

          localStorage.setItem("igAccessToken", access_token);
          localStorage.setItem("igUserId", user.id);
          localStorage.setItem("IgUsername", user.username);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  return (
    <div className="row">
      <div className="col-12 d-flex justify-content-end">
        <button onClick={loginIg} className="btn btn-primary link-account-btn">
          Link Instagram Account
        </button>
      </div>

      <div className="col-xxl-7 col-xxxl-6">
        <Instahappen />
        <div className="row">
          <div className="col-lg-6 col-xxxl-6 col-md-6">
            <ExpectedEarnings />
          </div>
          <div className="col-lg-6 col-xxxl-6 col-md-6">
            <ExpectedEarnings2 />
          </div>
          <div className="col-xl-12 col-lg-6 col-xxxl-6 col-md-12">
            <RevenueThisMonth />
          </div>
          <div className="col-xl-12 col-lg-6 col-xxxl-6 col-md-12">
            <NewCustomersThisMonth />
          </div>
        </div>
      </div>

      <div className="col-xxl-5 col-xxxl-6">
        <StatsBoxes />
        <WeeklySales />
      </div>

      <div className="d-flex gap-5">
        <div>
          <RevenueTargetByCountry />
        </div>
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

      <div>
        <ProjectStats />
      </div>

      <div>
        <h4>Comment & Messages</h4>
        <ChatContent />
      </div>
    </div>
  );
};

export default InstaCommerce;
