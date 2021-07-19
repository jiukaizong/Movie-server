<template>
  <el-container class="movie-home">
    <el-header style="margin-top: 10px">
      <h3 style="text-align: left；">
        keyWord:<span>{{ search }}</span>
      </h3>
    </el-header>
    <el-main>
      <div v-if="type == 4" style="margin-bottom: 20px">
        <el-row>
          <el-col
            :span="3"
            :offset="1"
            v-for="(person, index) in personList"
            :key="index"
            style="margin-bottom: 20px"
          >
            <a class="movie-person" @click="intoOtherPerson(person.name)">{{
              person.name
            }}</a>
          </el-col>
        </el-row>
      </div>
      <div v-else>
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
        layout="total, prev, pager, next"
        :page-size="rows"
        :total="total"
      >
      </el-pagination>
    </el-main>
  </el-container>
</template>

<script>
import Qs from "qs";
import movieCard from "../home/components/movieCard";

export default {
  name: "home",
  components: {
    "movie-card": movieCard,
  },
  data() {
    return {
      movieList: [],
      personList: [],
      type: this.$route.query.type,
      search: this.$route.query.search,
      total: 0,
      page: 1,
      rows: 50,
    };
  },
  created() {
    this.getMovieList();
  },
  methods: {
    getMovieList() {
      var that = this;
      var data = Qs.stringify({
        type: this.type,
        keyword: this.search,
        page: this.page,
        rows: this.rows,
      });
      if (this.type == 4) {
        that
          .axios({
            method: "post",
            url: "/api/searchPerson",
            data: data,
          })
          .then((response) => {
            console.log(response);
            this.personList = response.data.personList;
            this.total = response.data.total;
          });
      } else {
        that
          .axios({
            method: "post",
            url: "/api/search",
            data: data,
          })
          .then((response) => {
            console.log(response);
            this.movieList = response.data.movieList;
            this.total = response.data.total;
          });
      }
    },
    intoOtherPerson(data) {
      this.$router.push({
        path: "/otherPerson",
        query: {
          name: data,
        },
      });
    },
  },
};
</script>

<style scoped>
.movie-home .card {
  margin-left: 100px;
}
.movie-person:hover {
  color: #0084ff;
}
</style>