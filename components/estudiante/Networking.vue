<script setup lang="ts">
import { Search, UserPlus, MessageSquare, Filter, Zap, Shield } from 'lucide-vue-next';

const students = [
  { 
    name: 'Sofia Rodriguez', 
    school: 'UPeU', 
    match: 98, 
    role: 'Software Architect', 
    status: 'Online', 
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    name: 'Marco Chen', 
    school: 'Stanford', 
    match: 94, 
    role: 'Fintech Specialist', 
    status: 'In a Call', 
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    name: 'Alex Thompson', 
    school: 'Harvard', 
    match: 91, 
    role: 'Product Designer', 
    status: 'Idle', 
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    name: 'Elena Petrova', 
    school: 'Oxford', 
    match: 88, 
    role: 'Data Scientist', 
    status: 'Mentoring', 
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    name: 'Hiroshi Tanaka', 
    school: 'Tokyo Tech', 
    match: 85, 
    role: 'Robotics Engineer', 
    status: 'Looking for partner', 
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400' 
  },
];
</script>

<template>
  <div class="space-y-12 pb-20 max-w-6xl mx-auto px-4">
    <header class="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div class="space-y-4">
        <span class="section-label">Conexiones Globales</span>
        <h1 class="text-5xl font-bold text-slate-900 leading-tight">Networking <br /><span class="text-blue-600">Académico.</span></h1>
        <p class="text-slate-500 max-w-lg font-medium leading-relaxed italic">
          Conecta con los talentos más destacados y mentores verificados de nuestra comunidad universitaria.
        </p>
      </div>
      
      <div class="flex bg-white border border-slate-200 rounded-2xl p-2 gap-4 items-center shadow-sm">
          <div class="flex items-center gap-2 px-4 border-r border-slate-100">
             <Zap :size="16" class="text-blue-600" />
             <span class="text-xs font-bold text-slate-600 tracking-tight">MATCH INTELIGENTE</span>
          </div>
          <button class="bg-blue-600 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-blue-600/20 active:scale-95 transition-all">Activar</button>
      </div>
    </header>

    <section class="flex flex-col md:flex-row gap-4">
      <div class="flex-1 relative">
        <Search class="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" :size="20" />
        <input 
          type="text" 
          placeholder="Buscar por habilidad, facultad o rol..."
          class="w-full bg-white border border-slate-200 rounded-2xl py-4 flex pl-14 pr-6 outline-none focus:border-blue-300 transition-all font-medium text-slate-600"
        />
      </div>
      <button class="bg-white border border-slate-200 px-8 py-4 rounded-2xl flex items-center gap-2 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
        <Filter :size="18" /> Filtros
      </button>
    </section>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div 
        v-for="(student, i) in students"
        :key="student.name"
        v-motion
        :initial="{ opacity: 0, scale: 0.95 }"
        :enter="{ opacity: 1, scale: 1, transition: { delay: i * 50 } }"
        class="bg-white border border-slate-100 group hover:border-blue-200 hover:shadow-xl transition-all duration-300 rounded-[32px] overflow-hidden relative shadow-sm"
      >
        <div class="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -translate-y-10 translate-x-10 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform opacity-50" />
        
        <div class="p-8">
          <div class="flex justify-between items-start mb-6">
            <div class="w-16 h-16 rounded-2xl overflow-hidden border border-slate-100 shadow-sm transition-transform group-hover:scale-105">
              <img 
                :src="student.avatar" 
                :alt="student.name" 
                class="w-full h-full object-cover"
                referrerpolicy="no-referrer"
              />
            </div>
            <div class="text-right">
              <span class="text-[9px] uppercase font-bold text-slate-400 tracking-widest flex items-center gap-1 justify-end">
                <Shield :size="10" class="text-blue-600" /> Match Score
              </span>
              <p class="text-3xl font-bold text-slate-900 leading-none mt-1">{{ student.match }}%</p>
            </div>
          </div>

          <h3 class="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{{ student.name }}</h3>
          <p class="text-sm font-medium text-slate-500 mt-1">{{ student.role }}</p>
          
          <div class="flex items-center gap-2 mt-3">
            <div :class="['w-2 h-2 rounded-full', student.status === 'Online' ? 'bg-green-500' : 'bg-amber-500']" />
            <span class="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{{ student.status }}</span>
          </div>

          <div class="mt-8 space-y-4">
            <p class="text-[10px] text-blue-600 font-black uppercase tracking-[0.2em]">{{ student.school }} University</p>
            <div class="flex gap-3">
              <button class="flex-1 bg-slate-50 hover:bg-slate-100 border border-slate-100 py-3 rounded-xl flex items-center justify-center transition-all text-slate-600">
                <MessageSquare :size="18" />
              </button>
              <button class="flex-[3] bg-slate-900 hover:bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all shadow-lg shadow-slate-900/10">
                <UserPlus :size="18" /> Conectar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="bg-blue-50/50 rounded-3xl p-12 border border-blue-100 relative overflow-hidden text-center shadow-sm">
       <div class="absolute inset-0 bg-radial-gradient from-blue-600/5 to-transparent opacity-50" />
       <div class="relative z-10 max-w-xl mx-auto space-y-6">
         <h2 class="text-4xl font-bold text-slate-900 leading-tight">¿Buscas una mentoría <span class="text-blue-600 italic">especializada?</span></h2>
         <p class="text-slate-500 font-medium leading-relaxed">
           Desbloquea el acceso a sesiones 1:1 con estudiantes de últimos ciclos y egresados destacados que ya laboran en el sector.
         </p>
         <button class="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95">Ver Mentorías Académicas</button>
       </div>
    </section>
  </div>
</template>
