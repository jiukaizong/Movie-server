<template>
  <el-card class="register-user">
    <div slot="header" class="clearfix">
      <span>Register</span>
    </div>
    <div>
      <el-form
        :model="account"
        status-icon
        :rules="rules"
        ref="account"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="account" prop="username">
          <el-input v-model="account.username"></el-input>
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input
            type="password"
            v-model="account.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="check Password" prop="checkPass">
          <el-input
            type="password"
            v-model="account.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button type="primary" @click="submitForm('account')"
            >sumbit</el-button
          >
          <el-button @click="resetForm('account')">reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import Qs from "qs";

export default {
  name: "register",
  data() {
    var checkuserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("The user account cannot be empty"));
      } else if (value == this.existAccount) {
        callback(new Error("The acoount had been existed"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password"));
      } else {
        if (this.account.checkPass !== "") {
          this.$refs.account.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password again"));
      } else if (value !== this.account.password) {
        callback(new Error("Entered passwords differ!"));
      } else {
        callback();
      }
    };
    return {
      account: {
        username: "",
        password: "",
        checkPass: "",
        name: "",
      },
      existAccount: "",
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        username: [{ validator: checkuserName, trigger: "blur" }],
      },
    };
  },
  watch: {
    "account.account": function (val) {
      this.check();
    },
  },
  methods: {
    submitForm(formName) {
      var that = this;
      var data = Qs.stringify(this.account);
      that
        .axios({
          method: "post",
          url: "/api/register",
          data: data,
        })
        .then((response) => {
          console.log(response);
          this.$router.push("/home");
        });
    },
    check() {
      var that = this;
      var data = Qs.stringify({ account: this.account.account });
      that
        .axios({
          method: "post",
          url: "/api/checkUsername",
          data: data,
        })
        .then((response) => {
          if (resopnse.data.status == 400) {
            this.existAccount = this.account.username;
          } else {
          }
        });
    },
  },
};
</script>

<style scoped>
.register-user {
  width: 600px;
  margin: 0 auto;
  margin-top: 35px;
  margin-bottom: 20px;
}
</style>