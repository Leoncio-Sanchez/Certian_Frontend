<script setup lang="ts">
import { Target, Zap, Clock, Users, ArrowRight, Award, X, Send, AlertCircle, Inbox, Lock, Unlock } from 'lucide-vue-next';
import { ref, computed } from 'vue';

const config = useRuntimeConfig();
const { token } = useUser();

// Usamos transform para obtener directamente el array de datos y facilitar el manejo
const { data: rawChallenges, pending, refresh, error } = await useFetch(`${config.public.apiUrl}/challenges`, {
  headers: { Authorization: `Bearer ${token.value}` },
  transform: (res: any) => res.data || []
});

const challenges = computed(() => {
  const data = rawChallenges.value || [];
  if (!Array.isArray(data)) return [];
  
  return data.map((c: any) => ({
    id: c.id_reto || c.id,
    title: c.titulo || c.title || 'Desafío Técnico',
    description: c.descripcion_problema || c.description || c.descripcion || 'Sin descripción disponible',
    durationWeeks: c.duracion_semanas || 4,
    status: c.estado || 'abierto',
    difficulty: c.nivel_dificultad?.nombre || c.difficulty || 'Intermedio',
    rewardHEC: c.nivel_dificultad?.horas_por_defecto || c.rewardHEC || c.recompensa_hec || 20,
    empresa: {
      nombre_empresa: c.empresa?.razon_social || c.empresa?.nombre_empresa || 'Empresa Aliada',
      logo_url: c.empresa?.logo_url
    }
  }));
});

const featuredChallenges = computed(() => challenges.value.length > 0 ? [challenges.value[0]] : []);
const normalChallenges = computed(() => challenges.value.slice(1));

const selectedChallenge = ref<any>(null);
const isSubmitting = ref(false);
const submissionComment = ref("");
const contactNetworking = ref(false);
const customDeliveryDate = ref("");

// Fecha de entrega ajustable
watch(selectedChallenge, (newChallenge) => {
  if (newChallenge) {
    const d = new Date();
    d.setDate(d.getDate() + (newChallenge.durationWeeks * 7));
    customDeliveryDate.value = d.toISOString().split('T')[0];
  }
});

const openApplyModal = (challenge: any) => {
  if (challenge.status === 'cerrado') {
    alert('Este reto está actualmente cerrado.');
    return;
  }
  selectedChallenge.value = challenge;
  submissionComment.value = "";
  contactNetworking.value = false;
};

const handleApply = async () => {
  if (!selectedChallenge.value) return;
  
  try {
    isSubmitting.value = true;
    
    await $fetch(`${config.public.apiUrl}/estudiantes/submit`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
      body: {
        id_reto: selectedChallenge.value.id,
        solucion_texto_url: submissionComment.value,
        contacto_networking: contactNetworking.value,
        estado_desarrollo: 'En Progreso',
        fecha_inicio: new Date().toISOString(),
        fecha_entrega: new Date(customDeliveryDate.value).toISOString()
      }
    });
    
    alert('¡Postulación enviada con éxito!');
    selectedChallenge.value = null;
    refresh();
  } catch (error: any) {
    alert(error.data?.message || 'Error al enviar la postulación.');
  } finally {
    isSubmitting.value = false;
  }
};

const getChallengeImg = (i: number) => {
  const imgs = [
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000'
  ];
  return imgs[i % imgs.length];
};
</script>

