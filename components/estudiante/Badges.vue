<script setup lang="ts">
import { Award, Star, Users, Brain, Code, Palette, ArrowRight } from 'lucide-vue-next';

const badges = [
  { title: 'Frontend Master', level: 'Diamond', date: 'May 2024', provider: 'Google', university: 'Universidad Peruana Unión', icon: Code, color: 'text-blue-400' },
  { title: 'UI Architect', level: 'Gold', date: 'Apr 2024', provider: 'Apple', university: 'Universidad Peruana Unión', icon: Palette, color: 'text-pink-400' },
  { title: 'Algorithmic Thinker', level: 'Silver', date: 'Mar 2024', provider: 'Nvidia', university: 'Universidad Peruana Unión', icon: Brain, color: 'text-green-400' },
  { title: 'Community Leader', level: 'Elite', date: 'Feb 2024', provider: 'OpenAI', university: 'Universidad Peruana Unión', icon: Users, color: 'text-accent' },
];

const stats = [
  { label: 'Sellos Obtenidos', value: 8 },
  { label: 'Proyectos Reales', value: 4 },
  { label: 'Horas Totales', value: 140 },
  { label: 'Siguiente Meta', value: '60h' },
];
</script>

<template>
  <div class="space-y-12 pb-20 max-w-6xl mx-auto px-4">
    <header class="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div class="space-y-4">
        <span class="section-label">Certificaciones y Reconocimientos</span>
        <h1 class="text-5xl font-bold text-slate-900 leading-tight">Mis Sellos <br /><span class="text-blue-600">Académicos.</span></h1>
        <p class="text-slate-500 max-w-md font-medium leading-relaxed italic">
          Colección de validaciones obtenidas mediante la resolución de retos. <br />
          Certificado oficial disponible cada <span class="text-blue-700 font-bold">200 horas</span> acumuladas.
        </p>
      </div>
      
      <div class="p-6 bg-blue-600 rounded-2xl shadow-xl shadow-blue-600/20 text-white">
         <p class="text-[10px] uppercase font-bold text-blue-100 tracking-widest mb-1 text-center">Estatus Global</p>
         <h3 class="text-2xl font-bold text-center">Talento Validado</h3>
      </div>
    </header>

    <!-- Statistics -->
    <section class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div v-for="(s, i) in stats" :key="i" class="bg-white border border-slate-200 p-6 text-center rounded-xl shadow-sm">
        <p class="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{{ s.label }}</p>
        <p class="text-3xl font-bold mt-1 text-slate-900">{{ s.value }}</p>
      </div>
    </section>

    <!-- Grid of Badges -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-10">
      <div 
        v-for="(badge, i) in badges"
        :key="i"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: i * 100 } }"
        class="bg-white group overflow-hidden border border-slate-200 rounded-[2rem] flex flex-col sm:flex-row transition-all duration-300 shadow-sm hover:shadow-xl hover:border-blue-200"
      >
        <!-- Icon Section -->
        <div class="w-full sm:w-52 h-52 bg-slate-50 flex items-center justify-center p-12 shrink-0 relative overflow-hidden">
           <div class="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
           <component :is="badge.icon" :class="['w-full h-full relative z-10 transition-all duration-700 group-hover:scale-110', badge.color]" />
        </div>

        <!-- Content Section -->
        <div class="p-10 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-all leading-tight">
              {{ badge.title }}
            </h3>
            <div class="flex items-center gap-2 mt-2 text-blue-600 font-medium italic">
              <Star :size="12" class="fill-blue-600/20" />
              <span class="text-xs">Validado el {{ badge.date }}</span>
            </div>
          </div>
          
          <div class="mt-8 pt-6 border-t border-slate-100 flex items-end justify-between">
            <div class="space-y-1">
              <p class="text-[9px] uppercase font-black text-slate-400 tracking-widest">Institución Emisora</p>
              <p class="text-xs font-bold text-slate-700 leading-tight">
                {{ badge.university }} <br />
                <span class="text-blue-600">+ {{ badge.provider }}</span>
              </p>
            </div>
            
            <button class="text-[10px] uppercase tracking-[0.2em] font-black text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2 group/btn">
              <span>Ver Credencial</span>
              <ArrowRight :size="14" class="transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Claim Section -->
    <section class="py-20 text-center space-y-6">
      <div class="inline-block p-6 rounded-full bg-blue-50 border border-blue-100 mb-4">
         <Award :size="48" class="text-blue-600" />
      </div>
      <h2 class="text-4xl font-bold text-slate-900">¿Tienes otros logros?</h2>
      <p class="text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
        Sube tus certificaciones de otras plataformas. Nuestro sistema integrado las verificará para sumarlas a tu historial de horas validadas en Certian.
      </p>
      <button class="px-10 py-4 border-2 border-slate-200 text-slate-900 rounded-xl font-bold hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm">Solicitar Validación Manual</button>
    </section>
  </div>
</template>
