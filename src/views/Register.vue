<template>
  <div>
    <h1>{{ t('welcome') }}</h1>
    <h2>{{ t('register') }}</h2>
    <p>{{ t('fill_registration') }}</p>
    <AlertMessage :message="alertMessage" />
    <form @submit.prevent="register" class="input-form">
      <input
        type="text"
        v-model="name"
        :placeholder="t('fullname')"
        :class="{'input-field': true, 'input-error': errors.name}"
      />
      <input
        type="email"
        v-model="email"
        :placeholder="t('email')"
        :class="{'input-field': true, 'input-error': errors.email}"
      />
      <input
        type="password"
        v-model="password"
        :placeholder="t('password')"
        :class="{'input-field': true, 'input-error': errors.password}"
      />
      <input
        type="password"
        v-model="confirmPassword"
        :placeholder="t('confirm_password')"
        :class="{'input-field': true, 'input-error': errors.confirmPassword}"
      />
      <button type="submit" class="input-button">{{ t('register_button') }}</button>
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
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const alertMessage = ref('');
const errors = ref({
  name: false,
  email: false,
  password: false,
  confirmPassword: false
});

function validateName(value) {
  return value && value.length > 0;
}

function validateEmail(value) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(value);
}

function validatePassword(value) {
  const passwordPattern = /^[A-Z\d]{8,}$/;
  return passwordPattern.test(value);
}

function validateConfirmPassword(value1, value2) {
  return value1 === value2;
}

function register() {
  // @TODO Поискать как можно оптимизировать валидацию
  errors.value = {
    name: !validateName(name.value),
    email: !validateEmail(email.value),
    password: !validatePassword(password.value),
    confirmPassword: !validateConfirmPassword(password.value, confirmPassword.value)
  };

  if (errors.value.name) {
    alertMessage.value = t('required_field');
  } else if (errors.value.email) {
    alertMessage.value = t('invalid_email');
  } else if (errors.value.password) {
    alertMessage.value = t('invalid_password');
  } else if (errors.value.confirmPassword) {
    alertMessage.value = t('password_mismatch');
  } else {
    router.push('/');
    return;
  }
  // @TODO Поискать как можно рефакторить исчезновение уведомлений
  setTimeout(() => {
    alertMessage.value = '';
  }, 3000);
}
</script>
