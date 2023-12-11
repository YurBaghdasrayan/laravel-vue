<script>

import axios from "axios";
import validation from "@/mixins/validation";
import router from "../router";

export default {
  name: "PostComponent",
  data() {
    return {
      err: {},
      Token: null,
      roleId: null,
      form: {
        name: '',
        description: '',
        image: [],
      },
      rules: {
        name: {required: true,},
        description: {required: true,},
      }
    }
  },
  mounted() {
    this.fetchUserData()
  },

  methods: {
    handleFileChange() {
      this.images = this.$refs.fileInput.files;
    },
    fetchUserData() {
      let data = localStorage.getItem('myObject')
      this.roleId = JSON.parse(data).role_id;
    },

    submitForm() {
      const formData = new FormData();

      for (let i = 0; i < this.images.length; i++) {
        formData.append('images[]', this.images[i]);
      }

      let validated = this.validation(this.rules, this.form);

      if (Object.keys(validated).length) {
        console.log(validated)
        this.err = validated;
        return
      }
      formData.append('name', this.form.name);
      formData.append('description', this.form.description);

      let Token = localStorage.getItem('myObject')
      let token = JSON.parse(Token).token;


      axios.post('http://127.0.0.1:8000/api/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      })
          .then(response => {


            if (this.roleId === 3) {
              router.push({name: 'moderator.home'})
            }
            if (this.roleId === 2) {
              router.push({'name':'admin.home'})
            }
            if (this.roleId === 1) {
              router.push({'name':'home'})
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
    <div class="heading text-center font-bold text-2xl m-5 text-gray-800">New Post</div>
    <div class="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
      <input name="name" v-model="form.name" class="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
             spellcheck="false" placeholder="Title" type="text">
      <p style="color: red" v-if="err.name">{{ err.name }}</p>

      <textarea v-model="form.description" name="description"
                class="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" spellcheck="false"
                placeholder="Describe everything about this post here"></textarea>
      <p style="color: red" v-if="err.description">{{ err.description }}</p>

      <label for="image">Image:</label>
      <input @change="handleFileChange" name="images[]" ref="fileInput"  multiple accept="image/*" type="file" id="image"/>
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