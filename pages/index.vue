<script setup lang="ts">
// In Nuxt, we can use definePageMeta to set up redirects or layouts
definePageMeta({
  middleware: [
    function (to, from) {
      if (to.path === '/') {
        return navigateTo('/login')
      }
    },
  ],
})
</script>

<template>
  <div>Redirecting...</div>
</template>
