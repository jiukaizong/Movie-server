<template>
  <div class="login-wrap">
    <div class="ms-login">
      <el-form
        :model="param"
        :rules="rules"
        ref="login"
        label-width="0px"
        class="ms-content"
      >
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="username">
            <el-button slot="prepend" icon="el-icon-user"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            v-model="param.password"
            @click="submitForm()"
          >
            <el-button slot="prepend" icon="el-icon-unlock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">Login</el-button>
        </div>
        <p class="login-tips"></p>
      </el-form>
    </div>
  </div>
</template>

<script>
import Qs from "qs";

export default {
  name: "login",
  created() {
    if (!sessionStorage.getItem("username")) {
      this.$message({
        type: "warning",
        message: "Login account",
      });
      this.$router.push("/home");
    }
  },
  data: function () {
    return {
      param: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "Please input userName", trigger: "blur" },
        ],
        password: [
          { required: true, message: "Please input password", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.login.validate((valid) => {
        if (valid) {
          var that = this;
          var data = Qs.stringify({
            username: this.param.username,
            password: this.param.password,
          });
          that
            .axios({
              method: "post",
              url: "/api/login",
              data: data,
            })
            .then((response) => {
              console.log(response);
              if (response.data.status == 200) {
                this.$message({
                  type: "success",
                  message: "successful",
                });

                sessionStorage.setItem("username", this.param.username);
                sessionStorage.setItem("userId", response.data.data._id);
                sessionStorage.setItem("state", response.data.data.state);
                sessionStorage.setItem("token", true);
                this.$router.push("/home");
              } else {
                this.$message({
                  type: "warning",
                  message: "login failed",
                });
              }
            });
        } else {
          this.$message.error("please input userName and password");
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.login-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/login/login-bg.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>