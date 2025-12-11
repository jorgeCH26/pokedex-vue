import { inject } from "vue";
import type { Store } from "../../../domain/store/store";

export const useAuthLoginAxios = () => {
  const store = inject<Store>("store");

  if (!store) {
    throw new Error(
      "Store no encontrado. Asegúrate de proporcionar el store en el componente padre."
    );
  }

  const { isLoading, login, isLoggedIn, loginError, logout, user, createUser } =
    store.authStore;

  return {
    isLoading,
    login,
    isLoggedIn,
    loginError,
    logout,
    user,
    createUser,
  };
};
