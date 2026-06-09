import type { User, UserRole } from '~/core/entities/User';

export const useUser = () => {
  const token = useCookie('auth-token');
  const user = useState<User | null>('user-data', () => null);
  const role = useState<UserRole | null>('user-role', () => null);
  
  const loginUseCase = useLoginUseCase();
  const authRepo = useAuthRepository(); // Still used for logout/getMe or create usecases for them

  const isAuthenticated = computed(() => !!token.value);

  const login = async (credentials: any) => {
    const result = await loginUseCase.execute(credentials);

    if (result.success && result.token) {
      token.value = result.token;
      user.value = result.user || null;
      role.value = result.role || null;
    }
    return result;
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    role.value = null;
    navigateTo('/login');
  };

  const fetchMe = async () => {
    if (!token.value) return;
    const result = await authRepo.getMe(token.value);
    
    if (result.success) {
      user.value = result.user || null;
      role.value = result.role || null;
    } else {
      logout();
    }
  };

  const register = async (userData: any) => {
    return await authRepo.register(userData);
  };

  return {
    token,
    user,
    role,
    isAuthenticated,
    login,
    register,
    logout,
    fetchMe
  };
};
