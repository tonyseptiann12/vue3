<template>
  <div class="container">
    <div class="col-md-6 m-auto">
      <h1>Create Role</h1>

      <div class="mt-3">
        <form @submit.prevent="submitCreate">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Name</label
            >
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Role Name"
              v-model="form.name"
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Pilih Permission</label
            ><br />
            <span v-for="(itemPerm, index) in permission" :Key="index">
              <label class="m-2" for="">
                <input
                  type="checkbox"
                  class="form-checkbox"
                  id="permisi"
                  v-model="form.permission"
                  :value="itemPerm.id"
                />
                {{ itemPerm.name }}
              </label>
              <br />
            </span>
          </div>
          <div>
            <button type="submit" class="btn btn-primary" v-if="!isProcess">
              Save
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              v-if="isProcess"
              disabled
            >
              Loading
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

import { useRouter } from "vue-router";

const router = useRouter();
const permission = ref([]);
const isProcess = ref(false);

const form = ref({
  name: "",
  permission: [],
});

onMounted(async () => {
  listPermission();
});

const listPermission = async () => {
  const response = await axios.get(`/api/roles/create`);
  permission.value = response.data.result;
};

const submitCreate = async () => {
  isProcess.value = true;
  await axios
    .post("/api/roles", {
      name: form.value.name,
      permission: form.value.permission,
    })
    .then((response) => {
      if (response.status === 200) {
        isProcess.value = false;
        router.push("/role");
      }
      console.log(response.data.message);
    })
    .catch((error) => {
      isProcess.value = false;
    });
};
</script>
