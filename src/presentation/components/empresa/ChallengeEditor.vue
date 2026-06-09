<script setup lang="ts">
import { 
  Plus, 
  Save, 
  Sparkles, 
  Users, 
  Clock, 
  Award, 
  X,
  Trash2,
  AlertCircle,
  Database,
  Search,
  ChevronDown,
  ChevronUp,
  Activity,
  ShieldCheck,
  Briefcase,
  Zap,
  Code,
  Pencil,
  Power,
  PowerOff,
  Target,
  Terminal,
  FileText,
  Layers,
  Building2,
  Info,
  BookOpen
} from 'lucide-vue-next';
import { ref, computed, onMounted } from 'vue';

const config = useRuntimeConfig();
const { token, user } = useUser();

// State
const challenges = ref<any[]>([]);
const isLoading = ref(false);
const isSaving = ref(false);
const fetchError = ref(false);
const searchTerm = ref("");

// Editor State (Right Drawer)
const showEditor = ref(false);
const isEditing = ref(false);
const selectedChallengeId = ref<string | null>(null);

// Form Fields
const topics = ref<any[]>([]);
const difficulties = ref<any[]>([]);
const formTitle = ref("");
const formDescProblema = ref("");
const formRequisitos = ref("1. Repositorio de código fuente limpio.\n2. Archivo descriptivo del proyecto.\n3. Captura del correcto funcionamiento.");
const formIdDifficulty = ref<number | "">("");
const formIdTopic = ref<number | "">("");
const formEstado = ref<'abierto' | 'cerrado'>('abierto');

// Specialty Creation State
const isCreatingTopic = ref(false);
const newTopicName = ref("");
const isSavingTopic = ref(false);

// Local state for interactive expanded cards
const expandedRequirements = ref<Record<string, boolean>>({});

// Fetch auxiliary data
const fetchAuxiliaryData = async () => {
  try {
    const [topicsRes, diffRes]: any = await Promise.all([
      $fetch(`${config.public.apiUrl}/challenges/topics`, { headers: { Authorization: `Bearer ${token.value}` } }),
      $fetch(`${config.public.apiUrl}/challenges/difficulty-levels`, { headers: { Authorization: `Bearer ${token.value}` } })
    ]);
    topics.value = topicsRes.data || topicsRes || [];
    difficulties.value = diffRes.data || diffRes || [];
  } catch (error) {
    console.error('Error categories:', error);
  }
};

// Create New Topic
const handleCreateTopic = async () => {
  if (!newTopicName.value.trim()) return;
  try {
    isSavingTopic.value = true;
    const response: any = await $fetch(`${config.public.apiUrl}/challenges/topics`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
      body: { 
        nombre: newTopicName.value,
        descripcion: `Especialidad agregada por ${user.value?.name || 'Empresa'}.`
      }
    });
    
    await fetchAuxiliaryData();
    const newTopic = topics.value.find(t => t.nombre.toLowerCase() === newTopicName.value.toLowerCase());
    if (newTopic) {
      formIdTopic.value = newTopic.id_tema;
    }
    
    isCreatingTopic.value = false;
    newTopicName.value = "";
  } catch (error: any) {
    const errorMsg = error.data?.message || error.message || 'Error desconocido';
    alert(`Error al crear la especialidad: ${errorMsg}`);
  } finally {
    isSavingTopic.value = false;
  }
};

// Fetch challenges
const fetchChallenges = async () => {
  try {
    isLoading.value = true;
    const response: any = await $fetch(`${config.public.apiUrl}/companies/my-challenges`, {
      headers: { Authorization: `Bearer ${token.value}` }
    });
    
    const apiData = response.data || response || [];
    if (Array.isArray(apiData)) {
      challenges.value = apiData.map((c: any) => ({
        id: c.id_reto?.toString() || c.id?.toString(),
        title: c.titulo || 'Reto sin título',
        description: c.descripcion_problema || '',
        requisitos: c.requisitos_entrega || '',
        status: c.estado || 'abierto',
        difficulty: c.nivel_dificultad?.nombre || 'Intermedio',
        // Captura robusta de IDs para asegurar que no enviemos NaN
        difficultyId: c.id_nivel_dificultad || c.nivel_dificultad?.id_nivel_dificultad,
        topicId: c.id_tema || c.tema?.id_tema,
        category: c.tema?.nombre || 'General',
        participants: c.applicantsCount || 0,
        hours: c.nivel_dificultad?.horas_por_defecto || 20
      }));
    }
  } catch (error) {
    fetchError.value = true;
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchChallenges();
  fetchAuxiliaryData();
});

