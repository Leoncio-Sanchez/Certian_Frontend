<script setup lang="ts">
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  Mail,
  ShieldCheck,
  Star,
  Award,
  Zap,
  BookOpen,
  PieChart,
  Clock,
  Shield,
  Crown,
  CheckCircle2,
  X,
  School,
  Save,
  User as UserIcon,
  Phone,
  AlertTriangle
} from 'lucide-vue-next';
import { ref, onMounted, reactive } from 'vue';

const { user, token, fetchMe } = useUser();
const config = useRuntimeConfig();

const isEditing = ref(false);
const isSaving = ref(false);

// Datos del formulario vinculados a las tablas de la BD
const profileForm = reactive({
  nombres: '',
  apellidos: '',
  dni: '',
  telefono: '',
  carrera: '',
  ciclo: '',
  // Datos para la tabla FORMACION_ACADEMICA
  universidad_instituto: '',
  estado_estudio: 'Cursando'
});

onMounted(async () => {
  if (!user.value) await fetchMe();
  syncForm();
});

const syncForm = () => {
  if (user.value) {
    const p = user.value.profile || user.value;
    profileForm.nombres = p.nombres || '';
    profileForm.apellidos = p.apellidos || '';
    profileForm.dni = p.dni || '';
    profileForm.telefono = p.telefono || '';
    profileForm.carrera = p.carrera || '';
    profileForm.ciclo = p.ciclo || '';
    
    // Sincronizar desde la relación formacion
    if (p.formacion && p.formacion.length > 0) {
      profileForm.universidad_instituto = p.formacion[0].universidad_instituto;
      profileForm.estado_estudio = p.formacion[0].estado_estudio;
    }
  }
};

