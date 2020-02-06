<template>
  <div class="login-container">
    <div class="login-card">
      <!-- 头像 -->
      <div class="kuang">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 登陆表单 -->
      <el-form
        label-width="0px"
        class="login_form"
        :model="loginform"
        :rules="loginformrules"
        ref="loginformref"
      >
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-bussiness-man" v-model="loginform.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-password"
            v-model="loginform.password"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="validloginform">登陆</el-button>
          <el-button type="info" @click="resetform">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginform: {
        username: "admin",
        password: "123456"
      },
      loginformrules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    resetform() {
      this.$refs.loginformref.resetFields();
    },
    validloginform() {
      this.$refs.loginformref.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post("login", this.loginform);
        if (res.meta.status !== 200) return this.$message.error("错误");
        this.$message.success("成功");
        window.sessionStorage.setItem('token',res.data.token)
        this.$router.push('/home')
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  background-color: #2b4b6b;
  height: 100%;
  .login-card {
    background-color: #fff;
    width: 450px;
    height: 300px;
    border-radius: 6px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .kuang {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      padding: 10px;
      background-color: #fff;
      border: 1px solid #eee;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);

      img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  .btns {
    display: flex;
    justify-content: flex-end;
  }
}
</style>