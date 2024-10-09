import { defineStore } from "pinia";
import { ref, computed, onMounted } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);

  // Check if this is running on the client (browser)
  onMounted(() => {
    if (process.client && localStorage.getItem("app_user")) {
      user.value = localStorage.getItem("app_user");
    }
  });

  const getUser = computed(() => user.value);

  const setUser = (name) => {
    user.value = name;
    // Save the user to localStorage if on the client side
    if (process.client) {
      localStorage.setItem("app_user", name);
    }
  };

  return {
    user,
    setUser,
    getUser,
  };
});
