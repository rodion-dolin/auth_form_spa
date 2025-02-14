import { createStore } from 'vuex';

let notificationTimeout = null;

const store = createStore({
  state: {
    notificationMessage: '',
    notificationType: 'success',
  },
  mutations: {
    SET_NOTIFICATION(state, { message, type }) {
      state.notificationMessage = message;
      state.notificationType = type || 'success';
    },
    CLEAR_NOTIFICATION(state) {
      state.notificationMessage = '';
      state.notificationType = 'success';
    },
  },
  actions: {
    triggerNotification({ commit }, { message, type = 'success' }) {
      // Если есть активный таймер, очищаем его
      if (notificationTimeout) {
        clearTimeout(notificationTimeout);
        notificationTimeout = null;
      }

      commit('SET_NOTIFICATION', { message, type });

      notificationTimeout = setTimeout(() => {
        commit('CLEAR_NOTIFICATION');
        notificationTimeout = null; // Сбрасываем ссылку на таймер
      }, 10000);
    },
  },
});

export default store;
