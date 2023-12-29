import { defineStore } from "pinia";
import axios from "axios";

export const authStore = defineStore("auth", {
  state: () => ({
    authUser: null,
  }),
  getters: {
    user: (state) => state.authUser,
  },
  actions: {
    async getToken() {
      await axios.get("/sanctum/csrf-cookie");
    },

    async getUser(page) {
      const response = await axios.get(`/api/users?page=${page}`);
      //   console.log(response.data.result);
      this.authUser = response.data.result;
    },

    async searchUser(search) {
      const response = await axios.get("/api/users/?search=" + search);
      this.authUser = response.data.result;
    },

    async logOut() {
      await axios.post("/logout");
      this.authUser = null;
    },
  },
});

// export default authStore;
