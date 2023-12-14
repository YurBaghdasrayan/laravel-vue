<script>
export default {
  name: "SubscriptionComponent"
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
<!--            You will be charged ${{ number_format($plan->price, 2) }} for {{ $plan->name }} Plan-->
          </div>
          <div class="card-body">
            <form id="payment-form" action="" method="POST">
              <input type="hidden" name="plan" id="plan" value="">
              <div class="row">
                <div class="col-xl-4 col-lg-4">
                  <div class="form-group">
                    <label for="">Name</label>
                    <input type="text" name="name" id="card-holder-name" class="form-control" value="" placeholder="Name on the card">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-4 col-lg-4">
                  <div class="form-group">
                    <label for="">Card details</label>
                    <div id="card-element"></div>
                  </div>
                </div>
                <div class="col-xl-12 col-lg-12">
                  <hr>
                  <button type="submit" class="btn btn-primary" id="card-button" data-secret="">Purchase</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>