<template>
  <div class="space-y-12 pb-20 max-w-6xl mx-auto px-4 relative text-left">
    <header class="space-y-4 text-left">
      <span class="section-label">Retos y Validaciones Técnicas</span>
      <h1 class="text-5xl font-bold text-slate-900 leading-tight">Explora Desafíos <br /><span class="text-blue-600">Académicos de Élite.</span></h1>
      <p class="text-slate-500 max-w-lg font-medium leading-relaxed text-lg">
        Resuelve problemas técnicos reales propuestos por las mejores empresas de tecnología. 
      </p>
    </header>

    <!-- Challenges List -->
    <div v-if="!pending" class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
      <div v-for="(c, i) in challenges" :key="c.id" class="bg-white rounded-3xl border border-slate-200 p-8 hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between" @click="openApplyModal(c)">
        <div class="text-left">
          <div class="flex items-center justify-between mb-6 text-left">
            <span class="text-[10px] font-bold uppercase tracking-widest text-slate-400">{{ c.empresa.nombre_empresa }}</span>
            <span class="px-3 py-1 bg-slate-100 rounded-full text-[9px] font-bold uppercase tracking-widest text-slate-600">{{ c.difficulty }}</span>
          </div>
          <h3 class="text-2xl font-bold text-slate-900 leading-tight mb-4 text-left">{{ c.title }}</h3>
          <p class="text-slate-500 text-sm line-clamp-3 text-left">{{ c.description }}</p>
        </div>
        <div class="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between text-left">
          <div class="flex items-center gap-2 text-left">
            <Clock :size="16" class="text-blue-600" />
            <span class="text-sm font-bold text-slate-900">{{ c.rewardHEC }} HEC</span>
          </div>
          <button class="text-blue-600 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
            Aplicar <ArrowRight :size="14" />
          </button>
        </div>
      </div>
    </div>

    <!-- Postulation Modal -->
    <Teleport to="body">
      <div v-if="selectedChallenge" class="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4">
         <div class="bg-white rounded-[32px] w-full max-w-xl overflow-hidden shadow-2xl text-left text-left">
            <div class="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50 text-left">
               <div class="text-left">
                  <p class="text-[10px] font-black text-blue-600 uppercase tracking-widest text-left">Nueva Postulación</p>
                  <h3 class="text-xl font-black text-slate-900 mt-1 text-left">{{ selectedChallenge.title }}</h3>
               </div>
               <button @click="selectedChallenge = null" class="p-2 hover:bg-white rounded-full"><X :size="24" /></button>
            </div>
            
            <div class="p-8 space-y-6 text-left">
               <div class="grid grid-cols-2 gap-4 text-left">
                 <div class="space-y-1 text-left">
                   <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fecha de Inicio</p>
                   <p class="text-sm font-bold text-slate-800">Hoy (Automático)</p>
                 </div>
                 <div class="space-y-1 text-left">
                   <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fecha de Entrega</p>
                   <input type="date" v-model="customDeliveryDate" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold outline-none focus:border-blue-500" />
                 </div>
               </div>

               <div class="space-y-2 text-left">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 text-left text-left">solucion_texto_url (Repositorio / Drive)</label>
                  <textarea 
                    v-model="submissionComment" 
                    rows="4" 
                    class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-medium outline-none focus:border-blue-500 transition-all text-left"
                    placeholder="Pega el enlace a tu repositorio o documento..."
                  ></textarea>
               </div>

               <div class="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100 text-left text-left">
                  <input type="checkbox" v-model="contactNetworking" class="w-5 h-5 rounded border-blue-300 text-blue-600" />
                  <div class="text-left text-left">
                    <p class="text-xs font-bold text-blue-900 text-left">Habilitar contacto_networking</p>
                    <p class="text-[10px] text-blue-700/70 text-left">Permitir comunicación directa con la empresa.</p>
                  </div>
               </div>
            </div>

            <div class="p-8 pt-0 flex gap-4 text-left text-left text-left">
               <button @click="selectedChallenge = null" class="flex-1 py-4 font-bold text-slate-400 hover:text-slate-600 text-left">Cancelar</button>
               <button 
                @click="handleApply" 
                :disabled="isSubmitting || !submissionComment.trim()"
                class="flex-[2] bg-slate-900 hover:bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 shadow-xl text-left text-left"
               >
                  <Send :size="16" />
                  <span>{{ isSubmitting ? 'Registrando...' : 'Confirmar Aplicación' }}</span>
               </button>
            </div>
         </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
@reference "~/assets/css/index.css";
</style>