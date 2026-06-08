export const useUser = () => {
  const token = useCookie('auth-token');
  const user = useState<any>('user-data', () => null);
  const role = useState<'student' | 'employer' | 'admin' | null>('user-role', () => null);
  
  const config = useRuntimeConfig();

  const isAuthenticated = computed(() => !!token.value);

  const login = async (credentials: any) => {
    const fullUrl = `${config.public.apiUrl}/auth/login`;
    console.log('Intentando login en:', fullUrl);
    
    try {
      const response: any = await $fetch(fullUrl, {
        method: 'POST',
        body: credentials
      });

      console.log('Login response:', response);

      // Handle both direct response and wrapped response
      const loginData = response.data || response;

      if (loginData && loginData.token) {
        token.value = loginData.token;
        user.value = loginData.user;

        // Map backend role to frontend role
        const roleMap: any = {
          'ESTUDIANTE': 'student',
          'EMPRESA': 'employer',
          'ADMIN': 'admin'
        };
        role.value = roleMap[loginData.user.role];
        return { success: true, role: roleMap[loginData.user.role] };
      }
      return { success: false, message: response.message || 'Respuesta inválida del servidor' };
    } catch (err: any) {
      console.error('Login error:', err);
      return { success: false, message: err.data?.message || 'Error al iniciar sesión' };
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    role.value = null;
    navigateTo('/login');
  };

  const fetchMe = async () => {
    if (!token.value) return;
    try {
      const response: any = await $fetch(`${config.public.apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token.value}` }
      });
      user.value = response.data;
      const roleMap: any = {
        'ESTUDIANTE': 'student',
        'EMPRESA': 'employer',
        'ADMIN': 'admin'
      };
      role.value = roleMap[response.data.role];
    } catch (err) {
      logout();
    }
  };

  const register = async (userData: any) => {
    try {
      const response: any = await $fetch(`${config.public.apiUrl}/auth/register`, {
        method: 'POST',
        body: userData
      });

      return { success: true, data: response.data };
    } catch (err: any) {
      return { success: false, message: err.data?.message || 'Error al registrarse' };
    }
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