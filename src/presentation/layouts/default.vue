<script setup lang="ts">
import { PanelLeftClose, PanelLeftOpen, Bell, Search, Settings } from 'lucide-vue-next';

const { fetchMe, isAuthenticated } = useUser();
const isSidebarCollapsed = useState('sidebar_collapsed', () => false);

onMounted(() => {
  if (isAuthenticated.value) {
    fetchMe();
  } else {
    navigateTo('/login');
  }
});
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-white text-slate-900">
    <Sidebar />
    
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Barra de Navegación Superior -->
      <header class="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 lg:px-8 shrink-0 z-10">
        <div class="flex items-center gap-4">
          <!-- Buscador sutil -->
          <div class="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl w-64 text-slate-400 focus-within:border-brand-light focus-within:bg-white transition-all group">
            <Search :size="16" class="group-focus-within:text-brand" />
            <input type="text" placeholder="Buscar..." class="bg-transparent border-none text-xs outline-none w-full text-slate-700" />
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button class="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors relative">
            <Bell :size="20" />
            <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button class="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
            <Settings :size="20" />
          </button>
        </div>
      </header>

      <!-- Área de Contenido -->
      <main class="flex-1 overflow-y-auto bg-slate-50 p-6 lg:p-10">
        <div
          v-motion
          :initial="{ opacity: 0, y: 10 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 400, ease: 'easeOut' } }"
        >
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
