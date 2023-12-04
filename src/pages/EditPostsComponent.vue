<script>

import axios from "axios";
import validation from "@/mixins/validation";
import Swal from 'sweetalert2'


export default {
  data() {
    return {
      roleId:null,
      Token:null,
      err: {},
      data: [],
      form: {
        name: '',
        description: '',
      },
      rules: {
        name: {required: true,},
        description: {required: true,},
      }

    }
  },

  mounted() {
    let Token = localStorage.getItem('myObject')
    let token = JSON.parse(Token).token;

    axios.get(`http://127.0.0.1:8000/api/get-post/${this.$route.params.id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
        .then((res) => {
          this.form.name = res.data[0].name
          this.form.description = res.data[0].description
          this.form.id = res.data[0].id
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
  },
  name: "EditPostsComponent",
  methods: {
    async updateForm(id) {
      try {
        let validated = this.validation(this.rules, this.form);
        if (Object.keys(validated).length) {
          this.err = validated;
          return
        }

        let Token = localStorage.getItem('myObject')
        let token = JSON.parse(Token).token;

        console.log(id)
        await axios.post(`http://127.0.0.1:8000/api/post/${id}`, {
          name: this.form.name,
          description: this.form.description,

        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }).then(() => {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Post updated successfully",
            showConfirmButton: false,
            timer: 1500
          });
            })
      } catch (error) {
        console.error('Error posting data:', error);
      }
    },
  },
  mixins: [validation]
}

</script>

<template>
  <a href="/home">go to home</a>


  <form action="">
    <div class="heading text-center font-bold text-2xl m-5 text-gray-800">Update Post</div>
    <div class="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
      <input name="name" v-model="form.name"  class="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellcheck="false" placeholder="Title" type="text">
      <p style="color: red" v-if="err.name">{{ err.name }}</p>

      <textarea v-model="form.description" name="description" class="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" spellcheck="false" placeholder="Describe everything about this post here"></textarea>
      <p style="color: red" v-if="err.description">{{ err.description }}</p>

      <label for="image">Image:</label>
      <input name="image" @change="handleFileChange" type="file" id="image"/>
      <div style="margin-top: 10px" class="buttons flex">
        <button @click="updateForm(form.id)" type="button" class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">Post</button>
      </div>
    </div>
  </form>
</template>

<style scoped>

</style>