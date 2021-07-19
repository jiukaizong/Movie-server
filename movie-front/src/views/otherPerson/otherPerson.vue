<template>
  <el-container style="width: 1200px; margin: 0 auto">
    <el-header style="margin-top: 20px">
      <h2 style="text-align: left">{{ name }}</h2>
      <el-divider></el-divider>
    </el-header>
    <el-main>
      <el-timeline>
        <el-timeline-item
          v-for="(movie, index) in movieList"
          :key="index"
          :timestamp="movie.Year"
          placement="top"
        >
          <el-card >
            <h3 style="text-align: left; margin-bottom: 15px" @click="intoDetail(movie._id)">
              {{ movie.Title }}
            </h3>
            <el-row style="text-align: left" >
              <el-col :span="3">
                <el-avatar
                  shape="square"
                  :size="100"
                  fit="fill"
                  :src="movie.Poster"
                ></el-avatar>
              </el-col>
              <el-col :span="20">
                <el-row style="margin-bottom: 10px">
                  <div style="float: left">
                    <span>Year:{{ movie.Year }}</span>
                  </div>
                  <div style="float: right">
                    <el-rate
                      :value="rate(movie.imdbRating)"
                      disabled
                      text-color="#ff9900"
                    ></el-rate>
                  </div>
                </el-row>
                <el-row style="margin-bottom: 10px">
                  <el-col :span="5">
                    <span>Language: {{ movie.Language }}</span>
                  </el-col>
                  <el-col :span="5">
                    <span>Country: {{ movie.Country }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>Released: {{ movie.Released }}</span>
                  </el-col>
                </el-row>
                <el-row style="margin-bottom: 10px">
                  <el-col>
                    <span>Plot:{{ movie.Plot }}</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "otherName",
  data() {
    return {
      name: this.$route.query.name,
      // userId: localStorage.getItem(userId),
      movieList: [],
    };
  },
  created() {
    this.getMovieList();
  },
  methods: {
    rate(data) {
      return parseFloat(data / 2);
    },
    intoDetail(id) {
      this.$router.push({
        path: "/movieDetail",
        query: {
          movieId: id,
        },
      });
    },
    getMovieList() {
      var that = this;
      // var data = Qs.stringify({
      //   name: name,
      // });
      that
        .axios({
          method: "get",
          url: "/api/people?name=" + this.name,
        })
        .then((response) => {
          console.log(response);
          this.movieList = response.data.data;
        });
    },
  },
};
</script>

<style>
.el-avatar img {
  width: 100%;
}
.el-timeline-item__timestamp.is-top {
  text-align: left;
  font-size: 16px;
}
</style>