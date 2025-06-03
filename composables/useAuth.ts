interface User {
  id: string;
  name: string;
  email: string;
}

export const useAuth = () => {
  const user = useState<User | null>("user", () => null);

  const setToken = (token: string) => {
    if (process.client) {
      localStorage.setItem("token", token);
    }
  };

  const getToken = () => {
    if (process.client) {
      return localStorage.getItem("token");
    }
    return null;
  };

  const setUser = (userData: User) => {
    if (process.client) {
      localStorage.setItem("user", JSON.stringify(userData));
    }
    user.value = userData;
  };

  const fetchUser = async () => {
    if (!process.client) return;

    const token = getToken();
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      user.value = null;
      return;
    }

    try {
      user.value = JSON.parse(storedUser);
    } catch (error) {
      console.error("Failed to parse stored user:", error);
      user.value = null;
    }
  };

  const logout = () => {
    if (process.client) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    user.value = null;
    navigateTo("/login");
  };

  return { user, setToken, getToken, fetchUser, logout, setUser };
};
