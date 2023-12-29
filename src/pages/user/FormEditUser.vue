<template>
  <div class="container">
    <div class="col-md-6 m-auto">
      <h1>Edit User</h1>

      <div class="mt-3" style="color: red">
        {{ errmessage }}
      </div>

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
              placeholder="Your Name"
              v-model="form.name"
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput2" class="form-label"
              >Email</label
            >
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput2"
              placeholder="name@example.com"
              v-model="form.email"
            />
          </div>

          <div class="mb-3">
            <label for="exampleFormControlInput3" class="form-label"
              >Level</label
            >
            <select class="form-select" v-model="form.level">
              <option value="user" :selected="form.level === 'user'">
                User
              </option>
              <option value="staf" :selected="form.level === 'staf'">
                Staf
              </option>
              <option value="admin" :selected="form.level === 'admin'">
                Admin
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="exampleFormControlInput4" class="form-label">Role</label
            ><br />
            <span v-for="(itemRole, index) in roles" :Key="index">
              <label class="m-2" for="">
                <input
                  type="checkbox"
                  class="form-checkbox"
                  id="exampleFormControlInput4"
                  v-model="form.role"
                  :value="itemRole.name"
                  :checked="isItemChecked(itemRole.name, index)"
                  @change="toogleCheckbox(index)"
                />{{ itemRole.name }}
              </label>
            </span>
          </div>

          <div class="mb-3">
            <label for="exampleFormControlInput5" class="form-label"
              >Photo</label
            >
            <input
              type="file"
              class="form-control"
              id="exampleFormControlInput5"
              @change="onChangeFile"
            />
          </div>

          <div>
            <img :src="imgPreview" width="100" height="100" />
          </div>

          <div class="mt-2">
            <button type="submit" class="btn btn-primary" v-if="!isProcess">
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

const img = ref(null);
const imgPreview = ref(null);

const roles = ref([]);
const userRoles = ref([]);

const form = ref({
  name: "",
  email: "",
  password: "",
  file: "",
  level: "",
  role: [],
});

const errmessage = ref("");
const isProcess = ref(false);

const onChangeFile = (event) => {
  img.value = event.target.files[0];
  let reader = new FileReader();
  reader.addEventListener(
    "load",
    function () {
      imgPreview.value = reader.result;
    }.bind(this),
    false
  );

  if (img) {
    if (/\.(jpe?g|png|gif)$/i.test(img.value.name)) {
      reader.readAsDataURL(img.value);
    }
  }
};

onMounted(async () => {
  await axios
    .get("/api/users/" + route.params.id)
    .then((response) => {
      if (response.status === 200) {
        form.value.email = response.data.result.user.email;
        form.value.name = response.data.result.user.name;
        imgPreview.value = response.data.result.user.profile;
        form.value.level = response.data.result.user.level;
        roles.value = response.data.result.roles;
        userRoles.value = response.data.result.userRole;
      }
      console.log(response.data.message);
    })
    .catch((error) => {
      isProcess.value = false;
      errmessage.value = error.response.data.message;
    });
});

const isItemChecked = (nameRole, index) => {
  if (nameRole == userRoles.value[nameRole]) {
    form.value.role[index] = nameRole;
    // return true;
  } else {
    form.value.role[index] = null;
  }
};

const toogleCheckbox = (index) => {
  if (form.value.role[index] != null) {
    userRoles.value[form.value.role[index]] = null;
    form.value.role[index] = false;
  } else {
    userRoles.value[form.value.role[index]] = form.value.role[index];
    form.value.role[index] = form.value.role[index];
  }
};

const submitUpdate = async () => {
  isProcess.value = true;

  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  await axios
    .post(
      `/api/users/${route.params.id}`,
      {
        name: form.value.name,
        email: form.value.email,
        profile_photo_path: img.value,
        level: form.value.level,
        roles: form.value.role,
        _method: "put",
      },
      config
    )
    .then((response) => {
      if (response.status === 200) {
        isProcess.value = false;
        router.push("/");
      }
      console.log(response.data.message);
    })
    .catch((error) => {
      isProcess.value = false;
      errmessage.value = error.response.data.message;
    });
};
</script>
