export const useTheme = () => {
  const isPremium = useState<boolean>('premium_theme', () => {
    // We can't access localStorage during SSR, so we handle it in onMounted if needed
    // or use a cookie for persistence across SSR.
    return false;
  });

  const togglePremium = () => {
    isPremium.value = !isPremium.value;
    if (process.client) {
      localStorage.setItem('premium_theme', isPremium.value.toString());
      if (isPremium.value) {
        document.body.classList.add('premium-theme');
      } else {
        document.body.classList.remove('premium-theme');
      }
    }
  };

  // Sync with localStorage on client side initialization
  onMounted(() => {
    const saved = localStorage.getItem('premium_theme');
    if (saved === 'true') {
      isPremium.value = true;
      document.body.classList.add('premium-theme');
    }
  });

  return {
    isPremium,
    togglePremium
  };
};
