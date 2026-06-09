import type { AuthResponse } from '~/core/entities/User';

export const useLoginUseCase = () => {
  const authRepo = useAuthRepository();

  const execute = async (credentials: any): Promise<AuthResponse> => {
    return await authRepo.login(credentials);
  };

  return {
    execute
  };
};
