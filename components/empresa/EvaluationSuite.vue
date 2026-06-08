<script setup lang="ts">
import { 
  CheckCircle2, 
  FileText, 
  Award, 
  ChevronRight, 
  Sliders, 
  Code,
  ShieldCheck,
  Users,
  Star
} from 'lucide-vue-next';
import { INITIAL_EVALUATIONS } from '~/utils/empresaData';
import type { EvaluationSubmission } from '~/types/empresa';
import { ref, computed, watch, onMounted } from 'vue';

const config = useRuntimeConfig();
const { token } = useUser();

const submissions = ref<EvaluationSubmission[]>([]);
const isLoading = ref(false);

const pendingSubmissions = computed(() => submissions.value.filter(s => s.status === "pending" || s.status === "en_revision"));
const approvedSubmissions = computed(() => submissions.value.filter(s => s.status === "approved" || s.status === "aprobado"));

const activeSubId = ref<string>("");
const activeSub = computed(() => submissions.value.find(s => s.id === activeSubId.value));

const techGrade = ref(8);
const analyticGrade = ref(8);
const commGrade = ref(8);
const feedbackText = ref("");
const verifiedSkills = ref<string[]>([]);

const fetchSubmissions = async () => {
  try {
    isLoading.value = true;
    const response: any = await $fetch(`${config.public.apiUrl}/company/submissions`, {
      headers: { Authorization: `Bearer ${token.value}` }
    });
    
    const apiData = response.data || response || [];
    if (Array.isArray(apiData) && apiData.length > 0) {
      submissions.value = apiData.map((s: any) => ({
        id: s.id_postulacion?.toString() || s.id?.toString(),
        candidateName: s.estudiante?.nombre || 'Talento',
        candidateCareer: s.estudiante?.especialidad || 'Estudiante',
        candidateAvatar: s.estudiante?.avatar || `https://ui-avatars.com/api/?name=${s.estudiante?.nombre || 'T'}&background=random`,
        challengeTitle: s.reto?.titulo || 'Reto Técnico',
        submissionDate: new Date(s.created_at || Date.now()).toLocaleDateString(),
        status: s.estado || 'pending',
        docTitle: 'Solución Técnica',
        docContent: s.comentario_postulacion || 'No se proporcionó descripción técnica adicional.',
        checkedSkills: s.reto?.tags || [],
        rubricScore: {
          technical: s.nota_tecnica || 8,
          analytic: s.nota_analitica || 8,
          communication: s.nota_comunicacion || 8
        }
      }));
      if (submissions.value.length > 0 && !activeSubId.value) {
        activeSubId.value = submissions.value[0].id;
      }
    } else {
      submissions.value = INITIAL_EVALUATIONS;
      activeSubId.value = submissions.value[0]?.id || "";
    }
  } catch (error) {
    console.error('Error fetching submissions:', error);
    submissions.value = INITIAL_EVALUATIONS;
    activeSubId.value = submissions.value[0]?.id || "";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchSubmissions();
});

watch(activeSubId, () => {
  if (activeSub.value) {
    techGrade.value = activeSub.value.rubricScore.technical;
    analyticGrade.value = 8; // Reset local state
    commGrade.value = 8;
    feedbackText.value = (activeSub.value.status === "approved" || activeSub.value.status === "aprobado")
      ? (activeSub.value.feedback || "Evaluación completada satisfactoriamente.") 
      : "Excelente dominio de la arquitectura y gran justificación técnica.";
    verifiedSkills.value = [...activeSub.value.checkedSkills];
  }
}, { immediate: true });

const toggleSkill = (skill: string) => {
  const idx = verifiedSkills.value.indexOf(skill);
  if (idx !== -1) verifiedSkills.value.splice(idx, 1);
  else verifiedSkills.value.push(skill);
};

