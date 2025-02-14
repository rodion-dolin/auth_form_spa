<template>
  <div>
    <h1>{{ t('reset_password') }}</h1>
    <form @submit.prevent="resetPassword" class="input-form" novalidate>
      <input type="email" v-model="email" :placeholder="t('email')" class="input-field" />
      <button type="submit" class="input-button">{{ t('reset_password_button') }}</button>
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

function resetPassword() {
  if (email.value) {
    store.dispatch('triggerNotification', {
      message: t('reset_password_successful')
    });
    router.push('/');
  } else {
    store.dispatch('triggerNotification', {
      message: t('required_field'),
      type: 'success'
    });
  }
}
</script>
