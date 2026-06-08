<script setup lang="ts">
import { 
  LayoutDashboard, 
  Trophy, 
  User, 
  Users, 
  Target, 
  Award, 
  LogOut,
  ChevronRight,
  Crown,
  BookOpen,
  Sliders,
  Building2,
  Compass,
  ShieldCheck,
  Settings,
  Database,
  Activity,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-vue-next';
import logo from '~/src/assets/logo-app.png';

const { isPremium } = useTheme();
const { role, user, logout } = useUser();
const isCollapsed = useState('sidebar_collapsed');

const userName = computed(() => user.value?.name || 'Usuario');
const userTitle = computed(() => {
  if (role.value === 'admin') return 'Administrador';
  if (role.value === 'employer') return 'Empresa Socia';
  return 'Estudiante UPeU';
});

const studentMenu = [
  { path: '/estudiante/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/estudiante/networking', label: 'Networking', icon: Users },
  { path: '/estudiante/challenges', label: 'Retos', icon: Target },
  { path: '/estudiante/ranking', label: 'Ranking', icon: Trophy },
  { path: '/estudiante/badges', label: 'Mis Sellos', icon: Award },
  { path: '/estudiante/profile', label: 'Mi Perfil', icon: User },
];

const employerMenu = [
  { path: '/empresa/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/empresa/talents', label: 'Talentos', icon: Users },
  { path: '/empresa/challenges', label: 'Desafíos', icon: BookOpen },
  { path: '/empresa/evaluations', label: 'Evaluaciones', icon: Sliders },
  { path: '/empresa/company', label: 'Empresa', icon: Building2 },
  { path: '/empresa/networking', label: 'Networking', icon: Compass },
];

const adminMenu = [
  { path: '/admin/dashboard', label: 'Global Dashboard', icon: LayoutDashboard },
  { path: '/admin/users', label: 'Gestión Usuarios', icon: Users },
  { path: '/admin/roles', label: 'Gestión de Roles', icon: ShieldCheck },
  { path: '/admin/institutions', label: 'Instituciones', icon: Building2 },
  { path: '/admin/badges-config', label: 'Config. Sellos', icon: Award },
  { path: '/admin/audit', label: 'Auditoría', icon: Activity },
  { path: '/admin/settings', label: 'Sistema', icon: Settings },
];

const menuItems = computed(() => {
  if (role.value === 'admin') return adminMenu;
  return role.value === 'employer' ? employerMenu : studentMenu;
});

const portalLabel = computed(() => {
  if (role.value === 'admin') return 'PANEL ADMINISTRATIVO';
  return role.value === 'employer' ? 'PORTAL CORPORATIVO' : 'PORTAL ESTUDIANTIL';
});
</script>

<template>
  <aside 
    :class="[
      'border-r border-slate-200 flex flex-col h-full bg-white transition-all duration-300 ease-in-out z-20',
      isCollapsed ? 'w-20' : 'w-64'
    ]"
  >
    <!-- Header del Sidebar con Logo y Toggle -->
    <div :class="['transition-all duration-300 relative', isCollapsed ? 'p-4 flex flex-col items-center' : 'p-8']">
      <div class="flex items-center justify-between w-full">
        <img 
          :src="logo" 
          alt="Certian Logo" 
          :class="['object-contain transition-all duration-300', isCollapsed ? 'h-10' : 'h-16']" 
        />
        <button 
          v-if="!isCollapsed"
          @click="isCollapsed = true"
          class="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-900"
          title="Colapsar"
        >
          <PanelLeftClose :size="18" />
        </button>
      </div>
      
      <button 
        v-if="isCollapsed"
        @click="isCollapsed = false"
        class="mt-4 p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-900"
        title="Expandir"
      >
        <PanelLeftOpen :size="18" />
      </button>

      <p v-if="!isCollapsed" class="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-4 truncate">{{ portalLabel }}</p>
    </div>

    <nav :class="['flex-1 space-y-1', isCollapsed ? 'px-2' : 'px-4']">
      <p v-if="!isCollapsed" class="section-label px-4 mt-4">Gestión</p>
      <NuxtLink
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center rounded-lg transition-all duration-300 group text-slate-500 hover:text-slate-900 hover:bg-slate-50 relative"
        :class="[
          isCollapsed ? 'justify-center py-4 px-0' : 'justify-between px-4 py-3'
        ]"
        active-class="brand-bg text-white brand-shadow !text-white"
      >
        <div class="flex items-center gap-3">
          <component :is="item.icon" :size="20" class="transition-transform group-hover:scale-110 shrink-0" />
          <span v-if="!isCollapsed" class="text-sm font-semibold truncate">{{ item.label }}</span>
        </div>
        <ChevronRight v-if="!isCollapsed" :size="14" class="opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <!-- Tooltip for collapsed state -->
        <div v-if="isCollapsed" class="absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-30 shadow-xl">
          {{ item.label }}
        </div>
      </NuxtLink>
    </nav>

    <div :class="['mt-auto transition-all duration-300', isCollapsed ? 'p-2' : 'p-6']">
      <div 
        :class="[
          'border border-slate-100 rounded-xl bg-slate-50 transition-all hover:border-brand-light group cursor-pointer relative overflow-hidden flex items-center',
          isCollapsed ? 'p-2 justify-center' : 'p-4 gap-3'
        ]"
      >
        <div v-if="isPremium && role === 'student' && !isCollapsed" class="absolute top-0 right-0 p-1">
          <Crown :size="12" class="text-blue-900 fill-blue-900" />
        </div>
        
        <div class="w-10 h-10 rounded-full brand-bg flex items-center justify-center font-bold text-white brand-shadow shrink-0">
          {{ userName.split(' ').map(n => n[0]).join('') }}
        </div>
        
        <div v-if="!isCollapsed" class="overflow-hidden">
          <div class="flex items-center gap-1">
            <p class="text-sm font-bold text-slate-900 truncate">{{ userName }}</p>
            <span v-if="isPremium && role === 'student'" class="text-[8px] bg-blue-900 text-white px-1 rounded font-black">PRO</span>
          </div>
          <p class="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{{ userTitle }}</p>
        </div>
      </div>

      <button 
        @click="logout"
        class="w-full flex items-center transition-colors font-bold uppercase tracking-wider text-[11px] group"
        :class="[
          isCollapsed ? 'justify-center mt-4' : 'justify-start gap-2 text-slate-400 hover:text-red-600 mt-6 px-4'
        ]"
      >
        <LogOut :size="16" :class="isCollapsed ? 'text-slate-400 group-hover:text-red-600' : ''" />
        <span v-if="!isCollapsed">Cerrar Sesión</span>
      </button>
    </div>
  </aside>
</template>

<style scoped>
/* NuxtLink active class is handled via active-class prop above */
</style>
