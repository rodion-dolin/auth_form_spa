<template>
  <div>
    <h1>{{ t('welcome') }}</h1>
    <h2>{{ t('login') }}</h2>
    <p>{{ t('enter_credentials') }}</p>
    <form @submit.prevent="login" class="input-form" novalidate>
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
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const store = useStore();
const { t } = useI18n();
const email = ref('');
const password = ref('');
const showPassword = ref(false);

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

function login() {
  if (email.value && password.value) {
    router.push('/success');
  } else {
    store.dispatch('triggerNotification', {
      message: t('login_error'),
      type: 'error'
    });
  }
}
</script>

<style scoped>
  .link {
    display: block;
    color: #42b983;
    text-decoration: none;
    cursor: pointer;
    font-size: 14px;
  }

  .link:hover {
    text-decoration: underline;
  }

  .password-block {
    position: relative;
    width: 250px;
  }

  .password-input {
    width: 100%;
    padding-right: 40px;
  }

  .password-toggle {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    color: #42b983;
    padding: 0;
  }

  .password-toggle:focus {
    outline: none;
  }
</style>
