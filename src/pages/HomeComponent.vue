<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  // name: "HomeComponent",
  err: {},
  data() {
    return {
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
    }
  }
}
</script>

<template>
  <div>

  </div>
  <!--  <div>-->
  <!--    <header>-->
  <!--      &lt;!&ndash; Navigation bar &ndash;&gt;-->
  <!--      <nav-->
  <!--          class="relative flex w-full items-center justify-between bg-white py-2 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start"-->
  <!--          data-te-navbar-ref>-->
  <!--        <div class="flex w-full flex-wrap items-center justify-between px-3">-->
  <!--          <div class="flex items-center">-->
  <!--            &lt;!&ndash; Hamburger menu button &ndash;&gt;-->
  <!--            <button-->
  <!--                class="border-0 bg-transparent px-2 text-xl leading-none transition-shadow duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 dark:hover:text-white dark:focus:text-white lg:hidden"-->
  <!--                type="button"-->
  <!--                data-te-collapse-init-->
  <!--                data-te-target="#navbarSupportedContentX"-->
  <!--                aria-controls="navbarSupportedContentX"-->
  <!--                aria-expanded="false"-->
  <!--                aria-label="Toggle navigation">-->
  <!--              &lt;!&ndash; Hamburger menu icon &ndash;&gt;-->
  <!--              <span class="[&>svg]:w-5">-->
  <!--            <svg-->
  <!--                xmlns="http://www.w3.org/2000/svg"-->
  <!--                fill="none"-->
  <!--                viewBox="0 0 24 24"-->
  <!--                stroke-width="1.5"-->
  <!--                stroke="currentColor"-->
  <!--                class="h-7 w-7">-->
  <!--              <path-->
  <!--                  stroke-linecap="round"-->
  <!--                  stroke-linejoin="round"-->
  <!--                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>-->
  <!--            </svg>-->
  <!--          </span>-->
  <!--            </button>-->
  <!--          </div>-->

  <!--          &lt;!&ndash; Navigation links &ndash;&gt;-->
  <!--          <div-->
  <!--              class="!visible hidden grow basis-[100%] items-center lg:!flex lg:basis-auto"-->
  <!--              id="navbarSupportedContentX"-->
  <!--              data-te-collapse-item>-->
  <!--            <ul-->
  <!--                class="mr-auto flex flex-col lg:flex-row"-->
  <!--                data-te-navbar-nav-ref>-->
  <!--              <li class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>-->
  <!--                <a-->
  <!--                    class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"-->
  <!--                    href="/all-post"-->
  <!--                    data-te-nav-link-ref-->
  <!--                    data-te-ripple-init-->
  <!--                    data-te-ripple-color="light"-->
  <!--                >All Posts</a-->
  <!--                >-->
  <!--              </li>-->
  <!--              <li class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>-->
  <!--                <a-->
  <!--                    class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"-->
  <!--                    href="/create-post"-->
  <!--                    data-te-nav-link-ref-->
  <!--                    data-te-ripple-init-->
  <!--                    data-te-ripple-color="light"-->
  <!--                >Create Posts</a-->
  <!--                >-->
  <!--              </li>-->
  <!--            </ul>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </nav>-->
  <!--      <div-->
  <!--          class="relative overflow-hidden bg-cover bg-no-repeat"-->
  <!--          style="-->
  <!--      background-position: 50%;-->
  <!--      background-image: url('https://tecdn.b-cdn.net/img/new/slides/146.webp');-->
  <!--      height: 350px;-->
  <!--    ">-->
  <!--        <div-->
  <!--            class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"-->
  <!--            style="background-color: rgba(0, 0, 0, 0.75)">-->
  <!--          <div class="flex h-full items-center justify-center">-->
  <!--            <div class="px-6 text-center text-white md:px-12">-->
  <!--            </div>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </header>-->

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
            <tbody v-for="(asd, key) in data" :key="key" :asd="asd">
            <tr class="border-b dark:border-neutral-500">
              <td class="whitespace-nowrap px-6 py-4 font-medium">{{ asd.id }}</td>
              <td class="whitespace-nowrap px-6 py-4">{{ asd.postcontext.name }}</td>
              <td class="whitespace-nowrap px-6 py-4">{{ asd.postcontext.description }}</td>
              <td class="whitespace-nowrap px-6 py-4">{{ asd.user.email }}</td>
              <router-link v-if="this.roleId === 3" style="margin-right: 15px;color: black;"
                           :to="{name: 'moderator.show.post', params: {id: asd.id}}">
                <td class="whitespace-nowrap px-6 py-4">
                  <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"></path>
                  </svg>
                </td>
              </router-link>
              <button v-if="roleId === 3 || roleId === 2 " @click="deletePost(asd.id)"
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