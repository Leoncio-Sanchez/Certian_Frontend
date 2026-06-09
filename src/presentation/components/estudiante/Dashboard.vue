<script setup lang="ts">
import { 
  Sparkles, 
  TrendingUp, 
  Target, 
  Award,
  Zap,
  ArrowUpRight,
  MessageSquare,
  Trophy,
  Clock
} from 'lucide-vue-next';

const config = useRuntimeConfig();
const { token, user } = useUser();

const { data: dashboardData, pending } = await useFetch(`${config.public.apiUrl}/estudiantes/dashboard`, {
  headers: { Authorization: `Bearer ${token.value}` }
});

const stats = computed(() => {
  const d = dashboardData.value?.data;
  return [
    { label: 'Puntos Certian', value: d?.points || 0, icon: Clock, color: 'bg-blue-50 text-blue-600' },
    { label: 'Posición Ranking', value: `#${d?.rank || '-'}`, icon: Trophy, color: 'bg-amber-50 text-amber-600' },
    { label: 'Retos Aprobados', value: d?.approvedChallengesCount || 0, icon: Award, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Total Entregas', value: d?.totalSubmissions || 0, icon: Target, color: 'bg-rose-50 text-rose-600' },
  ];
});

const { data: challengesData } = await useFetch(`${config.public.apiUrl}/challenges`, {
  headers: { Authorization: `Bearer ${token.value}` }
});

const challenges = computed(() => challengesData.value?.data?.slice(0, 2) || []);

const advice = ref<string | null>(null);
const loadingAI = ref(false);

const getAIAdvice = async () => {
  loadingAI.value = true;
  try {
    const data = await $fetch('/api/estudiante/ai/career-advice', {
      method: 'POST',
      body: { 
        skills: user.value?.estudianteProfile?.techStack || ['React', 'TypeScript'], 
        interests: ['Fintech', 'SaaS', 'UI/UX'] 
      }
    });
    advice.value = (data as any).advice;
  } catch (err) {
    console.error(err);
  } finally {
    loadingAI.value = false;
  }
};

const activities = [
  { name: 'Sofia Rodriguez', action: 'validó un nuevo sello', time: 'hace 2h', avatar: 'SR' },
  { name: 'Admin Staff', action: 'publicó reto de 80h', time: 'hace 5h', avatar: 'AS' },
];
</script>

<template>
  <div class="space-y-10 pb-20 px-4 max-w-7xl mx-auto">
    <!-- Hero Header -->
    <section class="relative overflow-hidden rounded-3xl bg-white p-10 lg:p-16 border border-slate-200 shadow-sm transition-all hover:shadow-md">
      <div class="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <div class="absolute inset-0 bg-radial-gradient from-blue-600/30 to-transparent blur-3xl" />
      </div>
      
      <div class="relative z-10 max-w-2xl">
        <div
          v-motion
          :initial="{ opacity: 0, x: -20 }"
          :enter="{ opacity: 1, x: 0 }"
        >
          <span class="section-label">Bienvenido de nuevo, {{ user?.name }}</span>
          <h1 class="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mt-2 tracking-tight">
            Acelera tu talento <br />
            <span class="text-blue-600 italic font-medium">con retos reales.</span>
          </h1>
          <p class="text-slate-500 mt-6 text-lg font-medium leading-relaxed">
            Has acumulado <span class="text-blue-700 font-bold">{{ dashboardData?.data?.points }} puntos</span> de excelencia. <br />
            Tu posición actual es <span class="text-slate-900 font-bold">#{{ dashboardData?.data?.rank }}</span> en el ranking global.
          </p>
          
          <div class="flex gap-4 mt-10">
            <button @click="navigateTo('/estudiante/challenges')" class="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold transition-all hover:bg-blue-700 shadow-lg shadow-blue-600/20 active:scale-95">
              Explorar Retos
            </button>
            <button @click="navigateTo('/estudiante/profile')" class="bg-slate-50 text-slate-700 px-10 py-4 rounded-xl font-bold border border-slate-200 hover:bg-slate-100 transition-all active:scale-95">
              Mi Perfil
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Grid -->
    <section v-if="!pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div 
        v-for="(stat, i) in stats"
        :key="stat.label"
        v-motion
        :initial="{ opacity: 0, y: 15 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: i * 100 } }"
        class="bg-white p-6 border border-slate-200 rounded-2xl flex items-center justify-between hover:border-blue-200 transition-all shadow-sm group"
      >
        <div>
          <p class="section-label mb-1">{{ stat.label }}</p>
          <h3 class="text-3xl font-bold text-slate-900">{{ stat.value }}</h3>
        </div>
        <div :class="['p-4 rounded-2xl transition-transform group-hover:scale-110', stat.color]">
          <component :is="stat.icon" :size="28" />
        </div>
      </div>
    </section>

    <!-- Recommendations & AI -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <section class="lg:col-span-2 space-y-6">
        <div class="flex items-center justify-between px-2">
          <h2 class="text-2xl font-bold text-slate-800">Retos Recomendados</h2>
          <button @click="navigateTo('/estudiante/challenges')" class="text-blue-600 text-sm font-bold flex items-center gap-1 hover:underline">
            Ver Catálogo <ArrowUpRight :size="16" />
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="challenge in challenges" :key="challenge.id" class="bg-white rounded-3xl overflow-hidden group cursor-pointer border border-slate-200 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-xl">
            <div class="h-44 overflow-hidden relative bg-slate-50">
              <img 
                src="https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800" 
                :alt="challenge.title" 
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-700 border border-blue-100 shadow-sm">
                {{ challenge.rewardHEC }} HEC
              </div>
            </div>
            <div class="p-8 text-center">
              <span class="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{{ challenge.company?.name }}</span>
              <h3 class="text-xl font-bold mt-1 text-slate-900 group-hover:text-blue-700 transition-colors">{{ challenge.title }}</h3>
              <div class="bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block mt-4">
                Nivel: {{ challenge.difficulty }}
              </div>
              <div class="mt-8">
                <button class="w-full py-4 bg-slate-900 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-slate-900/10">
                  Ver Detalles del Reto
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="space-y-6">
        <div class="bg-[#f0f9ff] p-8 rounded-3xl border border-blue-100 relative overflow-hidden shadow-sm">
          <div class="absolute -right-6 -top-6 w-32 h-32 bg-blue-200/50 blur-3xl rounded-full" />
          
          <div class="flex items-center gap-3 mb-6 relative">
            <div class="p-3 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
              <Sparkles :size="24" />
            </div>
            <h2 class="text-xl font-bold text-slate-900">Career Assistant</h2>
          </div>
          
          <p class="text-slate-500 text-sm font-medium leading-relaxed mb-8 relative">
            Certian AI ha analizado tu historial de retos. ¿Deseas optimizar tu ruta hacia el éxito profesional?
          </p>

          <div v-if="advice"
            v-motion
            :initial="{ opacity: 0 }" 
            :enter="{ opacity: 1 }"
            class="bg-white border border-blue-100 p-5 rounded-2xl text-slate-700 text-sm font-medium leading-relaxed shadow-sm max-h-[300px] overflow-y-auto"
          >
            {{ advice }}
          </div>
          <button v-else
            @click="getAIAdvice"
            :disabled="loadingAI"
            class="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95 disabled:opacity-50"
          >
            {{ loadingAI ? 'Consultando...' : 'Obtener Ruta Optimizada' }}
            <MessageSquare v-if="!loadingAI" :size="18" />
          </button>
        </div>

        <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-lg mb-6 text-slate-900 border-b border-slate-100 pb-4">Conexiones Recientes</h3>
          <div class="space-y-6">
            <div v-for="(activity, i) in activities" :key="i" class="flex gap-4 items-center">
              <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 border border-slate-200">
                {{ activity.avatar }}
              </div>
              <div class="flex-1">
                <p class="text-sm text-slate-600 leading-snug"><span class="font-bold text-slate-900">{{ activity.name }}</span> <br /> {{ activity.action }}</p>
                <p class="text-[10px] text-slate-400 font-bold uppercase mt-0.5 tracking-tighter">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
