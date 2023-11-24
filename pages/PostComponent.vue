<script>

import axios from "axios";
import validation from "@/mixins/validation";
import router from "../router";

export default {
  name: "PostComponent",
  data() {
    return {
      err: {},
      form: {
        name: '',
        description: '',
        image: null,
      },
      rules: {
        name: {required: true,},
        description: {required: true,},
      }
    }
  },
  methods: {
    handleFileChange(event) {
      this.form.image = event.target.files[0];
    },

    submitForm() {
      let validated = this.validation(this.rules, this.form);

      if (Object.keys(validated).length) {
        console.log(validated)
        this.err = validated;
        return
      }

      let formData = new FormData();
      formData.append('name', this.form.name);
      formData.append('description', this.form.description);
      formData.append('image', this.form.image);


      let token = localStorage.getItem('token')

      axios.post('http://127.0.0.1:8000/api/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      })
          .then(response => {
            router.push('home');
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
  create moderator or user
  <form class="" style="width: 500px;margin: 0 auto">
    <div class="form-group">
      <label for="exampleInputEmail1"> Name</label>
      <input v-model="form.name" name="name" type="text" class="form-control" id="exampleInputEmail1"
             aria-describedby="emailHelp">
      <small id="emailHelp" class="form-text text-muted">We'll never share your name with anyone else.</small>
      <p v-if="err.name">{{ err.name }}</p>
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Description</label>
      <input v-model="form.description" name="description" type="text" class="form-control" id="exampleInputEmail1"
             aria-describedby="emailHelp">
      <small id="emailHelp" class="form-text text-muted">We'll never share your description with anyone else.</small>
      <p v-if="err.description">{{ err.description }}</p>

    </div>
    <div class="form-group">
      <label for="image">Image:</label>
      <input name="image" @change="handleFileChange" type="file" id="image"/>
    </div>
    <button @click="submitForm" type="button" class="btn btn-primary">Submit</button>

  </form>

</template>

<style scoped>

</style>