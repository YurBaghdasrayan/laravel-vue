<script>
import axios from "axios";
import validation from "@/mixins/validation";
import Swal from "sweetalert2";
// import myImage from '/../../src/assets';


export default {

  name: "ShowComponent",
  data() {
    return {
      err: {},
      Token: null,
      roleId: null,
      data: [],
      inputVisible: false,
      inputValue: '',

      form: {
        reply: '',
        comment: '',
      },
      rules: {
        reply: {required: true, date: true},
      },
      commentRules: {
        comment: {required: true,},
      }
    }
  },
  mounted() {
    this.fetchData();
    this.fetchUserData();
  },
  methods: {
    async fetchData() {

      let data = localStorage.getItem('myObject')
      this.roleId = JSON.parse(data).role_id;

      let Token = localStorage.getItem('myObject')
      let token = JSON.parse(Token).token;


      await axios.get(`http://127.0.0.1:8000/api/post-show/${this.$route.params.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
          .then(({data}) => {
            console.log(data)
            this.data = data
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    },
    fetchUserData() {
      let data = localStorage.getItem('myObject')
      this.roleId = JSON.parse(data).role_id;
    },

    sendReply(reply, commentId) {

      let validated = this.validation(this.rules, {reply});

      if (Object.keys(validated).length) {
        console.log(validated)
        this.err = validated;
        return
      }
      let Token = localStorage.getItem('myObject')
      let token = JSON.parse(Token).token;

      axios.post('http://127.0.0.1:8000/api/reply-comment', {
        reply: reply,
        comment_id: commentId,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }).then((res) => {
        this.fetchData();

        console.log(res)
      }).catch(error => {
        console.error('Error fetching data:', error);
      });
    },


    commentCreate(postId) {
      let validated = this.CommentValidation(this.commentRules, this.form);

      if (Object.keys(validated).length) {
        console.log(validated)
        this.err = validated;
        return
      }

      let Token = localStorage.getItem('myObject')
      let token = JSON.parse(Token).token;

      axios.post('http://127.0.0.1:8000/api/comment', {
        comment: this.form.comment,
        post_id: postId,

      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }).then((res) => {
        this.fetchData();
        console.log(res)
      }).catch(error => {
        console.error('Error fetching data:', error);
      });

    },
    deleteComment(id) {
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

          axios.delete(`http://127.0.0.1:8000/api/comment-delete/${id}`, {
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
    deleteCommentReply(id) {
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

          axios.delete(`http://127.0.0.1:8000/api/comment-reply-delete/${id}`, {
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
  },
  mixins: [validation]
}

</script>
<template>
  <div>
    <div class="flex h-[50px] bg-[#EFEFEF]">
      <div class="flex items-center justify-between mx-auto w-[447px]">
        <p class="font-roboto">Доставка</p>
        <p>Оплата</p>
        <p>Отзывы</p>
        <p>Вопрос - ответ</p>
        <p>Контакты</p>
      </div>
    </div>
    <div class="h-[120px]">
      <div class=" mx-auto flex items-center h-[80px] w-[1110px]">
        <img class="" src="../../src/assets/logo1.png" alt="">
        <img class="" src="../../src/assets/BEAUTY.png" alt="">
        <div class="flex ">
          <p class="flex text-[16px] items-center justify-center" >
            8 (812) 123-45-67
          </p>
          <p class="border-[#66C05D] flex items-center justify-center h-[40px] w-[140px] text-[14px] border-2 rounded-3xl	">
            Обратный звонок
          </p>
        </div>
      </div>
    </div>
  </div>


  <!--////////////////  -->

  <!--  <div v-for="(asd, key) in data.data" :key="key" :asd="asd"-->
  <!--       class="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-56 max-w-md md:max-w-2xl ">-->
  <!--    <div class="flex items-start px-4 py-6">-->
  <!--      <img class="w-12 h-12 rounded-full object-cover mr-4 shadow"-->
  <!--           src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"-->
  <!--           alt="avatar">-->
  <!--      <div class="">-->
  <!--        <div class="flex items-center justify-between">-->
  <!--          <h2 class="text-lg font-semibold text-gray-900 -mt-1">{{ asd.user.email }} </h2>-->
  <!--          <small class="text-sm text-gray-700">22h ago</small>-->
  <!--        </div>-->
  <!--        <p class="text-gray-700">{{ asd.created_at }} </p>-->
  <!--        <p class="mt-3 text-gray-700 text-sm">-->
  <!--          {{ asd.postcontext.name }}-->
  <!--        </p>-->

  <!--        <p class="mt-3 text-gray-700 text-sm">-->
  <!--          {{ asd.postcontext.description }}-->
  <!--        </p>-->
  <!--        <div class="mt-4 flex items-center">-->
  <!--          <div class="flex mr-2 text-gray-700 text-sm mr-3">-->
  <!--            <svg fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-1" stroke="currentColor">-->
  <!--              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"-->
  <!--                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>-->
  <!--            </svg>-->
  <!--            <span>12</span>-->
  <!--          </div>-->
  <!--          <div class="flex mr-2 text-gray-700 text-sm mr-8">-->
  <!--            <svg fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-1" stroke="currentColor">-->
  <!--              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"-->
  <!--                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>-->
  <!--            </svg>-->
  <!--            <span> {{ data.data[0].comments.length }}</span>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->

  <!--  </div>-->
  <!--  <div v-for="(asd, key) in data.data" :key="key" :asd="asd" class="max-w-2xl mx-auto px-4">-->
  <!--    <div class="flex justify-between items-center mb-6">-->
  <!--      <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">-->
  <!--        Discussion {{-->
  <!--          data.data[0].comments.length-->
  <!--        }}-->
  <!--      </h2>-->
  <!--    </div>-->
  <!--    <form class="mb-6">-->
  <!--      <div-->
  <!--          class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">-->
  <!--        <label for="comment" class="sr-only">Your comment</label>-->
  <!--        <textarea v-model="form.comment" name="comment" id="comment" rows="6"-->
  <!--                  class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"-->
  <!--                  placeholder="Write a comment..." required></textarea>-->

  <!--      </div>-->
  <!--      <p style="color: red" v-if="err.comment">{{ err.comment }}</p>-->

  <!--      <button @click="commentCreate(asd.id)" style="color: blue;border:2px solid blue " type="button"-->
  <!--              class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">-->
  <!--        Post comment-->
  <!--      </button>-->
  <!--    </form>-->
  <!--    <article v-for="(comment, key) in asd.comments" :key="key"-->
  <!--             class="p-6 text-base bg-white rounded-lg dark:bg-gray-900">-->
  <!--      <footer class="flex justify-between items-center mb-2">-->
  <!--        <div class="flex items-center">-->
  <!--          <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img-->
  <!--              class="mr-2 w-6 h-6 rounded-full"-->
  <!--              src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"-->
  <!--              alt="Michael Gough">{{ asd.user.email }}</p>-->
  <!--          <p class="text-sm text-gray-600 dark:text-gray-400">-->
  <!--            <time pubdate datetime="2022-02-08"-->
  <!--                  title="February 8th, 2022">Feb. 8, 2022-->
  <!--            </time>-->
  <!--          </p>-->
  <!--        </div>-->

  <!--      </footer>-->
  <!--      <p class="text-gray-500 dark:text-gray-400">-->
  <!--        {{ comment.comment }}-->
  <!--        <button v-if="this.roleId === 3" type="button" @click="deleteComment(comment.id)"  style="color: red;border: none; margin-right: 15px">-->
  <!--          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"-->
  <!--               class="bi bi-trash" viewBox="0 0 16 16">-->
  <!--            <path-->
  <!--                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>-->
  <!--            <path-->
  <!--                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>-->
  <!--          </svg>-->
  <!--        </button>-->

  <!--      </p>-->
  <!--      <div class="flex items-center mt-4 space-x-4">-->
  <!--        <button type="button"-->
  <!--                class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">-->
  <!--          <svg class="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"-->
  <!--               viewBox="0 0 20 18">-->
  <!--            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"-->
  <!--                  d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>-->
  <!--          </svg>-->
  <!--          <button @click="comment.inputVisible = !comment.inputVisible">-->

  <!--            Reply-->

  <!--          </button>-->
  <!--        </button>-->
  <!--        <form action="">-->
  <!--          <input name="reply" style="border-bottom: 2px solid black;border-radius: 2px" v-if="comment.inputVisible"-->
  <!--                 v-model="comment.reply"/>-->
  <!--          <button type="button" @click="sendReply(comment.reply, comment.id)">-->
  <!--            send-->
  <!--          </button>-->
  <!--        </form>-->
  <!--        <p style="color: red" v-if="err.reply">{{ err.reply }}</p>-->

  <!--      </div>-->
  <!--      <article v-for="(repli, key) in comment.replies" :key="key"-->
  <!--               class="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">-->
  <!--        <p class="text-gray-500 dark:text-gray-400">{{ repli.reply }}-->
  <!--          <button v-if="this.roleId === 3" type="button" @click="deleteCommentReply(repli.id)"  style="color: red;border: none; margin-right: 15px">-->
  <!--          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"-->
  <!--               class="bi bi-trash" viewBox="0 0 16 16">-->
  <!--            <path-->
  <!--                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>-->
  <!--            <path-->
  <!--                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>-->
  <!--          </svg>-->
  <!--        </button>-->
  <!--        </p>-->

  <!--        <div class="flex items-center mt-4 space-x-4">-->
  <!--          <button type="button"-->
  <!--                  class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">-->
  <!--            <svg class="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"-->
  <!--                 viewBox="0 0 20 18">-->
  <!--              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"-->
  <!--                    d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>-->
  <!--            </svg>-->
  <!--            Reply-->
  <!--          </button>-->
  <!--        </div>-->
  <!--      </article>-->
  <!--    </article>-->
  <!--  </div>-->
  <!--  <div>-->
  <!--    <div>-->

  <!--    </div>-->
  <!--  </div>-->
</template>

<style scoped>

</style>