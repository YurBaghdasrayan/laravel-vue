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
        name: {required: true, length: true},
        email: {required: true, length: true},
        password: {required: true, length: true},
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
  <div class="flex justify-center items-center mt-52">
    <div class="w-full max-w-xs">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="identity-input mb-4">
          <label
              for="identity"
              class="block text-gray-700 text-sm font-bold mb-2"
          >
            Name</label
          >
          <input
              id="identity"
              class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Name"
              aria-describedby="emailHelp"
              v-model="form.name"
          />
          <p style="color: red" v-if="err.name">{{ err.name }}</p>

          <span class="text-xs text-red-700" id="emailHelp"></span>
        </div>

        <div class="identity-input mb-4">
          <label
              for="identity"
              class="block text-gray-700 text-sm font-bold mb-2"
          >
            Email</label
          >
          <input
              id="identity"
              class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Email"
              aria-describedby="emailHelp"
              v-model="form.email"
          />
          <p style="color: red" v-if="err.email">{{ err.email }}</p>

          <span class="text-xs text-red-700" id="emailHelp"></span>
        </div>

        <div class="password-input mb-6">
          <label
              for="identity"
              class="block text-gray-700 text-sm font-bold mb-2"
          >Password</label
          >

          <input
              aria-describedby="passwordHelp"
              v-model="form.password"
              class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="*******"
          />
          <p style="color: red" v-if="err.password">{{ err.password }}</p>
          <span class="text-xs text-red-700" id="passwordHelp"></span>
        </div>

        <div class="flex items-center justify-between">
          <button
              @click="register"
              class="bg-blue-600 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
          >
            Sign Up
          </button>
          <a
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  </div>

</template>
<style scoped>

</style>