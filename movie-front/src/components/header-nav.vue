<template>
  <div id="header">
    <el-row>
      <el-col :span="6">
        <h3 style="font-size: 27px; margin-left: 20px">Movie Database</h3>
      </el-col>
      <el-col :span="8">
        <ul class="nav-list">
          <li>
            <router-link tag="a" to="/home">Home</router-link>
          </li>
          <li>
            <a href="javascript:;">About</a>
          </li>
          <li>
            <a href="javascript:;">Contact</a>
          </li>
        </ul>
      </el-col>
      <el-col :span="5">
        <el-input
          placeholder="Please enter content"
          v-model="searchModel"
          @keyup.enter.native="searchResult()"
          class="input-with-select"
        >
          <el-select
            v-model="select"
            slot="prepend"
            placeholder="please choose"
          >
            <el-option label="Title" value="1"></el-option>
            <el-option label="Year" value="2"></el-option>
            <el-option label="Rate" value="3"></el-option>
            <el-option label="Person" value="4"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <ul class="login" v-if="!token">
          <li>
            <router-link to="/register" tag="a">Register</router-link>
          </li>
          <li>
            <router-link to="/login" tag="a">Login</router-link>
          </li>
        </ul>
        <ul class="login" v-else>
          <li>
            <router-link to="/person">Center</router-link>
          </li>
          <li>
            <a @click="loginOut">LoginOut</a>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      token: sessionStorage.getItem("token"),
      userName: sessionStorage.getItem("username"),
      searchModel: "",
      select: "1",
    };
  },
  methods: {
    loginOut() {
      sessionStorage.setItem("token", false);
      console.log(sessionStorage.getItem("token"));
      this.token = false;
      this.$router.push({
        path: "/home",
      });
      this.$message({
        type: "success",
        message: "Login Out Successful!",
      });
    },
    searchResult() {
      this.$router.push({
        path: "/search",
        query: {
          search: this.searchModel,
          type: this.select,
        },
      });
      this.searchModel = "";
    },
  },
};
</script>

<style >
#header {
  height: 100px;
  background-color: #000;
  font-size: 20px;
  line-height: 100px;
}
.nav-aside {
  /* box-sizing: border-box; */
  float: right;
  /* margin-top: 38px; */
  border-left: 1px solid rgba(255, 255, 255, 0.2);
}
.nav-aside > li {
  position: relative;
  float: left;
}
.nav-aside > li > a {
  font-size: 0;
}
.nav-list li {
  float: left;
  margin-right: 25px;
}
.login {
  float: right;
}
.login li {
  float: left;
  margin-right: 15px;
}
.input-with-select .el-select {
  width: 90px;
}
</style>