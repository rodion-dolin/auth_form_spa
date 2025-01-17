<template>
  <div>
    <h1>{{ t('welcome') }}</h1>
    <h2>{{ t('login') }}</h2>
    <p>{{ t('enter_credentials') }}</p>
    <AlertMessage :message="alertMessage" />
    <form @submit.prevent="login" class="input-form">
      <input type="email" v-model="email" :placeholder="t('email')" class="input-field" />
      <router-link to="/reset-password" class="link">{{ t('forgot_password') }}</router-link>
      <div class="password-block">
        <input :type="showPassword ? 'text' : 'password'" v-model="password" :placeholder="t('password')" class="input-field password-input" />
        <button type="button" @click="togglePasswordVisibility" class="password-toggle">
          {{ showPassword ? t('hide_password') : t('show_password') }}
        </button>
      </div>
      <button type="submit" class="input-button">{{ t('login_button') }}</button>
      <router-link to="/register" class="link">{{ t('create_account') }}</router-link>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import AlertMessage from '../components/AlertMessage.vue';

const router = useRouter();
const { t } = useI18n();
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const alertMessage = ref('');

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

function login() {
  if (email.value && password.value) {
    router.push('/success');
  } else {
    alertMessage.value = t('login_error');
    // @TODO Поискать как можно рефакторить исчезновение уведомлений
    setTimeout(() => {
      alertMessage.value = '';
    }, 3000);
  }
}
</script>
