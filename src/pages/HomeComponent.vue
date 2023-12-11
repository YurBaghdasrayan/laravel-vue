<script>
import axios from "axios";
import Swal from "sweetalert2";
// import router from "@/router";

export default {
  // name: "HomeComponent",
  err: {},
  data() {
    return {
      form: {
        search: '',
      },
      postcontent: [],
      roleId: null,
      Token: null,
      data: []
    }
  },
  rules: {
    email: {required: true,},
    password: {required: true,},
  },

  mounted() {
    this.fetchData();
    this.fetchUserData();
  },

  methods: {
    fetchUserData() {
      let data = localStorage.getItem('myObject')
      this.roleId = JSON.parse(data).role_id;
    },
    fetchData() {
      let Token = localStorage.getItem('myObject')
      let token = JSON.parse(Token).token;

      axios.get('http://127.0.0.1:8000/api/post', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
          .then(({data}) => {
            this.postcontent = data.postcontent
            console.log(data)
            this.data = data;
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    },
    deletePost(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          let Token = localStorage.getItem('myObject')
          let token = JSON.parse(Token).token;

          axios.delete(`http://127.0.0.1:8000/api/post/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          })
              .then(({data}) => {
                console.log(data.data)
                this.fetchData()
              })
              .catch(error => {
                console.error('Error fetching data:', error);
              });
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
    },
    submitForm() {

      let Token = localStorage.getItem('myObject')
      let token = JSON.parse(Token).token;

      axios.post('http://127.0.0.1:8000/api/search', {
        search: this.form.search,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }).then((res) => {
        console.log(res)
      }).catch(error => {
        console.error('Error fetching data:', error);
      });


      // axios.post('http://127.0.0.1:8000/api/search', {
      //   search: this.form.search,
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`,
      //   },
      // }).then(res => {
      //   console.log(res)
      //
      // }).catch(e => {
      //   console.error('Error posting data:', e);
      // })
    }
  }
}
</script>

<template>
  <div>
  </div>
  <form>
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
             fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
      </div>
      <input               v-model="form.search"
                           name="search" type="search" id="default-search"
             class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             placeholder="Search Mockups, Logos..." required>
      <button @click="submitForm" type="button"
              class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Search
      </button>
    </div>
  </form>

  <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="min-w-full text-left text-sm font-light">

            <thead class="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" class="px-6 py-4">Post Id</th>
              <th scope="col" class="px-6 py-4">Name</th>
              <th scope="col" class="px-6 py-4">Description</th>
              <th scope="col" class="px-6 py-4">User</th>
              <th scope="col" class="px-6 py-4">Show</th>
            </tr>
            </thead>
            <tbody v-for="(posts, key) in data" :key="key" :posts="posts">
            <tr class="border-b dark:border-neutral-500">
              <td class="whitespace-nowrap px-6 py-4 font-medium">{{ posts.id }}</td>
              <td class="whitespace-nowrap px-6 py-4">{{ posts.postcontent?.name }}</td>
              <td class="whitespace-nowrap px-6 py-4">{{ posts.postcontent?.description }}</td>
              <td class="whitespace-nowrap px-6 py-4">{{ posts.user.email }}</td>
              <router-link v-if="this.roleId === 3" style="margin-right: 15px;color: black;"
                           :to="{name: 'moderator.show.post', params: {id: posts.id}}">
                <td class="whitespace-nowrap px-6 py-4">
                  <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"></path>
                  </svg>
                </td>
              </router-link>
              <button v-if="roleId === 3 || roleId === 2 " @click="deletePost(posts.id)"
                      style="color: red;border: none; margin-right: 15px">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     class="bi bi-trash" viewBox="0 0 16 16">
                  <path
                      d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                  <path
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                </svg>
              </button>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>