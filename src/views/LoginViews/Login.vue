<template>
  <el-container>
    <Disclaimer v-if="showDisclaimerForm" @closeDisclaimer="closeDisclaimer" />
    <LoginForm
      v-else-if="showLoginForm"
      @showDisclaimer="showDisclaimer"
      @showResetPassword="showResetPassword"
    />
    <ResetPasswordForm v-else @backToLogin="backToLogin" />
  </el-container>
</template>

<script setup>
import { ref, watchEffect, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useLogin } from "@/hooks/login/";
import Disclaimer from "@/views/LoginViews/Disclaimer.vue";
import LoginForm from "@/views/LoginViews/LoginForm.vue";
import ResetPasswordForm from "@/views/LoginViews/ResetPasswordForm.vue";

const router = useRouter();

const showLoginForm = ref(true);
const showDisclaimerForm = ref(false);

const { isLoggedIn, LoginState } = useLogin();

// 显示免责声明表单
const showDisclaimer = () => {
  showLoginForm.value = false;
  showDisclaimerForm.value = true;
};

// 关闭免责声明表单
const closeDisclaimer = () => {
  showLoginForm.value = true;
  showDisclaimerForm.value = false;
};

// 显示重置密码表单
const showResetPassword = () => {
  showLoginForm.value = false;
  showDisclaimerForm.value = false;
};

// 返回登录表单
const backToLogin = () => {
  showLoginForm.value = true;
  showDisclaimerForm.value = false;
};

// 路由跳转
const goToDashboard = () => {
  router.push("/dashboard");
};

// 监听登录状态变化，自动跳转
watchEffect(() => {
  if (isLoggedIn.value) {
    goToDashboard();
  }
});

// 页面加载完成后检查 token 和 userData
onMounted(async () => {
  const loginState = await LoginState();
  if (loginState) {
    goToDashboard();
  }
});
</script>

<style scoped>
.el-container {
  max-width: 500px;
  max-height: 100vh;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5px;
  margin: 0 auto;
}
</style>