<script setup lang="ts">
import { ArrowLeft, KeyRound, UserCircle2, Mail, Lock, LogIn } from 'lucide-vue-next';
import { ref } from 'vue';

definePageMeta({
  layout: false
});

const email = ref('');
const password = ref('');
const loading = ref(false);
const errorMessage = ref('');

const { login, fetchMe, token } = useUser();
const config = useRuntimeConfig();

const handleLogin = async () => {
  loading.value = true;
  errorMessage.value = '';

  const result = await login({
    username: email.value,
    password: password.value
  });

  loading.value = false;

  if (result.success) {
    if (result.role === 'admin') navigateTo('/admin/dashboard'); 
    else if (result.role === 'employer') navigateTo('/empresa/dashboard'); 
    else navigateTo('/estudiante/dashboard');
  } else {
    errorMessage.value = result.message || 'Credenciales incorrectas';
  }
};
</script>

<template>
  <div class="flex min-h-screen w-full bg-slate-50 font-sans">
    <!-- LEFT SIDE: INFO -->
    <div class="hidden lg:flex w-[40%] p-16 flex-col justify-between sticky top-0 h-screen bg-indigo-700 transition-colors duration-700 shadow-2xl z-20">
      <div class="relative z-10">
        <h1 class="text-3xl font-black text-white leading-tight tracking-tighter flex items-center gap-2">
          <div class="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <div class="w-4 h-4 rounded-sm bg-indigo-700"></div>
          </div>
          Certian.
        </h1>
        <p class="mt-4 text-[10px] uppercase tracking-[0.2em] text-white/60 font-black">Portal de Acceso Centralizado</p>
      </div>

      <div class="relative z-10 space-y-12">
        <h2 class="text-6xl font-extrabold text-white leading-[1.1] tracking-tight italic">
          Bienvenido <br /> 
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-white">
            de vuelta.
          </span>
        </h2>
        <div class="space-y-8">
          <div class="flex items-center gap-5 text-white group">
            <div class="p-3 bg-white/10 rounded-2xl group-hover:bg-white/20 transition-colors">
              <UserCircle2 :size="28" class="text-indigo-200" />
            </div>
            <div class="text-left">
              <p class="font-black text-lg tracking-tight">Panel Personalizado</p>
              <p class="text-white/60 text-sm font-bold">Accede a tus herramientas de gestión.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="relative z-10 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
        <p class="text-sm text-white/70 font-medium italic">* Acceso restringido para socios validados.</p>
      </div>

      <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-black/20 rounded-full blur-3xl -ml-48 -mb-48"></div>
    </div>

    <!-- RIGHT SIDE: FORM -->
    <div class="flex-1 flex items-center justify-center p-8 lg:p-16">
      <div 
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0 }"
        class="w-full max-w-md space-y-12"
      >
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <h3 class="text-4xl font-black text-slate-900 tracking-tight italic uppercase">Iniciar Sesión</h3>
            <NuxtLink to="/" class="p-2 hover:bg-slate-100 rounded-full transition-colors group">
              <ArrowLeft :size="20" class="text-slate-400 group-hover:text-slate-900" />
            </NuxtLink>
          </div>
          <p class="text-slate-400 font-bold italic text-lg leading-relaxed">
            Ingresa tus credenciales para acceder a tu perfil profesional.
          </p>

          <div v-if="errorMessage" class="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl text-sm font-bold flex items-center gap-3 animate-shake">
            {{ errorMessage }}
          </div>
        </div>

        <form class="space-y-8" @submit.prevent="handleLogin">
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Correo Electrónico</label>
            <input 
              v-model="email"
              type="text" 
              required
              class="form-input" 
              placeholder="usuario@upeu.edu.pe" 
            />
          </div>

          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Contraseña</label>
            <input 
              v-model="password"
              type="password" 
              required
              class="form-input" 
              placeholder="••••••••" 
            />
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="w-full flex items-center justify-center gap-3 bg-slate-900 text-white hover:bg-indigo-700 py-6 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-2xl active:scale-[0.98]"
          >
            <div v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <LogIn v-else :size="18" class="text-left" />
            <span class="text-left">{{ loading ? 'Verificando...' : 'Entrar a Certian' }}</span>
          </button>
        </form>

        <div class="mt-12 pt-12 border-t border-slate-100 flex flex-col items-center gap-8">
          <p class="text-sm font-bold text-slate-500">
            ¿Aún no tienes cuenta? 
            <NuxtLink to="/register" class="text-indigo-600 hover:text-indigo-800 font-black transition-colors ml-1 underline">Registrarse</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "~/assets/css/index.css";
.form-input {
  @apply w-full bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-indigo-500 outline-none transition-all font-bold text-slate-700 shadow-sm;
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}
.animate-shake {
  animation: shake 0.3s ease-in-out;
}
</style>