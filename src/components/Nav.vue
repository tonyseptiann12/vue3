<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" aria-current="page" to="/"
              >Home</RouterLink
            >
          </li>
          <li class="nav-item" v-if="useAuth.user">
            <router-link class="nav-link" to="Role">Manage Role</router-link>
          </li>
          <li class="nav-item" v-if="!useAuth.user">
            <router-link class="nav-link" to="Login">Login</router-link>
          </li>
          <li class="nav-item" v-if="!useAuth.user">
            <router-link
              class="nav-link"
              to="Register"
              tabindex="-1"
              aria-disabled="true"
              >Register</router-link
            >
          </li>
          <li class="nav-item" v-if="useAuth.user">
            <router-link
              class="nav-link"
              to="#"
              tabindex="-1"
              aria-disabled="true"
              ><span @click="useAuth.logOut">Logout</span></router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted } from "vue";
import { authStore } from "../stores/authstore";

const useAuth = authStore();

onMounted(async () => {
  await useAuth.getUser();
});
</script>

<style scoped>
.nav-link.active {
  color: blue;
}
</style>
