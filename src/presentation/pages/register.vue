<script setup lang="ts">
import { ArrowLeft, CheckCircle2, GraduationCap, Building2, User, Mail, Lock, Phone, CreditCard, Briefcase, Calendar, Image as ImageIcon, Globe, School } from 'lucide-vue-next';

definePageMeta({
  layout: false
});

const registerType = ref<'student' | 'employer'>('student');
const loading = ref(false);
const errorMessage = ref('');

// Campos comunes
const email = ref('');
const password = ref('');

// Datos de Estudiante
const studentData = reactive({
  dni: '',
  nombres: '',
  apellidos: '',
  carrera: 'Ingeniería de Sistemas',
  ciclo: '7mo',
  telefono: '',
  universidad_instituto: 'Universidad Peruana Unión',
  estado_estudio: 'Cursando'
});

// Datos de Empresa
const employerData = reactive({
  razonSocial: '',
  ruc: '',
  rubro: '',
  logoUrl: '',
  contactName: '',
  contactRole: ''
});

const { register } = useUser();

const handleRegister = async () => {
  loading.value = true;
  errorMessage.value = '';

  const payload: any = {
    username: email.value,
    email: email.value,
    password: password.value,
    role: registerType.value === 'student' ? 'ESTUDIANTE' : 'EMPRESA',
  };

  if (registerType.value === 'student') {
    Object.assign(payload, {
      dni: studentData.dni,
      nombres: studentData.nombres,
      apellidos: studentData.apellidos,
      carrera: studentData.carrera,
      ciclo: studentData.ciclo,
      telefono: studentData.telefono,
      correo_contacto: email.value,
      // Datos para la tabla FORMACION_ACADEMICA (Backend ahora los procesa)
      universidad_instituto: studentData.universidad_instituto,
      estado_estudio: studentData.estado_estudio
    });
  } else {
    Object.assign(payload, {
      razon_social: employerData.razonSocial,
      ruc: employerData.ruc,
      rubro: employerData.rubro,
      logo_url: employerData.logoUrl,
      contact_name: employerData.contactName,
      contact_role: employerData.contactRole
    });
  }

  const result = await register(payload);
  loading.value = false;

  if (result.success) {
    alert('Registro exitoso. Sincronizando perfil...');
    navigateTo('/login');
  } else {
    errorMessage.value = result.message || 'Error al registrarse';
  }
};
</script>

