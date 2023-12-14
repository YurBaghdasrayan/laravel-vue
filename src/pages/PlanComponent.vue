<script>
import axios from "axios";
// import router from "@/router";

export default {
  name: "PlanComponent",
  data() {
    return {
      data: []
    }
  },


  mounted() {
    this.fetchUserData()
    this.fetchData()
  },
  methods: {
    fetchUserData() {
      let data = localStorage.getItem('myObject')
      this.roleId = JSON.parse(data).role_id;
    },
    fetchData() {
      let Token = localStorage.getItem('myObject')
      let token = JSON.parse(Token).token;

      axios.get('http://127.0.0.1:8000/api/plans', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
          .then(({data}) => {
            this.data = data;

            console.log(data)
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    },

    addSubscription(slug) {
      let Token = localStorage.getItem('myObject')
      let token = JSON.parse(Token).token;

      axios.get(`http://127.0.0.1:8000/api/plans/${slug}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
          .then(({data}) => {
            // router.push({name:'subscription.show',params:data})
            console.log(data)
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    },
    mounted() {
    },
    methods: {
      async submitPayment() {
        const stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY');
        const elements = stripe.elements();
        const cardElement = elements.create('card');

        // Create a token with the card information
        const { token, error } = await stripe.createToken(cardElement);

        if (error) {
          // Display errors to the user
          console.error(error.message);
        } else {
          // Send the token to your server
          this.sendTokenToServer(token.id);
        }
      },
      sendTokenToServer(token) {
        // Make an HTTP request to your server, passing the token
        // Example using Axios
        axios.post('/your-server-endpoint', { token })
            .then(response => {
              // Handle the server response as needed
            })
            .catch(error => {
              // Handle errors
              console.error(error);
            });
      }
    }
  };

},
}
</script>

<template>

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
          <div v-for="(subscribe, key) in data" :key="key" :subscribe="subscribe" class="bg-[#FFFBEC] rounded-xl">
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
                      @click="addSubscription(subscribe.slug)"
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

  <div>
    <div class="bg-white my-4 shadow p-8 rounded-lg">
      <div class="flex items-center mb-4">
        <div class="border-2 border-blue px-3 py-2 rounded-full font-bold text-blue mr-2">1</div>
        <h2 class="text-lg">Your Payment Information</h2>
      </div>
      <form action="">
        <div class="w-full">
          <label for="payment" class="block text-sm mb-2">Credit Card</label>
          <div class="flex">
            <input name="name" type="text" id="payment"
                   class="w-5/6 flex-1 text-sm bg-grey-light text-grey-darkest rounded-l p-3 focus:outline-none"
                   placeholder="name">
            <input type="text" id="payment"
                   class="w-5/6 flex-1 text-sm bg-grey-light text-grey-darkest rounded-l p-3 focus:outline-none"
                   placeholder="Card Number">
            <input type="text" id="payment"
                   class="w-1/6 inline-block text-sm bg-grey-light text-grey-darkest p-3 focus:outline-none"
                   placeholder="MM / YY">
            <input type="text" id="payment"
                   class="w-1/6 inline-block text-sm bg-grey-light text-grey-darkest rounded-r p-3 focus:outline-none"
                   placeholder="CVC">
          </div>
        </div>
        <button type="button" @click="sendCard()"></button>
      </form>
    </div>
  </div>

</template>

<style scoped>

</style>