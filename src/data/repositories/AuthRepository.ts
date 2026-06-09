import type { User, UserRole, AuthResponse } from '~/core/entities/User';

export const useAuthRepository = () => {
  const config = useRuntimeConfig();
  const apiUrl = config.public.apiUrl;

  const roleMap: Record<string, UserRole> = {
    'ESTUDIANTE': 'student',
    'EMPRESA': 'employer',
    'ADMIN': 'admin'
  };

  const login = async (credentials: any): Promise<AuthResponse> => {
    try {
      const response: any = await $fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        body: credentials
      });

      const data = response.data || response;

      if (data && data.token) {
        const mappedRole = roleMap[data.user.role];
        return {
          success: true,
          token: data.token,
          user: { ...data.user, role: mappedRole },
          role: mappedRole
        };
      }
      return { success: false, message: response.message || 'Error en el login' };
    } catch (error: any) {
      return { success: false, message: error.data?.message || 'Error de conexión' };
    }
  };

  const getMe = async (token: string): Promise<AuthResponse> => {
    try {
      const response: any = await $fetch(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = response.data;
      const mappedRole = roleMap[data.role];

      return {
        success: true,
        user: { ...data, role: mappedRole },
        role: mappedRole
      };
    } catch (error: any) {
      return { success: false, message: error.data?.message || 'Error al obtener datos' };
    }
  };

  const register = async (userData: any): Promise<AuthResponse> => {
    try {
      const response: any = await $fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        body: userData
      });
      return { success: true, user: response.data };
    } catch (error: any) {
      return { success: false, message: error.data?.message || 'Error en el registro' };
    }
  };

  return {
    login,
    getMe,
    register
  };
};
