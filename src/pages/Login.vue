<template>
  <div class="container">
    <div class="col-md-6 m-auto">
      <h1>Login Page</h1>
      <div class="mt-3" style="color: red">
        {{ errmessage }}
      </div>
      <div class="mt-3">
        <form @submit.prevent="submitLogin">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Email</label
            >
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="email"
              v-model="form.email"
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="form.password"
            />
          </div>
          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary">Login</button>
            <router-link to="/forgot">Forgot Password?</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";

import { useRouter } from "vue-router";

import { authStore } from "../stores/authstore";

const router = useRouter();
const useAuth = authStore();

const form = ref({
  email: "",
  password: "",
});

const errmessage = ref();

const submitLogin = async () => {
  await useAuth.getToken();
  await axios
    .post("/login", {
      email: form.value.email,
      password: form.value.password,
    })
    .then((response) => {
      if (response.status === 200) {
        router.push("/");
      }
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      errmessage.value = error.response.data.message;
    });
};
</script>
