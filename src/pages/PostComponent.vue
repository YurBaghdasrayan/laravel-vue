<script>

import axios from "axios";
import validation from "@/mixins/validation";
import router from "../router";
import Swal from "sweetalert2";

export default {
  name: "PostComponent",
  data() {
    return {
      err: {},
      Token: null,
      roleId: null,
      data: [],
      form: {
        name: '',
        description: '',
        image: [],
      },
      rules: {
        name: {required: true,},
        description: {required: true,},
      }
    }
  },
  mounted() {
    this.fetchUserData()
    this.fetchSubscriptionData()
  },

  methods: {
    fetchSubscriptionData() {

      let Token = localStorage.getItem('myObject')
      let token = JSON.parse(Token).token;

      axios.get('http://127.0.0.1:8000/api/subscription', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }).then(({data}) => {
        console.log(data.data)
        this.data = data;

      }).catch(error => {
        console.error('Error fetching data:', error);
      });
    },
    handleFileChange() {
      this.images = this.$refs.fileInput.files;
    },
    fetchUserData() {
      let data = localStorage.getItem('myObject')
      this.roleId = JSON.parse(data).role_id;
    },

    addSubscription(id, name, description, price) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't to buy this subscriptions!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!"
      }).then((result) => {
        if (result.isConfirmed) {
          let Token = localStorage.getItem('myObject')
          let token = JSON.parse(Token).token;

          const postData = {
            id: id,
            name: name,
            description: description,
            price: price,
          };

          axios.post('http://127.0.0.1:8000/api/subscription', postData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`,
            },
          })
              .then(({data}) => {
                Swal.fire({
                  position: "top",
                  icon: "success",
                  title: "you have successfully purchased a subscription",
                  showConfirmButton: false,
                  timer: 1500
                });
                console.log(data)
              }).catch(error => {
            console.error('Error fetching data:', error);
          });
        }
      });
    },

    submitForm() {
      const formData = new FormData();

      for (let i = 0; i < this.images.length; i++) {
        formData.append('images[]', this.images[i]);
      }

      let validated = this.validation(this.rules, this.form);

      if (Object.keys(validated).length) {
        console.log(validated)
        this.err = validated;
        return
      }
      formData.append('name', this.form.name);
      formData.append('description', this.form.description);

      let Token = localStorage.getItem('myObject')
      let token = JSON.parse(Token).token;


      axios.post('http://127.0.0.1:8000/api/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      })
          .then(response => {

            if (this.roleId === 3) {
              router.push({name: 'moderator.home'})
            }
            if (this.roleId === 2) {
              router.push({'name': 'admin.home'})
            }
            if (this.roleId === 1) {
              router.push({'name': 'home'})
            }

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
  <!--  <pre>{{data}}</pre>-->
  <div class="flex items-center justify-center flex-col bg-[#E5E5E5] min-h-screen">
    <!-- main card -->
    <div class="bg-[#F4F5FA] p-10 rounded-xl">
      <!-- headers content-->
      <div class="flex flex-col justify-center items-center text-center">
        <div class="max-w-sm font-bold font-sans">
          <div class="max-w-sm font-bold font-sans">
            Get the most out of your mobile with the right subscription
          </div>
          <div class="font-light max-w-lg mt-5 text-sm">
            All devices come with free delivery or pickup as standard. See information on available shopping
            options for your location.
          </div>
        </div>
        <div
            class="flex flex-col md:flex-row space-x-0 md:space-x-8 space-y-12  md:space-y-0 justify-center items-center mt-10">
          <div v-for="(subscribe, key) in data.data" :key="key" :subscribe="subscribe" class="bg-[#FFFBEC] rounded-xl">
            <div class="flex flex-col p-8 rounded-xl bg-white shadow-xl translate-x-4 translate-y-4 w-96 md:w-auto">
              <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Ice_logo.svg/138px-Ice_logo.svg.png?20191213230535"
                  class="w-8">
              <div class="mt-3 font-semibold text-lg">{{ subscribe.name }}</div>
              <div class="text-sm font-light">{{ subscribe.description }}</div>
              <div class="my-4">
                <span class="font-bold text-base">{{ subscribe.price }}</span>
                <span class="font-light text-sm">{{ created_at }}</span>
              </div>

              <button type="button"
                      @click="addSubscription(subscribe.id,subscribe.name,subscribe.description,subscribe.price)"
                      class="bg-[#F4F5FA] px-4 py-3 rounded-full  border border-[#F0F0F6] shadow-xl mt-4">
                Add subscription
              </button>
            </div>
          </div>
        </div>
        <div class="flex justify-center">
          <button class="mt-12 bg-slate-900 text-white px-4 rounded-full py-3">See all subscriptions</button>
        </div>
      </div>
    </div>
  </div>


  <!--  <form action="">-->
  <!--    <div class="heading text-center font-bold text-2xl m-5 text-gray-800">New Post</div>-->
  <!--    <div class="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">-->
  <!--      <input name="name" v-model="form.name" class="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"-->
  <!--             spellcheck="false" placeholder="Title" type="text">-->
  <!--      <p style="color: red" v-if="err.name">{{ err.name }}</p>-->

  <!--      <textarea v-model="form.description" name="description"-->
  <!--                class="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" spellcheck="false"-->
  <!--                placeholder="Describe everything about this post here"></textarea>-->
  <!--      <p style="color: red" v-if="err.description">{{ err.description }}</p>-->

  <!--      <label for="image">Image:</label>-->
  <!--      <input @change="handleFileChange" name="images[]" ref="fileInput"  multiple accept="image/*" type="file" id="image"/>-->
  <!--      <div style="margin-top: 10px" class="buttons flex">-->
  <!--        <button @click="submitForm" type="button"-->
  <!--                class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">-->
  <!--          Post-->
  <!--        </button>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </form>-->
</template>

<style scoped>

</style>