<script>

import axios from "axios";
import validation from "@/mixins/validation";
import router from "@/router";

export default {
  name: "CreateModerator",
  data() {
    return {
      err: {},
      Token: null,
      roleId: null,
      form: {
        name: '',
        email: '',
        password: '',
      },
      rules: {
        name: {required: true,},
        email: {required: true,},
        password: {required: true,},
      }
    }
  },
  mounted() {
    this.fetchUserData()
  },

  methods: {
    fetchUserData() {
      let data = localStorage.getItem('myObject')
      this.roleId = JSON.parse(data).role_id;
    },

    submitForm() {
      let validated = this.validation(this.rules, this.form);

      if (Object.keys(validated).length) {
        console.log(validated)
        this.err = validated;
        return
      }

      let Token = localStorage.getItem('myObject')
      let token = JSON.parse(Token).token;

      const postData = {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password,
      };
      console.log(postData)

      axios.post('http://127.0.0.1:8000/api/moderator/create', postData,{

        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
          .then(response => {
            if (this.roleId === 3) {
              router.push({name: 'moderator.home'})
            }
            if (this.roleId === 2) {
              router.push({'name': 'admin.home'})
            }
            if (this.roleId === 1) {
              router.push({'name': 'home'})
            }

            console.log('Form submitted successfully:', response.data);
          })
          .catch(error => {
            console.error('Error submitting form:', error);
          });
    }
  },
  mixins: [validation]
}
</script>

<template>
  <form action="">
    <div class="heading text-center font-bold text-2xl m-5 text-gray-800">New Moderator</div>
    <div class="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
      <input name="name" v-model="form.name" class="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
             spellcheck="false" placeholder="Name" type="text">
      <p style="color: red" v-if="err.name">{{ err.name }}</p>
      <input name="email" v-model="form.email" class="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
             spellcheck="false" placeholder="Email" type="text">
      <p style="color: red" v-if="err.email">{{ err.email }}</p>
      <input name="password" v-model="form.password"
             class="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
             spellcheck="false" placeholder="Password" type="password">
      <p style="color: red" v-if="err.email">{{ err.email }}</p>

      <div style="margin-top: 10px" class="buttons flex">
        <button @click="submitForm" type="button"
                class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">
          Post
        </button>
      </div>
    </div>
  </form>
</template>

<style scoped>

</style>