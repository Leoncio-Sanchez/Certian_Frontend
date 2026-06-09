export const useAdminRepository = () => {
  const config = useRuntimeConfig();
  const apiUrl = config.public.apiUrl;

  const getDashboardStats = async (token: string) => {
    try {
      const response: any = await $fetch(`${apiUrl}/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      return null;
    }
  };

  const getAuditLogs = async (token: string) => {
    try {
      const response: any = await $fetch(`${apiUrl}/admin/audit-logs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      return [];
    }
  };

  return {
    getDashboardStats,
    getAuditLogs
  };
};
