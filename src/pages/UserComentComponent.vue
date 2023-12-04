<script>
import axios from "axios";
import router from "../router";
import Swal from 'sweetalert2'


export default {
  name: "UserCommentComponent",

  data() {
    return {
      Token:null,
      data: []
    }
  },

  mounted() {
    this.fetchData();
  },
  methods: {
    router() {
      return router
    },
    fetchData() {
      let Token = localStorage.getItem('myObject')
      let token = JSON.parse(Token).token;

      axios.get(`http://127.0.0.1:8000/api/comment/${this.$route.params.id}`, {
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

          axios.get(`http://127.0.0.1:8000/api/comment-delete/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          })
              .then(({data}) => {
                console.log(data)
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
  },
}
</script>

<template>
  <a href="/home">go to home</a>

  <h1>Comments for Posts</h1>

  <table class="table">
    <thead class="thead-dark">
    <tr >
      <th scope="col">#</th>
      <th scope="col">Comment</th>
      <th scope="col">Delete</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(asd, key) in data" :key="key" :asd="asd">
      <th scope="row">{{ asd.post_id }}</th>
      <td >{{ asd.comment }}</td>
      <td>
        <button @click="deletePost(asd.id)" style="color: red">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
          </svg>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>