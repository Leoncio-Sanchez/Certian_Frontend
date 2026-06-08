<script setup lang="ts">
import { 
  Users, 
  Building2, 
  Award, 
  Activity, 
  ShieldCheck, 
  TrendingUp, 
  AlertTriangle,
  ArrowUpRight,
  Database,
  Lock
} from 'lucide-vue-next';

const config = useRuntimeConfig();
const { token, user } = useUser();

const { data: dashboardData, pending } = await useFetch(`${config.public.apiUrl}/admin/dashboard`, {
  headers: { Authorization: `Bearer ${token.value}` }
});

const stats = computed(() => {
  const d = dashboardData.value?.data;
  return [
    { label: 'Total Usuarios', value: d?.totalUsers || 0, change: 'Total', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Estudiantes', value: d?.totalEstudiantes || 0, change: 'Alumnos', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Empresas Socias', value: d?.totalEmpresas || 0, change: 'Partners', icon: Building2, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Retos Activos', value: d?.totalChallenges || 0, change: 'Publicados', icon: Award, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];
});

const { data: auditLogs } = await useFetch(`${config.public.apiUrl}/admin/audit-logs`, {
  headers: { Authorization: `Bearer ${token.value}` }
});

const recentLogs = computed(() => auditLogs.value?.data?.slice(0, 5) || []);
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="relative overflow-hidden rounded-3xl bg-slate-900 p-8 md:p-10 shadow-2xl border border-slate-800">
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
      
      <div class="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div v-if="!pending">
          <span class="inline-flex items-center gap-1.5 text-[10px] font-black text-white bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest">
            <Lock class="w-3 h-3 text-amber-400" />
            System Control Center
          </span>
          <h1 class="text-3xl md:text-4xl font-black text-white mt-4 tracking-tight">
            Hola, <span class="text-indigo-400">{{ user?.name }}</span>
          </h1>
          <p class="text-slate-400 text-sm mt-2 max-w-xl font-medium">
            Métricas globales y control operativo de toda la infraestructura de Certian.
          </p>
        </div>
        
        <div class="flex gap-3">
          <button class="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold border border-white/10 transition-all flex items-center gap-2">
            <Database class="w-4 h-4" />
            Backup DB
          </button>
          <button class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2">
            <ShieldCheck class="w-4 h-4" />
            Seguridad
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div v-if="!pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="s in stats" :key="s.label" class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div :class="`p-3 rounded-2xl ${s.bg}`">
            <component :is="s.icon" :class="`w-6 h-6 ${s.color}`" />
          </div>
          <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{{ s.change }}</span>
        </div>
        <div class="mt-4">
          <p class="text-2xl font-black text-slate-900 tracking-tight">{{ s.value }}</p>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{{ s.label }}</p>
        </div>
      </div>
    </div>

    <div v-if="!pending" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Activity Feed -->
      <div class="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
        <div class="flex items-center justify-between mb-8">
          <h3 class="text-lg font-black text-slate-900 flex items-center gap-2">
            <Activity class="w-5 h-5 text-indigo-600" />
            Audit Logs (Recientes)
          </h3>
          <button @click="navigateTo('/admin/audit')" class="text-xs font-bold text-indigo-600 hover:underline uppercase tracking-widest">Ver Todo</button>
        </div>

        <div class="space-y-6">
          <div v-for="log in recentLogs" :key="log.id" class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:border-indigo-200 transition-all cursor-default">
            <div class="flex items-center gap-4">
              <div class="w-2 h-2 rounded-full bg-blue-500"></div>
              <div>
                <p class="text-sm font-bold text-slate-900">{{ log.action }}</p>
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{{ log.user?.name || 'Sistema' }} ({{ log.resource }})</p>
              </div>
            </div>
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ new Date(log.createdAt).toLocaleString() }}</span>
          </div>
        </div>
      </div>

      <!-- Health Status -->
      <div class="space-y-6">
        <div class="bg-indigo-900 rounded-3xl p-8 text-white relative overflow-hidden group">
          <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <h4 class="text-lg font-black relative z-10">Estado del Nodo</h4>
          <div class="mt-6 flex items-center gap-4 relative z-10">
            <div class="flex-1">
              <p class="text-xs text-indigo-300 font-bold uppercase tracking-widest mb-2">Blockchain</p>
              <p class="text-xl font-black">Sincronizado</p>
            </div>
            <div class="p-3 bg-indigo-500/20 rounded-2xl border border-indigo-400/20">
              <TrendingUp class="w-6 h-6 text-indigo-300" />
            </div>
          </div>
          <div class="mt-8 pt-8 border-t border-indigo-800 relative z-10">
            <div class="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-indigo-400">
              <span>Carga del Servidor</span>
              <span>12%</span>
            </div>
            <div class="mt-3 w-full h-1.5 bg-indigo-950 rounded-full overflow-hidden">
              <div class="w-[12%] h-full bg-indigo-400 rounded-full"></div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <h4 class="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-6">
            <AlertTriangle class="w-4 h-4 text-amber-500" />
            Alertas del Sistema
          </h4>
          <div class="space-y-4">
            <div class="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-3">
              <AlertTriangle class="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p class="text-xs font-bold text-amber-900 leading-tight">Certificado SSL expira en 4 días.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
