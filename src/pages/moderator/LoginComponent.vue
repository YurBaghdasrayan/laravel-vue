<script>
import axios from "axios";
import router from "../../router";
import validation from "@/mixins/validation";


export default {
  name: "LoginComponent",

  data() {
    return {
      err: {},
      form: {
        name: '',
        email: '',
        password: '',
      },
      rules: {
        email: {required: true,},
        password: {required: true,},
      }
    }
  },

  methods: {
    async login() {
      let validated = this.validation(this.rules, this.form);
      if (Object.keys(validated).length) {
        console.log(validated)
        this.err = validated;
        return
      }
      axios.post('http://127.0.0.1:8000/api/moderator/login', {
        email: this.form.email,
        password: this.form.password
      }).then(res => {
        const myObject = {token: res.data.token, role_id: res.data.user.role_id};

        localStorage.setItem('myObject',JSON.stringify(myObject));

        router.push('moderator.home')
        console.log('Error posting data:', res);
      }).catch(e => {
        console.error('Error posting data:', e);
      })
    }
  },
  mixins: [validation]
}

</script>

<template>
  <h3>Moderator Login</h3>
  <div class="flex justify-center items-center mt-52">
    <div class="w-full max-w-xs">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
              @click="login"
              class="bg-blue-600 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
          >
            Sign In
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