<template>
  <div class="movie-card" @click="intoDetail(movie._id)">
    <el-card :body-style="{ padding: '0px' }">
      <img :src="movie.Poster" class="image" />
      <div style="padding: 14px">
        <span>{{ movie.Title }}</span>
        <el-rate
          v-model="rate"
          disabled
          text-color="#ff9900"
        >
        </el-rate>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      default: {},
      type: Object,
    },
  },
  computed: {
    rate(){
      return parseFloat(this.movie.imdbRating/2)
    }
  },
  methods: {
    intoDetail(id) {
      this.$router.push({
        path: "/movieDetail",
        query: {
          movieId: id,
        },
      });
    },
  },
};
</script>

<style scoped>
.movie-card {
  height: 400px;
  width:250px;
  /* margin-right: 30px; */
}
.movie-card .image {
  height: 300px;
  width:250px;
  display: block;
}
</style>