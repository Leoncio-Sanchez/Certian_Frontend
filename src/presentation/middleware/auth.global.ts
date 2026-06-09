export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated, role } = useUser();

  // If user is not authenticated and trying to access anything other than login/register
  if (!isAuthenticated.value && !['/login', '/register', '/'].includes(to.path)) {
    return navigateTo('/login');
  }

  // Basic role-based protection
  if (to.path.startsWith('/admin') && role.value !== 'admin') {
    return navigateTo('/');
  }
  if (to.path.startsWith('/empresa') && role.value !== 'employer') {
    return navigateTo('/');
  }
  if (to.path.startsWith('/estudiante') && role.value !== 'student') {
    return navigateTo('/');
  }
});
