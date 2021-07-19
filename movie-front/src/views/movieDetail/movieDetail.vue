<template>
  <el-container class="movie-detail">
    <el-main>
          <el-page-header @back="goBack" style=" width: 1200px;margin: 0 auto;margin-bottom:10px;" content="detail"> </el-page-header>
      <el-card class="movie-detail-card">
        <div slot="header" class="clearfix">
          <h3 style="text-align: left">{{ movie.Title }}</h3>
        </div>
        <el-container>
          <el-aside style="width: 50%">
            <div>
              <img :src="movie.Poster" />
            </div>
          </el-aside>
          <el-main style="width: 50%">
            <ul class="movie-info">
              <li>
                Year: <span>{{ movie.Year }}</span>
              </li>
              <li>
                Rated:
                <span>{{ movie.Rated }}</span>
              </li>
              <li>
                Released: <span>{{ movie.Released }}</span>
              </li>
              <li>
                Runtime: <span>{{ movie.Runtime }}</span>
              </li>
              <li>
                Director: <a class="person">{{ movie.Director }}</a>
              </li>
              <li>
                Writer:<a
                  class="person"
                  v-for="(writer, index) in getArray(movie.Writer)"
                  :key="index"
                  >{{ writer }}</a
                >
              </li>
              <li>
                Actors:
                <a
                  class="person"
                  v-for="(actor, index) in getArray(movie.Actors)"
                  :key="index"
                  >{{ actor }}</a
                >
              </li>
              <li>
                Language: <span>{{ movie.Language }}</span>
              </li>
              <li>
                Country: <span>{{ movie.Country }}</span>
              </li>
            </ul>
          </el-main>
        </el-container>
        <el-divider></el-divider>
        <div>
          <h3 style="text-align: left">Plot</h3>
          <el-divider></el-divider>
          <div>
            <p style="text-align: left">{{ movie.Plot }}</p>
          </div>
        </div>
      </el-card>
    </el-main>
    <el-footer style="margin-top: 50px">
      <el-main>
        <el-card class="movie-detail-card">
          <movie-evaluation
            :evaluationList="evaluationList"
            :type="1"
          ></movie-evaluation>
        </el-card>
      </el-main>
    </el-footer>
  </el-container>
</template>

<script>
import Qs from "qs";
import movieEvaluation from "./components/movieEvaluation";

export default {
  name: "movieDetail",
  props: {},
  components: {
    "movie-evaluation": movieEvaluation,
  },
  data() {
    return {
      movieId: this.$route.query.movieId,
      movie: {},
      evaluationList: [],
    };
  },
  created() {
    this.getMovieDetail();
    this.getEvaluation();
  },
  methods: {
    getMovieDetail() {
      var that = this;
      //   var data = Qs.stringify({
      //     movieId: this.movieId,
      //   });
      that
        .axios({
          method: "get",
          url: "/api/movies/movie?movieId=" + this.movieId,
        })
        .then((response) => {
          console.log(response);
          this.movie = response.data.data[0];
        });
    },
    getEvaluation() {
      var that = this;
      var data = Qs.stringify({
        movieId: this.movieId,
      });
      that
        .axios({
          method: "post",
          url: "/api/movie/evaluation",
          data: data,
        })
        .then((response) => {
          console.log(response);
          this.evaluationList = response.data.data;
        });
    },
    getArray(data) {
      if (data) {
        let arrayData = data.split(",");
        return arrayData;
      }
    },
    goBack(){
          this.$router.go(-1);
    }
  },
};
</script>

<style>
.movie-detail .el-main {
  width: 100%;
  /* margin:0 auto; */
}
.movie-detail-card {
  width: 1200px;
  margin: 0 auto;
}
.movie-info li {
  text-align: left;
  margin-bottom: 30px;
}
.person:hover {
  color: deepskyblue;
}
</style>