const filteredChallenges = computed(() => {
  return challenges.value.filter(c => 
    c.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    c.category.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const totalApplicants = computed(() => challenges.value.reduce((acc, c) => acc + (c.participants || 0), 0));
const pendingEvaluationCount = computed(() => Math.round(challenges.value.length * 1.5));

// Editor Handlers
const openCreate = () => {
  isEditing.value = false;
  selectedChallengeId.value = null;
  formTitle.value = "";
  formDescProblema.value = "";
  formRequisitos.value = "1. Repositorio de código fuente limpio.\n2. Archivo descriptivo del proyecto.\n3. Captura del correcto funcionamiento.";
  formIdDifficulty.value = difficulties.value[0]?.id_nivel_dificultad || "";
  formIdTopic.value = topics.value[0]?.id_tema || "";
  formEstado.value = 'abierto';
  showEditor.value = true;
};

const openEdit = (chal: any) => {
  isEditing.value = true;
  selectedChallengeId.value = chal.id;
  formTitle.value = chal.title;
  formDescProblema.value = chal.description;
  formRequisitos.value = chal.requisitos;
  formIdDifficulty.value = chal.difficultyId;
  formIdTopic.value = chal.topicId;
  formEstado.value = chal.status;
  showEditor.value = true;
};

const closeEditor = () => {
  showEditor.value = false;
};

const handleFormSubmit = async () => {
  if (!formTitle.value.trim() || !formDescProblema.value.trim() || !formIdDifficulty.value || !formIdTopic.value) {
    alert("Completa todos los campos obligatorios.");
    return;
  }

  const idEmpresa = user.value?.id_empresa || user.value?.empresa?.id_empresa || user.value?.id;

  const payload = {
    id_empresa: Number(idEmpresa),
    titulo: formTitle.value,
    descripcion_problema: formDescProblema.value,
    requisitos_entrega: formRequisitos.value,
    id_nivel_dificultad: Number(formIdDifficulty.value),
    id_tema: Number(formIdTopic.value),
    estado: formEstado.value
  };

  try {
    isSaving.value = true;
    if (isEditing.value && selectedChallengeId.value) {
      await $fetch(`${config.public.apiUrl}/challenges/${selectedChallengeId.value}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token.value}` },
        body: payload
      });
    } else {
      await $fetch(`${config.public.apiUrl}/challenges`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token.value}` },
        body: payload
      });
    }
    await fetchChallenges();
    closeEditor();
  } catch (error: any) {
    alert(`Error al guardar: ${error.data?.message || error.message}`);
  } finally {
    isSaving.value = false;
  }
};

const toggleStatus = async (chal: any) => {
  const oldStatus = chal.status;
  const newStatus = chal.status === 'abierto' ? 'cerrado' : 'abierto';

  // Cambio visual inmediato (Optimista)
  chal.status = newStatus;

  try {
    // IMPORTANTE: Solo enviamos el estado. 
    // Enviar el payload completo con IDs puede causar errores de clave foránea si los datos locales están desincronizados.
    const payload = { 
      estado: newStatus
    };

    await $fetch(`${config.public.apiUrl}/challenges/${chal.id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token.value}` },
      body: payload
    });
  } catch (error: any) {
    console.error('Error updating status:', error);
    // Revertir cambio local si falla
    chal.status = oldStatus;
    const errorMsg = error.data?.message || error.message || 'Error de servidor';
    alert(`Error al sincronizar con la base de datos: ${errorMsg}`);
  }
};

const deleteChallenge = async (chal: any) => {
  if (!confirm(`¿Eliminar reto "${chal.title}"?`)) return;
  try {
    await $fetch(`${config.public.apiUrl}/challenges/${chal.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token.value}` }
    });
    challenges.value = challenges.value.filter(c => c.id !== chal.id);
  } catch (error) {
    alert('Error al eliminar');
  }
};

const toggleRequirements = (id: string) => {
  expandedRequirements.value[id] = !expandedRequirements.value[id];
};
</script>

<template>
  <!-- Root div con barra de desplazamiento idéntica -->
  <div class="h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased overflow-y-auto custom-scrollbar relative text-left">
    
    <!-- Connection Error -->
    <div v-if="fetchError" class="fixed top-6 right-6 z-[110] bg-red-50 border border-red-200 p-4 rounded-2xl flex items-center gap-4 text-red-700 shadow-xl max-w-md animate-in slide-in-from-right">
       <AlertCircle class="w-6 h-6 shrink-0" />
       <div>
          <p class="font-bold text-xs uppercase tracking-widest leading-none">Error de Conexión</p>
          <p class="text-[11px] font-medium mt-1">No se pudo sincronizar con el esquema relacional.</p>
       </div>
       <button @click="fetchError = false" class="p-1 hover:bg-red-100 rounded-lg"><X class="w-4 h-4" /></button>
    </div>

    <!-- Main Content Panel -->
    <main class="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto space-y-8 pb-20 text-left">
      
      <!-- Header Section -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-left">
        <div class="text-left">
          <h1 class="text-2xl sm:text-3xl font-black tracking-tight text-slate-800 text-left">
            Gestión de <span class="text-blue-600">Retos Técnicos</span>
          </h1>
          <p class="text-[10px] font-black text-slate-400 tracking-widest uppercase mt-1 flex items-center gap-1.5 leading-none">
            DISEÑA DESAFÍOS PARA FILTRAR EL <span class="text-slate-800 font-extrabold bg-amber-100 px-1.5 py-0.5 rounded text-[9px]">MEJOR TALENTO</span>
          </p>
        </div>

        <div class="flex flex-col md:flex-row gap-4 items-center">
          <div class="relative w-64 group">
            <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              placeholder="Buscar desafío..."
              v-model="searchTerm"
              class="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all font-medium shadow-sm"
            />
          </div>

          <button 
            @click="openCreate"
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-[11px] shadow-lg shadow-blue-600/10 active:scale-95 transition-all flex items-center gap-2 shrink-0"
          >
            <Plus class="w-4 h-4 stroke-[3]" /> Crear Reto
          </button>
        </div>
      </div>

      <!-- KPI Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div class="bg-white rounded-2xl border border-slate-100 flex overflow-hidden shadow-sm">
          <div class="w-1.5 bg-emerald-500"></div>
          <div class="p-5 flex-1 flex flex-col justify-between text-left">
            <div class="flex justify-between items-start">
              <div class="p-2.5 bg-emerald-50 rounded-xl text-emerald-600"><Users class="w-4 h-4" /></div>
              <span class="text-[8px] font-bold tracking-wider bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full uppercase text-left">Activas</span>
            </div>
            <div class="mt-3">
              <h3 class="text-2xl font-black text-slate-800 text-left">{{ totalApplicants }}</h3>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5 text-left">Postulaciones Totales</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-2xl border border-slate-100 flex overflow-hidden shadow-sm">
          <div class="w-1.5 bg-blue-500"></div>
          <div class="p-5 flex-1 flex flex-col justify-between text-left">
            <div class="flex justify-between items-start">
              <div class="p-2.5 bg-blue-50 rounded-xl text-blue-600"><BookOpen class="w-4 h-4" /></div>
              <span class="text-[8px] font-bold tracking-wider bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full uppercase text-left">Publicados</span>
            </div>
            <div class="mt-3">
              <h3 class="text-2xl font-black text-slate-800 text-left">{{ challenges.length }}</h3>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5 text-left">Retos Disponibles</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-2xl border border-slate-100 flex overflow-hidden shadow-sm">
          <div class="w-1.5 bg-amber-500"></div>
          <div class="p-5 flex-1 flex flex-col justify-between text-left">
            <div class="flex justify-between items-start">
              <div class="p-2.5 bg-amber-50 rounded-xl text-amber-600"><Layers class="w-4 h-4" /></div>
              <span class="text-[8px] font-bold tracking-wider bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full uppercase text-left">En Revisión</span>
            </div>
            <div class="mt-3">
              <h3 class="text-2xl font-black text-slate-800 text-left">{{ pendingEvaluationCount }}</h3>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5 text-left">Por Calificar</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Catalog Header -->
      <div class="border-b border-slate-200 pb-3 flex items-center justify-between">
        <h3 class="text-[11px] font-bold tracking-widest uppercase text-slate-400 flex items-center gap-2 text-left">
          <span>Catálogo de Retos</span>
          <span class="bg-slate-200 text-slate-600 text-[9px] px-2 py-0.5 rounded-full font-black font-mono text-left">{{ filteredChallenges.length }}</span>
        </h3>
      </div>

      <!-- Challenges Grid -->
      <div v-if="filteredChallenges.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        <article v-for="chal in filteredChallenges" :key="chal.id" class="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between overflow-hidden hover:shadow-md transition-shadow group text-left">
          <div class="h-1.5 w-full transition-colors duration-300" :class="chal.status === 'abierto' ? 'bg-blue-600' : 'bg-slate-300'"></div>
          
          <div class="p-5 flex-1 flex flex-col justify-between relative text-left">
            <!-- Status tag (Clic para cambiar) -->
            <div class="absolute top-4 right-4 text-left">
              <button 
                @click.stop="toggleStatus(chal)"
                class="text-[8px] font-mono font-black uppercase px-2 py-0.5 rounded border transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm text-left"
                :class="chal.status === 'abierto' ? 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100' : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'"
                title="Click para cambiar estado"
              >
                {{ chal.status }}
              </button>
            </div>

            <div>
              <!-- Header Info -->
              <div class="flex gap-3 text-left">
                <div class="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600 shrink-0 group-hover:scale-105 transition-transform text-left">
                  <Code class="w-5 h-5 text-left" />
                </div>
                <div class="min-w-0 flex-1 pr-12 text-left">
                  <h4 @click="openEdit(chal)" class="text-sm font-black text-slate-800 hover:text-blue-600 transition-colors cursor-pointer truncate uppercase tracking-tight text-left">{{ chal.title }}</h4>
                  <p class="text-[10px] font-extrabold text-slate-500 tracking-wide uppercase truncate mt-0.5 text-left">{{ chal.category }}</p>
                </div>
              </div>

              <!-- Tags -->
              <div class="flex flex-wrap gap-1.5 mt-4 text-left">
                <span class="text-[8px] font-mono bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-black text-left">ID: {{ chal.id }}</span>
                <span class="text-[8px] font-bold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded uppercase text-left">{{ chal.category }}</span>
                <span class="text-[8px] font-bold bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded uppercase text-left">{{ chal.difficulty }}</span>
              </div>

              <!-- Description -->
              <div class="bg-slate-50 border border-slate-100 rounded-xl p-3.5 mt-4 space-y-1 text-left">
                <span class="text-[8px] font-mono font-black text-slate-400 uppercase tracking-widest block text-left">CRITERIO TÉCNICO:</span>
                <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed text-left">{{ chal.description }}</p>
              </div>

              <!-- Reward Badge -->
              <div class="mt-3 flex items-center justify-between text-[10px] font-bold text-purple-600 bg-purple-50/50 p-2.5 rounded-xl border border-purple-100/50 text-left">
                <span class="flex items-center gap-1 text-left"><Award class="w-3 h-3" /> Reconocimiento HEC:</span>
                <span class="font-mono bg-white border border-purple-200/80 px-2 py-0.5 rounded text-[9px] text-left">+{{ chal.hours }}h HEC</span>
              </div>

              <!-- Collapsible Requirements -->
              <div class="mt-4 pt-1 text-left">
                <button @click="toggleRequirements(chal.id)" class="w-full flex items-center justify-between text-[9px] font-bold text-slate-400 hover:text-slate-600 py-1 uppercase tracking-wider text-left">
                  <span>VER REQUISITOS DE ENTREGA</span>
                  <ChevronUp v-if="expandedRequirements[chal.id]" class="w-3 h-3 text-left" />
                  <ChevronDown v-else class="w-3 h-3 text-left" />
                </button>
                <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">
                  <div v-if="expandedRequirements[chal.id]" class="mt-1.5 p-3.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] text-slate-500 whitespace-pre-line leading-relaxed text-left">
                    {{ chal.requisitos }}
                  </div>
                </transition>
              </div>
            </div>

            <!-- Footer Actions -->
            <div class="border-t border-slate-100 mt-5 pt-4 flex items-center justify-between text-left">
              <div class="flex gap-1 text-left">
                <button @click="openEdit(chal)" class="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all text-left"><Pencil class="w-3.5 h-3.5" /></button>
                <button @click="deleteChallenge(chal)" class="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all text-left"><Trash2 class="w-3.5 h-3.5" /></button>
              </div>

              <button class="bg-slate-800 hover:bg-blue-600 text-white rounded-full px-3 py-1 flex items-center gap-2 text-[11px] font-black transition-all active:scale-95 shrink-0 text-left">
                <Users class="w-3 h-3 text-slate-300 text-left" />
                <span class="font-mono text-left">{{ chal.participants }}</span>
              </button>
            </div>
          </div>
        </article>
      </div>

      <!-- Empty State -->
      <div v-else class="p-16 text-center bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] max-w-md mx-auto text-left">
        <div class="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-center text-left"><Code class="w-8 h-8 text-slate-300" /></div>
        <h4 class="text-base font-black text-slate-700 uppercase tracking-tight text-center text-left">Catálogo vacío</h4>
        <p class="text-[11px] text-slate-400 mt-2 font-medium text-center text-left">Haga clic en "Crear Reto" para registrar un nuevo desafío técnico en el sistema.</p>
      </div>

    </main>

    <!-- RIGHT SIDE DRAWER (EDITOR) -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div v-if="showEditor" class="fixed inset-y-0 right-0 z-[120] w-full sm:w-[500px] bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden text-left">
        
        <!-- Drawer Header -->
        <header class="p-6 bg-[#f8fafc] border-b border-slate-200 flex items-center justify-between shrink-0 text-left text-left">
          <div class="flex gap-3.5 items-center text-left text-left">
            <div class="p-2.5 bg-blue-50 border border-blue-100 rounded-xl text-left text-left">
              <Plus v-if="!isEditing" class="w-5 h-5 text-blue-600 stroke-[3]" />
              <Pencil v-else class="w-5 h-5 text-blue-600 stroke-[3]" />
            </div>
            <div class="text-left text-left text-left">
              <h3 class="text-[9px] font-black font-mono tracking-[0.2em] text-slate-400 leading-none uppercase text-left text-left">FORMULARIO DE DESAFÍO</h3>
              <h4 class="text-sm font-black text-slate-800 tracking-tight mt-1.5 uppercase text-left text-left">
                {{ isEditing ? 'Editar Reto Existente' : 'Crear Reto Técnico' }}
              </h4>
            </div>
          </div>
          <button @click="closeEditor" class="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-200/50 rounded-xl transition-all text-left"><X class="w-5 h-5" /></button>
        </header>

        <!-- Drawer Body -->
        <div class="flex-1 overflow-y-auto p-8 space-y-7 custom-scrollbar pb-32 text-left">
          
          <div class="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl flex items-start gap-3.5 text-left text-left">
            <Info class="w-5 h-5 text-blue-600 shrink-0 mt-0.5 text-left" />
            <p class="text-[11px] text-slate-600 leading-relaxed font-semibold text-left">
              Complete los campos para parametrizar el reto técnico. Todos los datos ingresados tendrán impacto directo en la visualización del listado y en sus badges de capacitación.
            </p>
          </div>

          <!-- Title Input -->
          <div class="space-y-2 text-left text-left text-left">
            <div class="flex justify-between items-center px-1 text-left text-left">
              <label class="font-mono text-[9px] font-black text-slate-400 uppercase tracking-widest text-left text-left">TÍTULO DEL RETO *</label>
              <span class="text-[8px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase text-left text-left">MAX 150</span>
            </div>
            <input v-model="formTitle" type="text" maxlength="150" placeholder="Ej: Microservicios con NestJS y Prisma" class="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-[13px] font-bold shadow-sm text-left" />
          </div>

          <!-- Selectors Grid -->
          <div class="grid grid-cols-2 gap-5 items-start text-left text-left text-left">
            <div class="space-y-2 text-left text-left">
              <div class="flex items-center justify-between px-1 h-6 text-left text-left">
                <label class="font-mono text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 text-left text-left">
                  <Layers class="w-3.5 h-3.5 text-left" /> ESPECIALIDAD *
                </label>
                <button @click="isCreatingTopic = !isCreatingTopic" type="button" class="p-1 hover:bg-blue-50 rounded-lg text-blue-600 transition-all text-left">
                  <Plus v-if="!isCreatingTopic" class="w-3.5 h-3.5 stroke-[3]" />
                  <X v-else class="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>

              <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0">
                <div v-if="isCreatingTopic" class="flex items-center gap-2 animate-in fade-in slide-in-from-top-1 h-[48px] text-left">
                  <input v-model="newTopicName" type="text" placeholder="Especialidad..." class="flex-1 bg-white border border-blue-200 rounded-xl px-3 py-2.5 text-[11px] font-bold text-slate-700 outline-none focus:border-blue-600 shadow-sm text-left" @keyup.enter="handleCreateTopic" />
                  <button @click="handleCreateTopic" :disabled="isSavingTopic || !newTopicName.trim()" class="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all shrink-0 shadow-md text-left text-left">
                    <Save v-if="!isSavingTopic" class="w-4 h-4 text-left" />
                    <Activity v-else class="w-4 h-4 animate-spin text-left text-left" />
                  </button>
                </div>

                <select v-else v-model="formIdTopic" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs font-bold text-slate-700 focus:outline-none focus:bg-white cursor-pointer appearance-none uppercase tracking-wide h-[48px] text-left">
                   <option value="" disabled>SELECCIONAR...</option>
                   <option v-for="t in topics" :key="t.id_tema" :value="t.id_tema">{{ t.nombre }}</option>
                </select>
              </transition>
            </div>
            
            <div class="space-y-2 text-left text-left">
              <div class="flex items-center px-1 h-6 text-left">
                <label class="font-mono text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 text-left">
                  <ShieldCheck class="w-3.5 h-3.5 text-left" /> DIFICULTAD *
                </label>
              </div>
              <select v-model="formIdDifficulty" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs font-bold text-slate-700 focus:outline-none focus:bg-white cursor-pointer appearance-none uppercase tracking-wide h-[48px] text-left">
                 <option value="" disabled>SELECCIONAR...</option>
                 <option v-for="d in difficulties" :key="d.id_nivel_dificultad" :value="d.id_nivel_dificultad">{{ d.nombre }}</option>
              </select>
            </div>
          </div>

          <div class="space-y-2 text-left text-left text-left">
            <label class="font-mono text-[9px] font-black text-slate-400 uppercase tracking-widest text-left text-left">DESCRIPCIÓN DEL PROBLEMA TÉCNICO *</label>
            <textarea v-model="formDescProblema" rows="5" placeholder="Describa el reto..." class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all resize-none leading-relaxed font-medium shadow-inner text-left text-left"></textarea>
          </div>

          <div class="space-y-2 text-left text-left text-left">
            <label class="font-mono text-[9px] font-black text-slate-400 uppercase tracking-widest text-left text-left">REQUISITOS DE ENTREGA E EVIDENCIAS *</label>
            <textarea v-model="formRequisitos" rows="4" class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all resize-none leading-relaxed font-medium shadow-inner text-left text-left"></textarea>
          </div>

          <div class="mt-16 space-y-6 pt-10 border-t-2 border-slate-100 text-left text-left text-left">
            <h5 class="px-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-left text-left">Finalizar Configuración</h5>
            
            <div class="bg-white border-2 border-slate-100 p-6 rounded-[2.5rem] space-y-8 shadow-sm text-left">
              <div class="flex items-center justify-between px-2 text-left text-left text-left">
                 <div class="text-left text-left text-left">
                    <span class="font-mono text-[9px] font-black text-slate-500 uppercase tracking-widest block text-left text-left">Estado Actual</span>
                    <span class="text-[10px] font-bold uppercase mt-1 block text-left" :class="formEstado === 'abierto' ? 'text-blue-600' : 'text-slate-400'">{{ formEstado }}</span>
                 </div>
                 <div class="flex bg-slate-100 p-1 rounded-2xl text-left text-left text-left">
                    <button @click="formEstado = 'abierto'" type="button" class="px-5 py-2 text-[10px] font-black uppercase rounded-xl transition-all" :class="formEstado === 'abierto' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'">ABIERTO</button>
                    <button @click="formEstado = 'cerrado'" type="button" class="px-5 py-2 text-[10px] font-black uppercase rounded-xl transition-all" :class="formEstado === 'cerrado' ? 'bg-white text-slate-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'">CERRADO</button>
                 </div>
              </div>

              <div class="flex flex-col sm:flex-row items-center gap-4 pt-2 text-left text-left text-left">
                <button @click="closeEditor" class="w-full sm:flex-1 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-800 hover:bg-slate-50 rounded-2xl transition-all border-2 border-slate-100 text-left">CANCELAR</button>
                <button @click="handleFormSubmit" :disabled="isSaving" class="w-full sm:flex-[2] py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-3 text-left">
                  <Save v-if="!isSaving" class="w-4 h-4 text-left" />
                  <span class="text-left">{{ isSaving ? 'GUARDANDO...' : (isEditing ? 'ACTUALIZAR RETO' : 'PUBLICAR RETO') }}</span>
                </button>
              </div>
            </div>
          </div>

          <div class="h-32 text-left"></div>

        </div>
      </div>
    </transition>

    <!-- Overlay backdrop -->
    <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="showEditor" @click="closeEditor" class="fixed inset-0 bg-slate-900/10 backdrop-blur-[2px] z-[110]"></div>
    </transition>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap');

.font-sans { font-family: 'Inter', sans-serif; }
.font-mono { font-family: 'JetBrains Mono', monospace; }

.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 0.8rem;
}

.animate-in {
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideInUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-slide-up {
  animation: slideInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