const handleApprove = async () => {
  if (!activeSub.value) return;
  
  try {
    isLoading.value = true;
    await $fetch(`${config.public.apiUrl}/company/submissions/${activeSub.value.id}/grade`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token.value}` },
      body: {
        nota_tecnica: techGrade.value,
        nota_analitica: analyticGrade.value,
        nota_comunicacion: commGrade.value,
        feedback: feedbackText.value,
        estado: 'aprobado'
      }
    });
    alert('Sello emitido y calificación enviada exitosamente.');
    await fetchSubmissions();
  } catch (error) {
    console.error('Error grading:', error);
    alert('Error al enviar la calificación.');
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="space-y-8 animate-fade-in text-slate-800 bg-gradient-to-br from-slate-50 via-white to-blue-50/40 p-6 md:p-8 rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]" id="evaluation-suite-view">
    
    <!-- View Header -->
    <div class="border-b pb-6 border-slate-200/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-500 tracking-tight flex items-center gap-3">
          Emisión de Sellos de Excelencia
        </h1>
        <p class="text-sm text-slate-500 mt-2 font-medium max-w-2xl">
          Evalúa las entregas técnicas, ajusta la rúbrica institucional y aprueba la emisión de sellos criptográficos para los talentos.
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Left column: Queue -->
      <div class="space-y-6 lg:col-span-4">
        
        <section>
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xs uppercase font-bold tracking-widest text-slate-400">
              Pendientes de Sello ({{ pendingSubmissions.length }})
            </h3>
            <span v-if="pendingSubmissions.length > 0" class="text-[10px] bg-red-50 text-red-600 border border-red-100 px-2.5 py-1 rounded-full font-extrabold shadow-sm flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              Prioridad
            </span>
          </div>

          <div class="space-y-3">
            <div v-if="isLoading && submissions.length === 0" class="text-center py-4 text-slate-400 font-bold animate-pulse text-xs">Cargando cola...</div>
            <div
              v-for="sub in pendingSubmissions"
              :key="sub.id"
              @click="activeSubId = sub.id"
              class="p-4 rounded-2xl border transition-all duration-300 cursor-pointer text-left relative group"
              :class="activeSubId === sub.id ? 'bg-white border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.15)] ring-1 ring-blue-500' : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md'"
            >
              <div class="flex items-center gap-3">
                <img :src="sub.candidateAvatar" :alt="sub.candidateName" class="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm" />
                <div class="overflow-hidden">
                  <h4 class="font-extrabold text-sm leading-tight truncate" :class="activeSubId === sub.id ? 'text-blue-700' : 'text-slate-900'">{{ sub.candidateName }}</h4>
                  <span class="text-[11px] text-slate-500 font-medium mt-0.5 truncate block">{{ sub.candidateCareer }}</span>
                </div>
              </div>
              <div class="mt-3 pt-3 border-t border-slate-100">
                <span class="text-xs font-bold text-slate-700 block truncate">{{ sub.challengeTitle }}</span>
                <span class="text-[10px] text-blue-500 block font-mono mt-1 uppercase tracking-wide font-semibold">Recibido: {{ sub.submissionDate }}</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 class="text-xs uppercase font-bold tracking-widest text-slate-400 mb-4 pt-2"> Sellos Emitidos ({{ approvedSubmissions.length }})</h3>
          <div class="space-y-3">
            <div
              v-for="sub in approvedSubmissions"
              :key="sub.id"
              @click="activeSubId = sub.id"
              class="p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer text-left flex items-center justify-between group"
              :class="activeSubId === sub.id ? 'bg-slate-50 border-slate-300 shadow-inner' : 'bg-white border-slate-200 hover:bg-slate-50'"
            >
              <div class="flex items-center gap-3 overflow-hidden">
                <div class="p-1.5 bg-green-50 rounded-lg"><ShieldCheck class="w-4 h-4 text-green-500 shrink-0" /></div>
                <div class="truncate">
                  <h4 class="font-bold text-xs text-slate-800 truncate">{{ sub.candidateName }}</h4>
                  <span class="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{{ sub.challengeTitle }}</span>
                </div>
              </div>
              <ChevronRight class="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-400" />
            </div>
          </div>
        </section>
      </div>

      <!-- Right column: Evaluation -->
      <div v-if="activeSub" class="lg:col-span-8 space-y-8 bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-white shadow-xl">
        <div class="flex flex-col xl:flex-row xl:items-center justify-between gap-6 pb-8 border-b border-slate-100">
          <div class="flex items-center gap-5">
            <div class="relative shrink-0">
              <img :src="activeSub.candidateAvatar" :alt="activeSub.candidateName" class="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-xl ring-1 ring-slate-100" />
              <div v-if="activeSub.status === 'approved' || activeSub.status === 'aprobado'" class="absolute -top-3 -right-3 bg-white p-2 rounded-full shadow-lg border border-slate-100"><Award class="w-6 h-6 text-blue-600" /></div>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-2xl font-black text-slate-900 tracking-tight">{{ activeSub.candidateName }}</h2>
                <span v-if="activeSub.status === 'approved' || activeSub.status === 'aprobado'" class="text-[10px] font-black bg-emerald-50 text-emerald-600 px-2 py-1 rounded border border-emerald-100 uppercase tracking-widest">Sello Emitido</span>
              </div>
              <p class="text-sm font-bold text-blue-600 uppercase tracking-wide mt-1">{{ activeSub.candidateCareer }}</p>
            </div>
          </div>
        </div>

        <!-- Documentation -->
        <div class="space-y-4">
          <div class="flex items-center gap-2 mb-2"><FileText class="w-5 h-5 text-indigo-500" /><h3 class="font-black text-slate-900 uppercase tracking-widest text-xs">Propuesta Técnica Entregada</h3></div>
          <div class="bg-slate-900 rounded-3xl p-8 text-slate-100 font-mono text-sm leading-relaxed overflow-y-auto max-h-[350px] custom-scrollbar border border-slate-800 shadow-2xl relative">
            <div class="absolute top-4 right-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-800 px-3 py-1 rounded-full border border-slate-700">{{ activeSub.docTitle }}</div>
            <pre class="whitespace-pre-wrap font-sans text-slate-300 leading-relaxed">{{ activeSub.docContent }}</pre>
          </div>
        </div>

        <!-- Rubric & Validation -->
        <div v-if="activeSub.status === 'pending' || activeSub.status === 'en_revision'" class="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
          <div class="space-y-8">
            <div class="flex items-center gap-2 mb-2"><Sliders class="w-5 h-5 text-blue-500" /><h3 class="font-black text-slate-900 uppercase tracking-widest text-xs">Rúbrica de Evaluación</h3></div>
            <div class="space-y-8">
              <div v-for="grade in [
                { label: 'Técnica', val: techGrade, setter: (v: number) => techGrade = v },
                { label: 'Analítica', val: analyticGrade, setter: (v: number) => analyticGrade = v },
                { label: 'Comunicación', val: commGrade, setter: (v: number) => commGrade = v }
              ]" :key="grade.label">
                <div class="flex justify-between items-center mb-3">
                  <span class="text-xs font-black text-slate-500 uppercase tracking-widest">{{ grade.label }}</span>
                  <span class="text-lg font-black text-blue-600">{{ grade.val }}/10</span>
                </div>
                <input type="range" min="1" max="10" step="1" :value="grade.val" @input="e => grade.setter(parseInt((e.target as HTMLInputElement).value))" class="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-600" />
              </div>
            </div>
          </div>

          <div class="space-y-8">
            <div class="flex items-center gap-2 mb-2"><ShieldCheck class="w-5 h-5 text-emerald-500" /><h3 class="font-black text-slate-900 uppercase tracking-widest text-xs">Skills Validados para el Sello</h3></div>
            <div class="flex flex-wrap gap-2">
              <button 
                v-for="skill in activeSub.checkedSkills" 
                :key="skill"
                @click="toggleSkill(skill)"
                class="px-4 py-2 rounded-xl text-xs font-bold transition-all border shadow-sm"
                :class="verifiedSkills.includes(skill) ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-white text-slate-400 border-slate-200'"
              >
                {{ skill }}
              </button>
            </div>
          </div>
        </div>

        <!-- Feedback & Action -->
        <div v-if="activeSub.status === 'pending' || activeSub.status === 'en_revision'" class="space-y-6 pt-6 border-t border-slate-100">
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Comentario para el Talento</label>
            <textarea v-model="feedbackText" rows="4" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:bg-white transition-all shadow-inner"></textarea>
          </div>
          <div class="flex flex-col sm:flex-row items-center gap-4">
            <button @click="handleApprove" :disabled="isLoading" class="w-full sm:flex-1 bg-slate-900 hover:bg-[#245DFF] disabled:opacity-50 text-white px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-blue-500/25 active:scale-95 group">
              <Award class="w-5 h-5 text-amber-400" /> 
              <span v-if="isLoading">Procesando...</span>
              <span v-else>Emitir Sello Digital & Validar Skills</span>
            </button>
          </div>
        </div>
        <div v-else-if="activeSub" class="bg-blue-50 p-8 rounded-3xl border border-blue-100 mt-10">
           <div class="flex items-center gap-4 mb-4">
              <ShieldCheck class="w-6 h-6 text-blue-600" />
              <h4 class="font-black text-blue-900 uppercase tracking-widest text-xs">Evaluación Finalizada</h4>
           </div>
           <p class="text-sm font-medium text-blue-700 italic">"{{ feedbackText }}"</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "../../src/index.css";
</style>