const handleSave = async () => {
  try {
    isSaving.value = true;
    
    // Payload optimizado para Backend. 
    // Enviamos 'formacion' como un objeto de creación/actualización para Prisma.
    // Esto garantiza que se llene la tabla FORMACION_ACADEMICA
    const payload = {
      nombres: profileForm.nombres,
      apellidos: profileForm.apellidos,
      telefono: profileForm.telefono,
      carrera: profileForm.carrera,
      ciclo: profileForm.ciclo,
      formacion: {
        deleteMany: {}, // Limpiamos registros anteriores
        create: {
          universidad_instituto: profileForm.universidad_instituto || 'Universidad Peruana Unión',
          estado_estudio: profileForm.estado_estudio || 'Cursando',
          sello_universidad: false
        }
      }
    };

    await $fetch(`${config.public.apiUrl}/estudiantes/profile`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token.value}` },
      body: payload
    });

    await fetchMe();
    isEditing.value = false;
    alert('¡Datos sincronizados! Tu formación académica ya está en la base de datos.');
  } catch (error) {
    console.error('Error saving profile:', error);
    alert('Error al sincronizar con la base de datos.');
  } finally {
    isSaving.value = false;
  }
};
</script>

<template>
  <div class="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20 font-sans text-left">
    <!-- AVISO DE PERFIL INCOMPLETO -->
    <div v-if="!user?.profile?.formacion?.[0]?.universidad_instituto" class="bg-amber-50 border-2 border-amber-200 p-6 rounded-[2rem] flex items-center gap-5 shadow-lg animate-pulse text-left">
      <div class="p-4 bg-white rounded-2xl text-amber-500 shadow-sm"><AlertTriangle :size="32" /></div>
      <div class="flex-1 text-left">
        <p class="text-amber-900 font-black uppercase tracking-tight text-left">Acción Requerida: Formación Académica</p>
        <p class="text-amber-800/80 text-sm font-bold text-left">Tu tabla de formación académica está vacía. Haz clic en "Editar" abajo para vincular tu universidad.</p>
      </div>
    </div>

    <!-- HEADER: IDENTIDAD ACADÉMICA -->
    <div class="relative bg-white rounded-[3rem] border border-slate-200 p-8 md:p-12 shadow-2xl overflow-hidden text-left">
      <div class="absolute top-0 right-0 w-80 h-80 bg-blue-50 rounded-full -mr-40 -mt-40 opacity-40"></div>
      
      <div class="relative z-10 flex flex-col md:flex-row items-center gap-10">
        <div class="relative">
          <div class="w-32 h-32 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-blue-600 to-indigo-800 p-1.5 shadow-2xl">
            <div class="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
              <span class="text-5xl font-black text-blue-600 uppercase">{{ user?.name?.[0] || user?.profile?.nombres?.[0] || 'S' }}</span>
            </div>
          </div>
          <div class="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-3 rounded-2xl shadow-lg border-4 border-white">
            <ShieldCheck :size="24" />
          </div>
        </div>

        <div class="flex-1 text-center md:text-left space-y-4 text-left">
          <div class="space-y-1 text-left">
            <h1 class="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic text-left">{{ user?.name || user?.profile?.nombres + ' ' + user?.profile?.apellidos || 'Estudiante' }}</h1>
            <p class="text-blue-600 font-bold uppercase tracking-[0.2em] flex items-center justify-center md:justify-start gap-2 text-left">
              <Briefcase :size="16" /> {{ user?.profile?.carrera || user?.career || 'Carrera por definir' }}
            </p>
          </div>
          <div class="flex flex-wrap items-center justify-center md:justify-start gap-4 text-left">
            <span class="px-5 py-2 bg-slate-100 rounded-full text-[10px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-2 text-left">
              <Calendar :size="14" /> Ciclo: {{ user?.profile?.ciclo || user?.ciclo || 'N/A' }}
            </span>
            <span class="px-5 py-2 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-blue-600/20 text-left">
              <Star :size="14" /> {{ user?.profile?.puntos_ranking || 0 }} Puntos Meritocráticos
            </span>
          </div>
        </div>

        <button @click="isEditing = !isEditing" class="px-10 py-5 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-[11px] hover:bg-blue-600 transition-all shadow-2xl active:scale-95 text-left">
          {{ isEditing ? 'Cancelar Edición' : 'Editar Perfil Académico' }}
        </button>
      </div>
    </div>

    <!-- CUERPO: GESTIÓN DE DATOS -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 text-left text-left">
      <!-- Columna Principal: Formulario -->
      <div class="lg:col-span-2 space-y-10 text-left">
        <div class="bg-white rounded-[2.5rem] border border-slate-200 p-10 md:p-14 shadow-xl text-left">
          <div class="flex items-center gap-4 mb-12 pb-6 border-b border-slate-50 text-left text-left">
            <div class="p-4 bg-blue-50 rounded-[1.25rem] text-blue-600 text-left"><School :size="28" /></div>
            <div class="text-left">
              <h2 class="text-3xl font-black text-slate-900 uppercase tracking-tighter text-left">Formación Académica</h2>
              <p class="text-slate-400 font-bold text-sm text-left">Completa tu información institucional aquí abajo.</p>
            </div>
          </div>

          <form class="space-y-10 text-left" @submit.prevent="handleSave">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
              <!-- Universidad (Mapea a FORMACION_ACADEMICA) -->
              <div class="space-y-3 text-left">
                <label class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 text-left text-left">Universidad / Instituto</label>
                <input 
                  v-model="profileForm.universidad_instituto" 
                  :disabled="!isEditing"
                  type="text"
                  class="form-input text-left"
                  placeholder="Ej. Universidad Peruana Unión"
                />
              </div>

              <!-- Estado de Estudio (Mapea a FORMACION_ACADEMICA) -->
              <div class="space-y-3 text-left text-left">
                <label class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 text-left text-left">Estado Actual</label>
                <select v-model="profileForm.estado_estudio" :disabled="!isEditing" class="form-input appearance-none text-left">
                  <option>Cursando</option>
                  <option>Egresado</option>
                  <option>Titulado</option>
                </select>
              </div>

              <div class="space-y-3 text-left">
                <label class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 text-left text-left text-left">DNI (Registrado)</label>
                <input v-model="profileForm.dni" :disabled="true" type="text" class="form-input bg-slate-50 text-slate-400 border-dashed text-left" />
              </div>

              <div class="space-y-3 text-left text-left">
                <label class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 text-left text-left">Teléfono de Contacto</label>
                <input v-model="profileForm.telefono" :disabled="!isEditing" type="tel" class="form-input text-left" placeholder="999 999 999" />
              </div>
            </div>

            <!-- Sello Universitario -->
            <div class="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-between text-left">
              <div class="flex items-center gap-5 text-left">
                <div class="p-4 rounded-2xl shadow-sm text-left" :class="user?.profile?.formacion?.[0]?.sello_universidad ? 'bg-emerald-100 text-emerald-600' : 'bg-white text-slate-300'">
                  <ShieldCheck :size="32" />
                </div>
                <div class="text-left text-left">
                  <p class="text-sm font-black uppercase text-slate-900 text-left">sello_universidad</p>
                  <p class="text-xs font-bold text-slate-500 text-left">{{ user?.profile?.formacion?.[0]?.sello_universidad ? 'Validado oficialmente.' : 'Esperando validación institucional.' }}</p>
                </div>
              </div>
            </div>

            <div v-if="isEditing" class="pt-6 animate-in slide-in-from-bottom-4 duration-500 text-left">
              <button 
                type="submit" 
                :disabled="isSaving"
                class="w-full bg-blue-600 text-white py-6 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-4 hover:bg-slate-900 transition-all shadow-2xl shadow-blue-600/20 active:scale-95 text-left"
              >
                <div v-if="isSaving" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin text-left text-left"></div>
                <Save v-else :size="20" class="text-left" />
                Sincronizar con Base de Datos
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Columna Lateral -->
      <div class="space-y-10 text-left">
        <div class="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl text-left">
          <h3 class="text-xl font-black uppercase tracking-[0.2em] mb-10 flex items-center gap-3 text-left">
            <PieChart :size="24" class="text-blue-400 text-left" /> Rendimiento
          </h3>
          <div class="space-y-8 text-left text-left">
            <div class="flex justify-between items-end border-b border-white/10 pb-6 text-left text-left">
              <span class="text-[10px] font-black text-white/40 uppercase tracking-widest text-left">Retos Superados</span>
              <span class="text-3xl font-black text-white leading-none text-left">{{ user?.stats?.approvedChallengesCount || 0 }}</span>
            </div>
            <div class="flex justify-between items-end border-b border-white/10 pb-6 text-left text-left">
              <span class="text-[10px] font-black text-white/40 uppercase tracking-widest text-left">Puesto Ranking</span>
              <span class="text-3xl font-black text-blue-400 leading-none text-left">#{{ user?.stats?.rank || '--' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "~/assets/css/index.css";

.form-input {
  @apply w-full bg-white border-2 border-slate-100 rounded-[1.25rem] px-8 py-5 text-sm font-black text-slate-800 outline-none focus:border-blue-600 transition-all shadow-inner;
}
</style>