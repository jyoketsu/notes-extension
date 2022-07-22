<template>
  <div class="login">
    <i class="icon" />
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-position="top"
      class="login-form"
    >
      <el-form-item prop="mobile" label-width="auto">
        <el-input
          v-model="ruleForm.mobile"
          placeholder="请输入手机号"
          size="large"
        >
          <template #prepend>
            <el-select
              v-model="ruleForm.mobileArea"
              placeholder="Select"
              style="width: 115px"
            >
              <el-option
                v-for="code in codes"
                :label="code.zh"
                :value="code.code"
              />
            </el-select>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password" label-width="auto" size="large">
        <el-input
          v-model="ruleForm.password"
          type="password"
          placeholder="请输入密码"
          show-password
        />
      </el-form-item>
      <el-button
        class="submit"
        type="primary"
        size="large"
        @click="submitForm(ruleFormRef)"
        >登录</el-button
      >
      <!-- <el-button type="text" @click="handleRegister">注册</el-button> -->
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import codes from "./code.json";
import { useStore } from "./store";

const store = useStore();
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  mobileArea: 86,
  mobile: "",
  password: "",
});

const rules = reactive<FormRules>({
  name: [{ required: true, message: "请输入手机号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      store.dispatch("auth/login", {
        mobileArea: `+${ruleForm.mobileArea}`,
        mobile: ruleForm.mobile,
        password: ruleForm.password,
      });
    }
  });
};

// const handleRegister = () => {
//   window.open("https://picks.working.cn", "_blank");
// };
</script>
<style scoped>
.icon {
  width: 120px;
  height: 120px;
  background-image: url(/icons/logo.svg);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top;
  margin-bottom: 25px;
}
.login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 25px;
  box-sizing: border-box;
}
.submit {
  width: 100%;
  margin: 15px 0;
}
.login-form {
  width: 100%;
}
</style>
