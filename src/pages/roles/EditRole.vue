<template>
  <div class="container">
    <div class="col-md-6 m-auto">
      <h1>Edit Role</h1>

      <div class="mt-3">
        <form @submit.prevent="submitUpdate">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Name</label
            >
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Role Name"
              v-model="form.role"
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Pilih Permission</label
            ><br />
            <span v-for="(itemPerm, index) in permissions" :Key="index">
              <label class="m-2" for="">
                <input
                  type="checkbox"
                  class="form-checkbox"
                  id="permisi"
                  v-model="form.permission"
                  :value="itemPerm.id"
                  :checked="isItemChecked(itemPerm.id, index)"
                  @change="toogleCheckbox(index)"
                />
                {{ itemPerm.name }}
              </label>
              <br />
            </span>
          </div>
          <div>
            <button type="submit" class="btn btn-info" v-if="!isProcess">
              Update
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

import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const permissions = ref([]);
const rolePermission = ref([]);
const isProcess = ref(false);

const form = ref({
  role: "",
  permission: [],
});

onMounted(async () => {
  getEdit();
});

const getEdit = async () => {
  await axios
    .get("/api/roles/" + route.params.id + "/edit")
    .then((response) => {
      console.log(response.data);
      if (response.status == 200) {
        form.value.role = response.data.result.role.name;
        permissions.value = response.data.result.permission;
        rolePermission.value = response.data.result.rolePermission;
      }
      console.log(response.data.message);
    })
    .catch((error) => {
      isProcess.value = false;
      errmessage.value = error.response.data.message;
    });
};

const isItemChecked = (value, index) => {
  if (value == rolePermission.value[value]) {
    form.value.permission[index] = value;
    // return true;
  } else {
    form.value.permission[index] = null;
  }
};

const toogleCheckbox = (index) => {
  if (form.value.permission[index] != null) {
    rolePermission.value[form.value.permission[index]] = null;
    form.value.permission[index] = false;
  } else {
    rolePermission.value[form.value.permission[index]] =
      form.value.permission[index];
    form.value.permission[index] = form.value.permission[index];
  }
};

const submitUpdate = async () => {
  isProcess.value = true;
  await axios
    .post(`/api/roles/${route.params.id}`, {
      name: form.value.role,
      permission: form.value.permission,
      _method: "put",
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
