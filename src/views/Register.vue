<template>
  <div>
    <h1>{{ t('welcome') }}</h1>
    <h2>{{ t('register') }}</h2>
    <p>{{ t('fill_registration') }}</p>
    <form @submit.prevent="register" class="input-form" novalidate>
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
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const store = useStore();
const { t } = useI18n();
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
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
    store.dispatch('triggerNotification', {
      message: t('required_field'),
      type: 'error'
    });
  } else if (errors.value.email) {
    store.dispatch('triggerNotification',  {
      message: t('invalid_email'),
      type: 'error'
    });
  } else if (errors.value.password) {
    store.dispatch('triggerNotification',  {
      message: t('invalid_password'),
      type: 'error'
    });
  } else if (errors.value.confirmPassword) {
    store.dispatch('triggerNotification', {
      message: t('password_mismatch'),
      type: 'error'
    });
  } else {
    store.dispatch('triggerNotification', {
      message: t('register_successful')
    });
    router.push('/');
  }
}
</script>
