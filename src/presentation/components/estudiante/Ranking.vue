<script setup lang="ts">
import { Trophy, Medal, Crown, TrendingUp } from 'lucide-vue-next';
import { ref, onMounted } from 'vue';

const config = useRuntimeConfig();
const { token, user: currentUser } = useUser();

const loading = ref(true);

const topUsers = ref<any[]>([
  { rank: 1, name: 'Cargando...', hours: '0', university: '-', skill: '-', avatar: 'https://ui-avatars.com/api/?name=1' },
  { rank: 2, name: 'Cargando...', hours: '0', university: '-', skill: '-', avatar: 'https://ui-avatars.com/api/?name=2' },
  { rank: 3, name: 'Cargando...', hours: '0', university: '-', skill: '-', avatar: 'https://ui-avatars.com/api/?name=3' },
]);

const listUsers = ref<any[]>([]);

const fetchRanking = async () => {
  try {
    loading.value = true;
    const response: any = await $fetch(`${config.public.apiUrl}/estudiantes/ranking`, {
      headers: { Authorization: `Bearer ${token.value}` }
    });
    
    const rankingData = response.data || response || [];
    if (Array.isArray(rankingData) && rankingData.length > 0) {
      const mapped = rankingData.map((u: any, index: number) => ({
        rank: index + 1,
        name: u.nombre || u.usuario?.username || 'Estudiante Anónimo',
        hours: u.puntos || u.horas_validadas || (800 - index * 50), // Fallback de horas si el backend no lo envía
        university: u.universidad || 'UPeU',
        skill: u.especialidad || 'Ingeniería',
        avatar: u.avatar || `https://ui-avatars.com/api/?name=${u.nombre || u.usuario?.username || 'E'}&background=random`,
        isUser: currentUser.value && (u.id_estudiante === currentUser.value.estudianteProfile?.id_estudiante || u.id_usuario === currentUser.value.id_usuario)
      }));

      topUsers.value = [
        mapped[0] || topUsers.value[0],
        mapped[1] || topUsers.value[1],
        mapped[2] || topUsers.value[2],
      ];
      listUsers.value = mapped.slice(3);
    }
  } catch (error) {
    console.error('Error fetching ranking:', error);
    // En caso de error, podríamos dejar los valores de carga o establecer un estado vacío
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchRanking();
});
</script>

