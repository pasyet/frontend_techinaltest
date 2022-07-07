<template>
    <!-- <div class="col-md-4 col-lg-4 col-xl-4">
    <div class="card mb-2 bg-gradient-dark">
      <img class="card-img-top" :src="movie.imgUrl" :alt="movie.title" />
      <div class="card-img-overlay d-flex flex-column justify-content-end">
        <h5 class="card-title text-white font-weight-bolder">{{ movie.title }}</h5>
        <p class="card-text text-white pb-2 pt-1">{{ movie.Genre.name }}</p>
        <router-link :to="`/detail/${movie.id}`">See More</router-link>
      </div>
    </div>
  </div> -->
  <div>
    <h1>Test</h1>
  </div>
</template>

<script>
export default {
  name: 'checklistPage',
  props:["checklist"],
  data () {
      return {
        id : 0
      }
  },
  computed: {
    username(){
      return this.$store.state.username
    }
  },
  methods:{
  },
  created() {
  }
}
</script>

<style>
</style>