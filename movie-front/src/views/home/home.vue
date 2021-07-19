<template>
  <el-container class="movie-home">
    <el-main>
      <div>
        <el-row>
          <el-col
            :span="4"
            v-for="(movie, index) in movieList"
            :key="index"
            class="card"
          >
            <movie-card :movie="movie"></movie-card>
          </el-col>
        </el-row>
      </div>
      <el-pagination
        @current-change="getMovieList"
        :current-page.sync="page"
        :page-size="rows"
        layout="total, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </el-main>
  </el-container>
</template>

<script>
import Qs from "qs";
import movieCard from "./components/movieCard";

export default {
  name: "home",
  components: {
    "movie-card": movieCard,
  },
  data() {
    return {
      movieList: [],
      total: 0,
      page: 1,
      rows: 15,
    };
  },
  created() {
    this.getMovieList();
  },
  methods: {
    getMovieList() {
      var that = this;
      var data = Qs.stringify({
        page: this.page,
        rows: this.rows,
      });
      that
        .axios({
          method: "get",
          url: "/api/movies/all",
          data: data,
        })
        .then((response) => {
          this.movieList = response.data.movieList;
          this.total = response.data.total;
        });
    },
  },
};
</script>

<style scoped>
.movie-home .card {
  margin-left: 100px;
}
</style>