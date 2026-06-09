<script setup lang="ts">
import { 
  Users, 
  Clock, 
  TrendingUp, 
  FileCheck, 
  ChevronRight, 
  ArrowUpRight,
  Zap,
  Crown,
  Activity,
  BarChart3,
  ShieldCheck,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-vue-next';

const config = useRuntimeConfig();
const { token, user } = useUser();
const isCollapsed = useState('sidebar_collapsed');

const { data: dashboardData, pending } = await useFetch(`${config.public.apiUrl}/companies/dashboard`, {
  headers: { Authorization: `Bearer ${token.value}` }
});

const stats = computed(() => dashboardData.value?.data);

// Distribution chart categories (mocked for now as backend doesn't provide this yet)
const distributionData = [
  { label: "Software Engineering", percentage: 42, count: 59, color: "bg-[#245DFF]" },
  { label: "Systems & Cloud", percentage: 28, count: 40, color: "bg-[#071437]" },
  { label: "Data Science & AI", percentage: 18, count: 25, color: "bg-purple-500" },
  { label: "Agro-Tech & Quality", percentage: 12, count: 18, color: "bg-emerald-500" },
];
</script>

<template>
  <div class="space-y-8 animate-fade-in" id="dashboard-view">
    
    <!-- Header Section - Minimalista y Directo -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-black text-slate-900 tracking-tight">
          Panel de <span class="text-[#245DFF]">Control</span>
        </h1>
      </div>
    </div>

    <!-- KPI Grid -->
    <div v-if="!pending" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- KPI 1 -->
      <div class="group p-6 bg-white rounded-3xl shadow-sm border border-slate-200 hover:border-[#245DFF]/30 hover:shadow-xl hover:shadow-[#245DFF]/5 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
        <div class="absolute top-0 left-0 w-1.5 h-full bg-emerald-500 rounded-l-3xl"></div>
        <div class="flex justify-between items-start pl-2">
          <div class="p-3 bg-emerald-50 rounded-2xl group-hover:scale-110 transition-transform">
            <Users class="w-6 h-6 text-emerald-600" />
          </div>
          <span class="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{{ stats?.totalSubmissions }} Postulaciones</span>
        </div>
        <div class="mt-4 pl-2">
          <p class="text-3xl font-black text-slate-900 tracking-tight">{{ stats?.totalSubmissions }}</p>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Candidatos Totales</p>
        </div>
      </div>

      <!-- KPI 2 -->
      <div class="group p-6 bg-white rounded-3xl shadow-sm border border-slate-200 hover:border-[#245DFF]/30 hover:shadow-xl hover:shadow-[#245DFF]/5 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
        <div class="absolute top-0 left-0 w-1.5 h-full bg-[#245DFF] rounded-l-3xl"></div>
        <div class="flex justify-between items-start pl-2">
          <div class="p-3 bg-blue-50 rounded-2xl group-hover:scale-110 transition-transform">
            <Activity class="w-6 h-6 text-[#245DFF]" />
          </div>
          <span class="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{{ stats?.totalChallenges }} Retos Activos</span>
        </div>
        <div class="mt-4 pl-2">
          <p class="text-3xl font-black text-slate-900 tracking-tight">{{ stats?.totalChallenges }}</p>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Desafíos Publicados</p>
        </div>
      </div>

      <!-- KPI 3 -->
      <div class="group p-6 bg-white rounded-3xl shadow-sm border border-slate-200 hover:border-[#245DFF]/30 hover:shadow-xl hover:shadow-[#245DFF]/5 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
        <div class="absolute top-0 left-0 w-1.5 h-full bg-purple-500 rounded-l-3xl"></div>
        <div class="flex justify-between items-start pl-2">
          <div class="p-3 bg-purple-50 rounded-2xl group-hover:scale-110 transition-transform">
            <ShieldCheck class="w-6 h-6 text-purple-600" />
          </div>
          <span class="inline-flex items-center gap-1 text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">Calificación Pendiente</span>
        </div>
        <div class="mt-4 pl-2">
          <p class="text-3xl font-black text-slate-900 tracking-tight">{{ stats?.pendingSubmissions }}</p>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Por Calificar</p>
        </div>
      </div>
    </div>

    <!-- Content Grid -->
    <div v-if="!pending" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- Distribution Chart Section -->
      <div class="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
        <div class="flex items-center justify-between mb-10">
          <div>
            <h3 class="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 class="w-5 h-5 text-[#245DFF]" />
              Distribución por Área
            </h3>
            <p class="text-xs font-medium text-slate-400 mt-1 uppercase tracking-widest">Base de Talento CERTIAN UPeU</p>
          </div>
          <button class="text-xs font-bold text-[#245DFF] hover:underline uppercase tracking-widest">Descargar Reporte</button>
        </div>

        <div class="space-y-8">
          <div v-for="area in distributionData" :key="area.label" class="space-y-3">
            <div class="flex justify-between items-end">
              <div>
                <span class="text-sm font-bold text-slate-800">{{ area.label }}</span>
                <span class="text-[10px] font-bold text-slate-400 ml-2">({{ area.count }} alumnos)</span>
              </div>
              <span class="text-sm font-black text-[#071437]">{{ area.percentage }}%</span>
            </div>
            <div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div 
                class="h-full rounded-full transition-all duration-1000 ease-out"
                :class="area.color"
                :style="{ width: area.percentage + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions / Mini Stats -->
      <div class="space-y-6">
        <div class="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm overflow-hidden relative group">
          <div class="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div class="relative z-10">
            <Clock class="w-5 h-5 text-blue-600 mb-4" />
            <h4 class="text-lg font-bold text-slate-900">Pendiente de Revisión</h4>
            <p class="text-3xl font-black text-blue-600 mt-2">{{ stats?.pendingSubmissions }}</p>
            <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Evaluaciones de Retos</p>
            <button 
              @click="navigateTo('/empresa/evaluations')"
              class="w-full mt-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10"
            >
              Ir a Evaluaciones
            </button>
          </div>
        </div>

        <div class="bg-gradient-to-br from-[#245DFF] to-[#071437] rounded-3xl p-6 shadow-xl relative overflow-hidden group">
          <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div class="relative z-10 text-white">
            <FileCheck class="w-5 h-5 text-blue-200 mb-4" />
            <h4 class="text-lg font-bold">Publicar Nuevo Desafío</h4>
            <p class="text-xs text-blue-100 mt-2 font-medium opacity-80 leading-relaxed">Impulsa tu marca empleadora creando retos técnicos validados por CERTIAN.</p>
            <button 
              @click="navigateTo('/empresa/challenges')"
              class="w-full mt-6 py-3 bg-white text-[#071437] rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-blue-50 transition-colors"
            >
              Crear Reto +
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