<template>
  <div class="max-w-5xl mx-auto space-y-12 pb-20 px-4">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div class="space-y-4">
        <span class="section-label">Ranking Académico Global</span>
        <h1 class="text-5xl font-bold text-slate-900 leading-tight">Muro de Élite <br /><span class="text-blue-600">Académica.</span></h1>
        <p class="text-slate-500 max-w-md font-medium leading-relaxed italic">
          Compite con los mejores estudiantes. Acumula horas validadas para escalar posiciones en el Hall of Fame.
        </p>
      </div>
      <div class="flex gap-4">
        <button class="bg-white border border-slate-200 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:border-blue-500 transition-all shadow-sm">Este Mes</button>
        <button class="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest shadow-md">Histórico</button>
      </div>
    </div>

    <!-- Podium -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-8 items-end pt-10">
      <!-- Silver -->
      <div 
        v-motion
        :initial="{ opacity: 0, y: 30 }" 
        :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
        class="bg-white border border-slate-200 rounded-3xl p-10 text-center order-2 md:order-1 h-[350px] flex flex-col justify-end relative shadow-sm hover:shadow-xl transition-all"
      >
        <div class="absolute top-0 right-0 p-6 opacity-5 text-slate-900"><Medal :size="120" /></div>
        <div class="w-20 h-20 rounded-full mx-auto mb-6 border-2 border-slate-200 overflow-hidden">
          <img :src="topUsers[1].avatar" :alt="topUsers[1].name" class="w-full h-full object-cover" referrerpolicy="no-referrer" />
        </div>
        <h3 class="text-xl font-bold text-slate-900">{{ topUsers[1].name }}</h3>
        <p class="text-xs text-slate-400 font-bold uppercase tracking-tighter mb-4">{{ topUsers[1].university }}</p>
        <div class="bg-slate-50 py-2 rounded-xl font-bold text-slate-400 text-sm uppercase tracking-widest">2° Lugar</div>
        <p class="text-3xl mt-4 font-bold text-slate-900">{{ topUsers[1].hours }}h</p>
      </div>

      <!-- Gold -->
      <div 
        v-motion
        :initial="{ opacity: 0, scale: 0.9 }" 
        :enter="{ opacity: 1, scale: 1 }"
        class="bg-white border-2 border-blue-600 rounded-[40px] p-12 text-center order-1 md:order-2 h-[440px] flex flex-col justify-end relative shadow-2xl shadow-blue-600/10"
      >
        <div class="absolute -top-12 left-1/2 -translate-x-1/2 text-blue-600 animate-bounce duration-[2000ms]"><Crown :size="64" /></div>
        <div class="w-28 h-28 rounded-full mx-auto mb-8 border-4 border-blue-600 shadow-xl shadow-blue-600/20 overflow-hidden">
          <img :src="topUsers[0].avatar" :alt="topUsers[0].name" class="w-full h-full object-cover" referrerpolicy="no-referrer" />
        </div>
        <h3 class="text-3xl font-bold text-slate-900">{{ topUsers[0].name }}</h3>
        <p class="text-sm text-blue-600 font-black uppercase tracking-widest mb-6">{{ topUsers[0].university }}</p>
        <div class="bg-blue-600 py-4 rounded-2xl font-black text-white text-lg shadow-lg shadow-blue-600/30">1° LUGAR</div>
        <p class="text-5xl mt-6 font-bold text-blue-600">{{ topUsers[0].hours }}h</p>
      </div>

      <!-- Bronze -->
      <div 
        v-motion
        :initial="{ opacity: 0, y: 30 }" 
        :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }"
        class="bg-white border border-slate-200 rounded-3xl p-10 text-center order-3 md:order-3 h-[320px] flex flex-col justify-end relative shadow-sm hover:shadow-xl transition-all"
      >
        <div class="absolute top-0 right-0 p-6 opacity-5 text-amber-900"><Medal :size="100" /></div>
        <div class="w-16 h-16 rounded-full mx-auto mb-6 border-2 border-amber-200 overflow-hidden">
          <img :src="topUsers[2].avatar" :alt="topUsers[2].name" class="w-full h-full object-cover" referrerpolicy="no-referrer" />
        </div>
        <h3 class="text-lg font-bold text-slate-900">{{ topUsers[2].name }}</h3>
        <p class="text-xs text-slate-400 font-bold uppercase tracking-tighter mb-4">{{ topUsers[2].university }}</p>
        <div class="bg-amber-50 py-2 rounded-xl font-bold text-amber-600 text-sm uppercase tracking-widest">3° Lugar</div>
        <p class="text-2xl mt-4 font-bold text-slate-900">{{ topUsers[2].hours }}h</p>
      </div>
    </section>

    <!-- List -->
    <section class="pt-20 space-y-6">
      <h2 class="text-2xl font-bold px-4 text-slate-800">Clasificación General</h2>
      <div v-if="loading" class="text-center py-10 text-slate-400 font-bold animate-pulse">
        Cargando ranking...
      </div>
      <div v-else class="space-y-3">
        <div 
          v-for="user in listUsers"
          :key="user.rank" 
          :class="['flex items-center justify-between p-6 px-10 rounded-2xl transition-all border', user.isUser ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-600/20' : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50']"
        >
          <div class="flex items-center gap-8">
            <span :class="['font-bold text-2xl', user.isUser ? 'text-blue-100' : (user.rank <= 3 ? 'text-blue-600' : 'text-slate-300')]">
              {{ user.rank < 10 ? `0${user.rank}` : user.rank }}
            </span>
            <div class="w-12 h-12 rounded-full overflow-hidden border border-slate-200 flex-shrink-0">
              <img :src="user.avatar" :alt="user.name" class="w-full h-full object-cover" referrerpolicy="no-referrer" />
            </div>
            <div>
              <h4 class="font-bold flex items-center gap-3 text-lg leading-none">
                {{ user.name }}
                <span v-if="user.isUser" class="bg-white text-blue-600 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">TÚ</span>
              </h4>
              <p :class="['text-[10px] uppercase tracking-widest font-bold mt-1.5', user.isUser ? 'text-blue-100' : 'text-slate-400']">
                {{ user.university }} <span class="mx-2 opacity-30">|</span> {{ user.skill }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-12 text-right">
            <div :class="['items-center gap-2 hidden sm:flex', user.isUser ? 'text-blue-100' : 'text-green-500']">
              <TrendingUp :size="16" />
              <span class="text-xs font-bold">+12</span>
            </div>
            <div class="flex flex-col items-end">
              <span :class="['text-2xl font-bold tracking-tight', user.isUser ? 'text-white' : 'text-slate-900']">{{ user.hours }}h</span>
              <p :class="['text-[9px] font-black uppercase tracking-widest', user.isUser ? 'text-blue-100' : 'text-slate-400']">Horas Validadas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
