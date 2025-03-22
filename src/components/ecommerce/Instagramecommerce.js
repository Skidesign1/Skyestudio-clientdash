<template>
  <div class="row">
    <div class="col-12 d-flex justify-content-end">
      <button @click="loginIg" class="btn btn-primary link-account-btn">Link Instagram Account</button>
    </div>
    <div class="col-xxl-7 col-xxxl-6">
      <Instahappen />

      <div class="row">
        <div class="col-lg-6 col-xxxl-6 col-md-6">
          <ExpectedEarnings />
        </div>
        <div class="col-lg-6 col-xxxl-6 col-md-6">
          <ExpectedEarnings2 />
        </div>
        <div class="col-xl-12 col-lg-6 col-xxxl-6 col-md-12">
          <RevenueThisMonth />
        </div>
        <div class="col-xl-12 col-lg-6 col-xxxl-6 col-md-12">
          <NewCustomersThisMonth />
        </div>
      </div>
    </div>
    <div class="col-xxl-5 col-xxxl-6">
      <StatsBoxes />

      <WeeklySales />
    </div>
    <div class="d-flex gap-5">
      <div class="">
        <RevenueTargetByCountry />
      </div>
      <div class="">
        <div class="d-flex flex-column gap-3">
          <div class="d-flex justify-content-between">
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
</template>

<script>
/* eslint-disable no-undef */
import { defineComponent } from "vue";

import Instahappen from "../../components/Dashboard/Ecommerce/instagramhappen.vue";

import ExpectedEarnings from "../../components/Dashboard/Ecommerce/ExpectedEarnings.vue";

import ExpectedEarnings2 from "../../components/Dashboard/Ecommerce/ExpectedEarnings2.vue";

import RevenueThisMonth from "../../components/Dashboard/Ecommerce/RevenueThisMonth.vue";

import RevenueTargetByCountry from "../../components/Dashboard/CRMSystem/RevenueTargetByCountry/index.vue";

import ProjectStats from "../../components/Dashboard/ProjectManagement/ProjectStats/index.vue";

import NewCustomersThisMonth from "../../components/Dashboard/Ecommerce/NewCustomersThisMonth.vue";

import NewCustomersThisMonth2 from "../../components/Dashboard/Ecommerce/NewCustomersThisMonth2.vue";

import NewCustomersThisMonth3 from "../../components/Dashboard/Ecommerce/NewCustomersThisMonth3.vue";

import StatsBoxes from "../../components/Dashboard/Ecommerce/StatsBoxes/index.vue";

import DataBoxes from "../../components/Dashboard/Ecommerce/StatsBoxes/data.vue";

import WeeklySales from "../../components/Dashboard/Ecommerce/WeeklySales.vue";

import ChatContent from "../../components/Chat/ChatContent.vue";

import axios from 'axios'

export default defineComponent({
  name: "InstaCommerce",
  components: {
    Instahappen,
    ExpectedEarnings,
    ExpectedEarnings2,
    RevenueThisMonth,
    RevenueTargetByCountry,
    NewCustomersThisMonth,
    NewCustomersThisMonth2,
    NewCustomersThisMonth3,
    StatsBoxes,
    WeeklySales,
    ProjectStats,
    ChatContent,
    DataBoxes,
  },
  data() {
    return {
      showOnboarding: false,
      accessToken: null,
    };
  },
  methods: {
    loginIg() {
      axios.get('https://skyestudio-backend.onrender.com/auth/login-ig')
        .then(response => {
          window.location.href = response.data.redirectURL;
        })
        .catch(error => {
          console.error(error);
        });
    },

    getAccessToken() {
      const url = new URL(window.location.href);
      const code = url.searchParams.get('code');
      if (code) {
        axios.get(`https://skyestudio-backend.onrender.com/auth/callback?code=${code}`)
          .then(response => {
            const accessToken = response.data.access_token;
            const userId = response.data.user.id;
            const userName = response.data.user.username;
            this.accessToken = accessToken;
            this.userId = userId;
            this.userName = userName;
            // Save access token and user id in local storage
            localStorage.setItem('igAccessToken', accessToken);
            localStorage.setItem('igUserId', userId);
            localStorage.setItem('IgUsername', userName);
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
  },

  mounted() {
    this.getAccessToken();
   }
});
</script>
<style scoped>
/* Button styling */
.link-account-btn {
  margin-bottom: 20px;
  margin-left: 20px;
}
</style>
