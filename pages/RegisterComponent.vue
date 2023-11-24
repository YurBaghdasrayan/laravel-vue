<script>
import axios from "axios";
import router from "../router";
import validation from "@/mixins/validation";
export default {
  name: "RegisterComponent",
  data() {
    return {
      err: {},
      form: {
        name: '',
        email: '',
        password: '',
      },
      rules: {
        name: { required: true },
        email: { required: true, },
        password: { required: true, },
      }
    }
  },
  methods: {
    async register() {
      try {
        let validated = this.validation(this.rules, this.form);
        if (Object.keys(validated).length) {
          console.log(validated)
          this.err = validated;
          return
        }
        const response = await axios.post('http://127.0.0.1:8000/api/store', {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password
        });
        if (response.data.success == true) {
          router.push('login')
        }
        console.log(response.data);
      } catch (error) {
        console.error('Error posting data:', error);
      }
    },
  },
  mixins: [validation]
}

</script>
<template>
  <form class="" style="width: 500px;margin: 0 auto">
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input v-model="form.email" name="email" type="email" class="form-control" id="exampleInputEmail1"
             aria-describedby="emailHelp">
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      <p v-if="err.email">{{ err.email }}</p>

    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Name</label>
      <input v-model="form.name" name="name" type="text" class="form-control" id="exampleInputEmail1"
             aria-describedby="emailHelp">
      <p v-if="err.name">{{ err.name }}</p>

      <small id="emailHelp" class="form-text text-muted">We'll never share your name with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input v-model="form.password" name="password" type="password" class="form-control" id="exampleInputPassword1">
      <small id="emailHelp" class="form-text text-muted">We'll never share your password with anyone else.</small>
      <p v-if="err.password">name required</p>

    </div>
    <button @click="register" type="button" class="btn btn-primary">Submit</button>
  </form>
</template>
<style scoped>

</style>