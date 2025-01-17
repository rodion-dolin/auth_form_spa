  <template>
    <div>
      <h1>{{ t('reset_password') }}</h1>
      <AlertMessage :message="alertMessage" />
      <form @submit.prevent="resetPassword" class="input-form">
        <input type="email" v-model="email" :placeholder="t('email')" class="input-field" />
        <button type="submit" class="input-button">{{ t('reset_password_button') }}</button>
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
  const alertMessage = ref('');

  function resetPassword() {
    if (email.value) {
      router.push('/');
    } else {
      alertMessage.value = t('required_field');
      // @TODO Поискать как можно рефакторить исчезновение уведомлений
      setTimeout(() => {
        alertMessage.value = '';
      }, 3000);
    }
  }
  </script>
