<template>
  <div class="container">
    <div class="d-flex justify-content-between">
      <h1>List Role</h1>
      <router-link to="/role/create">
        <button class="btn btn-primary">Add</button>
      </router-link>
    </div>
    <div class="col-md-6">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in roles.data" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td class="d-flex justify-content-end">
              <button class="btn btn-success m-1">view</button>
              <router-link :to="`/edit-role/${item.id}`">
                <button class="btn btn-info m-1">edit</button>
              </router-link>
              <button
                class="btn btn-danger m-1"
                @click="clickDel(item.id, index)"
              >
                delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import axios from "axios";

import { Bootstrap5Pagination } from "laravel-vue-pagination";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const router = useRouter();
const roles = ref({});

onMounted(async () => {
  listRole();
});

const listRole = async (page) => {
  const response = await axios.get(`/api/roles?page=${page}`);
  roles.value = response.data.result;
  // console.log(roles.value.data);
};

let search = ref("");

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
      await axios.delete("/api/roles/" + id).then((response) => {
        console.log(index);
        if (response.status === 200) {
          roles.value.data.splice(index, 1);
        }
        console.log(roles.value.data);
      });
    }
  });
};
</script>
