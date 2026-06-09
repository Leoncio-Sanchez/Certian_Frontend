<script setup lang="ts">
import { 
  Building2, 
  Plus, 
  Search, 
  MapPin, 
  Globe, 
  Users, 
  ExternalLink 
} from 'lucide-vue-next';

const institutions = ref([
  { id: 1, name: 'Universidad Peruana Unión', alias: 'UPeU', campus: 'Lima, Juliaca, Tarapoto', students: 12000, status: 'verified' },
  { id: 2, name: 'Instituto Tecnológico CERTIAN', alias: 'CERTIAN', campus: 'Lima', students: 2500, status: 'verified' },
]);
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h1 class="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <Building2 class="w-8 h-8 text-emerald-600" />
          Gestión de Instituciones
        </h1>
        <p class="text-slate-500 font-medium mt-1">Configura las facultades y sedes que forman parte de la red Certian.</p>
      </div>
      <button class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/20 active:scale-95">
        <Plus class="w-5 h-5" />
        Añadir Institución
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="inst in institutions" :key="inst.id" class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
        <div class="flex justify-between items-start">
          <div class="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-100">
            <Building2 class="w-8 h-8 text-emerald-600" />
          </div>
          <span class="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase rounded-full border border-emerald-200">Verificada</span>
        </div>
        <div class="mt-6">
          <h3 class="text-xl font-black text-slate-900">{{ inst.name }}</h3>
          <p class="text-sm font-bold text-emerald-600 mt-1 uppercase tracking-widest">{{ inst.alias }}</p>
          
          <div class="mt-6 space-y-3">
            <div class="flex items-center gap-3 text-slate-500">
              <MapPin class="w-4 h-4" />
              <span class="text-xs font-medium">{{ inst.campus }}</span>
            </div>
            <div class="flex items-center gap-3 text-slate-500">
              <Users class="w-4 h-4" />
              <span class="text-xs font-medium">{{ inst.students.toLocaleString() }} Estudiantes Matriculados</span>
            </div>
          </div>
        </div>
        <div class="mt-8 pt-6 border-t border-slate-100 flex gap-3">
          <button class="flex-1 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-emerald-600 transition-colors">Configurar</button>
          <button class="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-colors"><ExternalLink class="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  </div>
</template>
