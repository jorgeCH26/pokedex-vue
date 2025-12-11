import { ref, provide, type InjectionKey } from "vue";
import type { AuthState } from "./pokemom.auth.state";
import type {
  RequestUserPayload,
  UserAuthData,
} from "../../interface/api/auth-rest.interface";
import { createUserServices, loginServices } from "../../api/auth-services";

export const AuthKey = Symbol() as InjectionKey<AuthState>;

const LOCAL_STORAGE_KEY = "pokemon-auth";

export const provideAuthStore = (): AuthState => {
  const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  const parsedData = savedData ? JSON.parse(savedData) : null;

  const user = ref<UserAuthData | null>(parsedData?.user || null);
  const isLoggedIn = ref<boolean>(parsedData?.isLoggedIn || false);
  const isLoading = ref(false);
  const loginError = ref<string | null>(null);

  const saveToLocalStorage = () => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        user: user.value,
        isLoggedIn: isLoggedIn.value,
      })
    );
  };

  const clearLocalStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const login = async (email: string, password: string) => {
    isLoading.value = true;
    loginError.value = null;

    try {
      const userData = await loginServices(email, password);
      user.value = userData;
      isLoggedIn.value = true;
      saveToLocalStorage();
    } catch (err) {
      loginError.value = "Credenciales incorrectas";
      isLoggedIn.value = false;
      user.value = null;
      clearLocalStorage();
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
    isLoggedIn.value = false;
    clearLocalStorage();
  };

  const createUser = async (payload: RequestUserPayload) => {
    isLoading.value = true;
    loginError.value = null;

    try {
      const userData = await createUserServices(payload);
      user.value = userData;
      isLoggedIn.value = true;
      saveToLocalStorage();
    } catch (err) {
      isLoggedIn.value = false;
      user.value = null;
      clearLocalStorage();
    } finally {
      isLoading.value = false;
    }
  };

  const store: AuthState = {
    user,
    isLoggedIn,
    isLoading,
    loginError,
    login,
    logout,
    createUser,
  };

  provide(AuthKey, store);

  return store;
};
