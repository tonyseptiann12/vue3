<template>
  <div class="container">
    <h1>Home Page</h1>
    <div v-if="useAuth.user">
      <h3>Data User</h3>

      <router-link to="/create-user">
        <button class="btn btn-primary" type="button">Create</button>
      </router-link>

      <div class="my-3">
        <input
          type="text"
          name="search"
          v-model="search"
          class="form-control"
          placeholder="Search..."
        />
      </div>

      <table class="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Profile</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in useAuth.authUser.data" :key="index">
            <td>{{ index + useAuth.authUser.from }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <img
                :src="user.profile"
                width="50"
                height="50"
                v-if="user.profile"
              />
            </td>
            <td>
              <router-link :to="`/edit-user/${user.id}`">
                <button class="btn btn-info m-2">Edit</button>
              </router-link>

              <button
                class="btn btn-danger m-2"
                @click="clickDel(user.id, index)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <Bootstrap5Pagination
        :data="useAuth.authUser"
        @pagination-change-page="listUser"
      />
    </div>
    <div v-else>
      <h3>No Data</h3>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";

import { authStore } from "../stores/authstore";

const useAuth = authStore();
import { Bootstrap5Pagination } from "laravel-vue-pagination";

import Swal from "sweetalert2";

// const user = ref();

onMounted(async () => {
  listUser();
});

const listUser = (page) => {
  useAuth.getUser(page);
};

let search = ref("");

watch(search, (value) => {
  useAuth.searchUser(value);
});

const clickDel = (id, index) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await axios
        .delete("/api/users/" + id)
        .then((response) => {
          if (response === 200) {
            useAuth.authUser.splice(index, 1);
          } else {
            console.log(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
};
</script>
