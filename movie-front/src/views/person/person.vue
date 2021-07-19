<template>
  <el-container style="width: 1200px; margin: 0 auto">
    <el-header style="margin-top: 20px">
      <h2 style="text-align: left">{{ username }}</h2>
      <a style="float: right" @click="add = true">add movie</a>
      <el-divider></el-divider>
    </el-header>
    <el-main>
      <div>
        <el-radio-group v-model="state" @change="changeState">
          <el-radio :label="0">common</el-radio>
          <el-radio :label="1">contribution</el-radio>
        </el-radio-group>
      </div>
      <el-divider></el-divider>
      <div style="float: left">
        <ul>
          <li><h3>watchList</h3></li>
          <li v-for="(p, index) in watchList" :key="index">{{ p }}/li></li>
        </ul>
      </div>
      <div style="float: left; margin-left: 50px">
        <ul>
          <li><h3>trackList</h3></li>
          <li v-for="(p, index) in trackList" :key="index">{{ p }}/li></li>
        </ul>
      </div>
    </el-main>
    <el-dialog
      title="add new movie"
      :visible.sync="add"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="newMovie"
        status-icon
        :rules="rules"
        ref="newMovie"
        label-width="100px"
      >
        <el-form-item label="Title" prop="Title">
          <el-input v-model="newMovie.pass"></el-input>
        </el-form-item>
        <el-form-item label="Actor" prop="Actor">
          <el-input v-model="newMovie.Actor"></el-input>
        </el-form-item>
        <el-form-item label="Wirter" prop="Wirter">
          <el-input v-model="newMovie.Wirter"></el-input>
        </el-form-item>
        <el-form-item label="Director" prop="Director">
          <el-input v-model="newMovie.Director"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="add = false">cancel </el-button>
        <el-button type="primary" @click="sumbit()">confirm </el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: "person",
  data() {
    return {
      username: sessionStorage.getItem("username"),
      state: sessionStorage.getItem("state"),
      watchList: [],
      trackList: [],
      add: false,
      newMovie: {
        Title: "",
        Actor: "",
        Wirter: "",
        Director: "",
      },
      rules: {
        Title: [
          {
            required: true,
            message: "Title can not be empty",
            trigger: "blur",
          },
        ],
        Actor: [
          {
            required: true,
            message: "Actor can not be empty",
            trigger: "blur",
          },
        ],
        Wirter: [
          {
            required: true,
            message: "Wirter can not be empty",
            trigger: "blur",
          },
        ],
        Director: [
          {
            required: true,
            message: "Director can not be empty",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    getWatchList() {
      var that = this;
      var data = Qs.stringify({
        movieId: this.movieId,
      });
      that
        .axios({
          method: "get",
          url: "/api/people/watch?username=" + username,
        })
        .then((response) => {
          console.log(response);
          this.watchList = response.data.data;
        });
    },
    getTrackList() {
      var that = this;
      var data = Qs.stringify({
        personId: this.movieId,
      });
      that
        .axios({
          method: "get",
          url: "/api/people/track?username=" + username,
        })
        .then((response) => {
          console.log(response);
          this.trackList = response.data.data;
        });
    },
    changeState() {
      var that = this;
      var data = Qs.stringify({
        username: this.username,
      });
      that
        .axios({
          method: "post",
          url: "/api/status",
        })
        .then((response) => {
          console.log(response);
          if (response.data.status == 200) {
            this.$message({
              type: "success",
              message: "successful",
            });
            sessionStorage.setItem("state", this.state);
          }
        });
    },
    handleClose(done) {
      this.$confirm("Confirm the shut down？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    sumbit() {
      this.$refs['newMovie'].validate((valid) => {
        if (valid) {
          var that = this;
          var data = Qs.stringify({
            newMovie: this.newMovie,
          });
          that
            .axios({
              method: "post",
              url: "/api/addMovie",
            })
            .then((response) => {
              console.log(response);
              if (response.data.status == 200) {
                this.$message({
                  type: "success",
                  message: "successful",
                });
                sessionStorage.setItem("state", this.state);
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
</style>