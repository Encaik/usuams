<template>
  <a-row class="bg" type="flex" justify="center" align="middle">
    <a-col :span="8"></a-col>
    <a-col :span="5">
      <a-row>
        <a-col :span="24">
          <div align="center">
            <img src="../assets/light.png" style="height:120px;" alt="logo" />
          </div>
          <h1 style="margin:20px 0;text-align:center">
            高校学生会事务管理系统
          </h1>
          <a-form
            id="components-form-demo-normal-login"
            :form="form"
            class="login-form"
            @submit="handleSubmit"
          >
            <a-form-item>
              <a-input
                v-decorator="[
                  'username',
                  {
                    rules: [{ required: true, message: '请输入用户名' }]
                  }
                ]"
                placeholder="用户名"
              >
                <a-icon
                  slot="prefix"
                  type="user"
                  style="color: rgba(0,0,0,.25)"
                />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                v-decorator="[
                  'password',
                  {
                    rules: [{ required: true, message: '请输入密码' }]
                  }
                ]"
                type="password"
                placeholder="密码"
              >
                <a-icon
                  slot="prefix"
                  type="lock"
                  style="color: rgba(0,0,0,.25)"
                />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-checkbox
                v-decorator="[
                  'remember',
                  {
                    valuePropName: 'checked',
                    initialValue: true
                  }
                ]"
              >
                记住我
              </a-checkbox>
              <!-- <a class="login-form-forgot" href="">
            忘记密码
          </a> -->
              <a-button
                type="primary"
                html-type="submit"
                class="login-form-button"
              >
                登录
              </a-button>
              或
              <a>
                <router-link :to="{ path: '/sign' }">
                  加入学生会！
                </router-link>
              </a>
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>

<script>
import admin from "@/router/admin";
import teacher from "@/router/teacher";
import presidium from "@/router/presidium";
import minister from "@/router/minister";
import secretary from "@/router/secretary";
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "login" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let data = {
            username: values.username,
            password: this.$md5(values.password)
          };
          this.$http.post("login", data).then(res => {
            console.log(res);
            if (res.code === 0) {
              this.$message.success(res.msg);
              sessionStorage.setItem("type", res.type);
              sessionStorage.setItem("Authorization", res.Authorization);
              this.$store.commit("setLoginInfo", {
                username: values.username,
                uid: res.uid,
                type: res.type,
                depa: res.depa
              });
              switch (res.type) {
                case 1:
                  this.$router.addRoutes(admin);
                  this.$router.push("/home");
                  break;
                case 2:
                  this.$router.addRoutes(teacher);
                  this.$router.push("/home");
                  break;
                case 3:
                  this.$router.addRoutes(presidium);
                  this.$router.push("/home");
                  break;
                case 4:
                  this.$router.addRoutes(minister);
                  this.$router.push("/home");
                  break;
                case 5:
                  this.$router.addRoutes(secretary);
                  this.$router.push("/home");
                  break;
              }
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
.bg {
  background-image: url("../assets/login.png");
  background-attachment: fixed;
  height: 100%;
  background-size: 100% 100%;
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