<template>
  <div class="flex min-h-screen w-full bg-slate-50 font-sans text-left">
    <!-- PANEL INFORMATIVO -->
    <div class="hidden lg:flex w-[40%] p-16 flex-col justify-between sticky top-0 h-screen transition-colors duration-700 shadow-2xl z-20" :class="registerType === 'student' ? 'bg-indigo-700' : 'bg-slate-900'">
      <div class="relative z-10 text-left">
        <h1 class="text-3xl font-black text-white leading-tight tracking-tighter flex items-center gap-2">
          <div class="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <div class="w-4 h-4 rounded-sm" :class="registerType === 'student' ? 'bg-indigo-700' : 'bg-slate-900'"></div>
          </div>
          Certian.
        </h1>
        <p class="mt-4 text-[10px] uppercase tracking-[0.2em] text-white/60 font-black">Ecosistema Meritocrático</p>
      </div>
      
      <div class="relative z-10 space-y-10 text-left text-white">
        <h2 class="text-6xl font-extrabold leading-[1.1] tracking-tighter italic">
          {{ registerType === 'student' ? 'Registra tu' : 'Conecta con' }} <br /> 
          <span class="text-indigo-200">{{ registerType === 'student' ? 'Talento Académico.' : 'Potencial.' }}</span>
        </h2>
        <p class="font-bold opacity-80 text-lg leading-relaxed">
          {{ registerType === 'student' ? 'Crea tu perfil oficial y vincula tu formación académica para acceder a retos de élite.' : 'Acceso exclusivo a perfiles validados por la universidad.' }}
        </p>
      </div>

      <div class="relative z-10 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm text-left">
        <p class="text-sm text-white/70 font-medium italic">* Los datos académicos se sincronizarán al iniciar sesión.</p>
      </div>
    </div>

    <!-- FORMULARIO -->
    <div class="flex-1 flex items-start justify-center p-8 lg:p-16 overflow-y-auto text-left">
      <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" class="w-full max-w-xl py-10">
        <div class="mb-12 flex justify-between items-center text-left text-left text-left">
          <h3 class="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Registrarse</h3>
          <NuxtLink to="/" class="p-4 hover:bg-slate-100 rounded-full transition-colors"><ArrowLeft :size="24" /></NuxtLink>
        </div>

        <!-- SELECTOR -->
        <div class="grid grid-cols-2 p-1.5 bg-slate-200/50 rounded-2xl mb-12 text-left">
          <button @click="registerType = 'student'" class="flex items-center justify-center gap-3 py-3 text-sm font-black uppercase tracking-wider rounded-xl transition-all" :class="registerType === 'student' ? 'bg-white text-indigo-600 shadow-xl' : 'text-slate-500'">
            <GraduationCap :size="18" /> Estudiante
          </button>
          <button @click="registerType = 'employer'" class="flex items-center justify-center gap-3 py-3 text-sm font-black uppercase tracking-wider rounded-xl transition-all" :class="registerType === 'employer' ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-500'">
            <Building2 :size="18" /> Empresa
          </button>
        </div>

        <form class="space-y-12 text-left text-left text-left text-left" @submit.prevent="handleRegister">
          <!-- CREDENCIALES -->
          <div class="space-y-6 text-left">
            <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2 text-left">1. Credenciales</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div class="space-y-2 text-left">
                <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 text-left">Email</label>
                <input v-model="email" type="email" required class="form-input" placeholder="usuario@upeu.edu.pe" />
              </div>
              <div class="space-y-2 text-left text-left">
                <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 text-left">Contraseña</label>
                <input v-model="password" type="password" required class="form-input" placeholder="••••••••" />
              </div>
            </div>
          </div>

          <!-- DATOS PERSONALES Y ACADÉMICOS -->
          <div v-if="registerType === 'student'" class="space-y-10 animate-in fade-in duration-500 text-left">
            <div class="space-y-6 text-left">
              <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2 text-left">2. Información del Estudiante</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div class="space-y-2 text-left"><label class="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 text-left">Nombres</label><input v-model="studentData.nombres" type="text" required class="form-input" /></div>
                <div class="space-y-2 text-left"><label class="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 text-left">Apellidos</label><input v-model="studentData.apellidos" type="text" required class="form-input" /></div>
                <div class="space-y-2 text-left"><label class="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 text-left">DNI</label><input v-model="studentData.dni" type="text" required class="form-input" /></div>
                <div class="space-y-2 text-left"><label class="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 text-left">Teléfono</label><input v-model="studentData.telefono" type="tel" required class="form-input" /></div>
              </div>
            </div>

            <!-- FORMACIÓN ACADÉMICA -->
            <div class="space-y-6 pt-6 border-t border-slate-100 text-left">
              <h4 class="text-[10px] font-black uppercase tracking-widest text-blue-600 flex items-center gap-2 text-left"><School :size="14" class="text-left" /> 3. Formación Académica (Tabla BD)</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div class="col-span-full space-y-2 text-left text-left">
                  <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 text-left">Universidad / Instituto</label>
                  <input v-model="studentData.universidad_instituto" type="text" required class="form-input border-blue-100 bg-blue-50/20" placeholder="Ej. Universidad Peruana Unión" />
                </div>
                <div class="space-y-2 text-left text-left">
                  <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 text-left text-left text-left">Carrera</label>
                  <select v-model="studentData.carrera" class="form-input appearance-none text-left">
                    <option>Ingeniería de Sistemas</option>
                    <option>Ciencias de la Salud</option>
                    <option>Administración & Negocios</option>
                    <option>Educación & Teología</option>
                    <option>Ingeniería Civil & Arquitectura</option>
                  </select>
                </div>
                <div class="space-y-2 text-left text-left text-left">
                  <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 text-left">Estado Estudio</label>
                  <select v-model="studentData.estado_estudio" class="form-input appearance-none text-left">
                    <option>Cursando</option>
                    <option>Egresado</option>
                    <option>Titulado</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" :disabled="loading" class="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs transition-all shadow-2xl active:scale-[0.98] disabled:opacity-50 text-left">
            {{ loading ? 'Sincronizando...' : 'Finalizar Registro' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "~/assets/css/index.css";
.form-input {
  @apply w-full bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-indigo-500 outline-none transition-all font-bold text-slate-700 shadow-sm;
}
</style>