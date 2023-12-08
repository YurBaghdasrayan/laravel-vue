<script>
export default {
  name: "TopHeader",
  data(){
    return{
      roleId:null
    }
  },
  mounted() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      let data = localStorage.getItem('myObject')
      this.roleId = JSON.parse(data).role_id;
    },
  }
}
</script>
<template>
  <header>
    <nav
        class="relative flex w-full items-center justify-between bg-white py-2 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start"
        data-te-navbar-ref>
      <div class="flex w-full flex-wrap items-center justify-between px-3">
        <div class="flex items-center">
          <!-- Hamburger menu button -->
          <button
              class="border-0 bg-transparent px-2 text-xl leading-none transition-shadow duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 dark:hover:text-white dark:focus:text-white lg:hidden"
              type="button"
              data-te-collapse-init
              data-te-target="#navbarSupportedContentX"
              aria-controls="navbarSupportedContentX"
              aria-expanded="false"
              aria-label="Toggle navigation">
            <!-- Hamburger menu icon -->
            <span class="[&>svg]:w-5">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-7 w-7">
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
            </svg>
          </span>
          </button>
        </div>

        <!-- Navigation links -->

        <div
            class="!visible hidden grow basis-[100%] items-center lg:!flex lg:basis-auto"
            id="navbarSupportedContentX"
            data-te-collapse-item>
          <ul v-if="roleId == 3"

              class="mr-auto flex flex-col lg:flex-row"
              data-te-navbar-nav-ref>
            <li  class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <a
                  class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                  href="/moderator/home"
                  data-te-nav-link-ref
                  data-te-ripple-init
                  data-te-ripple-color="light"
              >Home</a
              >
            </li>
            <li  class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <a
                  class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                  href="/moderator/posts"
                  data-te-nav-link-ref
                  data-te-ripple-init
                  data-te-ripple-color="light"
              >My Posts</a
              >
            </li>
            <li class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <a
                  class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                  href="/moderator/create/post"
                  data-te-nav-link-ref
                  data-te-ripple-init
                  data-te-ripple-color="light"
              >Create Posts</a
              >
            </li>
          </ul>
          <ul v-if="roleId == 1"

              class="mr-auto flex flex-col lg:flex-row"
              data-te-navbar-nav-ref>
            <li  class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <a
                  class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                  href="/home"
                  data-te-nav-link-ref
                  data-te-ripple-init
                  data-te-ripple-color="light"
              >Home</a
              >
            </li>


            <li  class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <a
                  class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                  href="/all/post"
                  data-te-nav-link-ref
                  data-te-ripple-init
                  data-te-ripple-color="light"
              >My Posts</a
              >
            </li>
            <li class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <a
                  class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                  href="/create/post"
                  data-te-nav-link-ref
                  data-te-ripple-init
                  data-te-ripple-color="light"
              >Create Posts</a
              >
            </li>
          </ul>
          <ul v-if="roleId == 2"
              class="mr-auto flex flex-col lg:flex-row"
              data-te-navbar-nav-ref>
            <li  class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <a
                  class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                  href="/admin/home"
                  data-te-nav-link-ref
                  data-te-ripple-init
                  data-te-ripple-color="light"
              >Home</a
              >
            </li>

            <li  class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <a
                  class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                  href="/admin/users"
                  data-te-nav-link-ref
                  data-te-ripple-init
                  data-te-ripple-color="light"
              >All Users</a
              >
            </li>

            <li  class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <a
                  class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                  href="/admin/create/moderator"
                  data-te-nav-link-ref
                  data-te-ripple-init
                  data-te-ripple-color="light"
              >Create Moderator
              </a>
            </li>

            <li  class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <a
                  class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                  href="/admin/posts"
                  data-te-nav-link-ref
                  data-te-ripple-init
                  data-te-ripple-color="light"
              >My Posts</a
              >
            </li>
            <li class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <a
                  class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                  href="/admin/create/post"
                  data-te-nav-link-ref
                  data-te-ripple-init
                  data-te-ripple-color="light"
              >Create Posts</a
              >
            </li>
          </ul>


        </div>
      </div>
    </nav>
    <div
        class="relative overflow-hidden bg-cover bg-no-repeat"
        style="
      background-position: 50%;
      background-image: url('https://tecdn.b-cdn.net/img/new/slides/146.webp');
      height: 350px;
    ">
      <div
          class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
          style="background-color: rgba(0, 0, 0, 0.75)">
        <div class="flex h-full items-center justify-center">
          <div class="px-6 text-center text-white md:px-12">
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>