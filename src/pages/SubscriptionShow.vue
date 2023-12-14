<script>
export default {
  name: "SubscriptionShow"

}
</script>

<template>
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
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>