<script setup lang="ts">
import { 
  ShieldCheck, 
  Users, 
  Lock, 
  Edit3, 
  Trash2, 
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  MoreHorizontal
} from 'lucide-vue-next';

const roles = ref([
  { id: 1, name: 'Super Admin', description: 'Control total del sistema y gestión de todos los módulos.', usersCount: 2, status: 'active', permissions: ['all'] },
  { id: 2, name: 'Estudiante', description: 'Acceso a retos, networking y visualización de sellos propios.', usersCount: 1284, status: 'active', permissions: ['read:challenges', 'write:submissions'] },
  { id: 3, name: 'Empresa', description: 'Publicación de retos, búsqueda de talento y evaluación.', usersCount: 42, status: 'active', permissions: ['write:challenges', 'read:talents'] },
  { id: 4, name: 'Moderador Académico', description: 'Revisión de contenidos y validación de sellos institucionales.', usersCount: 5, status: 'inactive', permissions: ['validate:badges', 'read:audit'] },
]);

const searchTerm = ref('');
const filteredRoles = computed(() => roles.value.filter(r => 
  r.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
  r.description.toLowerCase().includes(searchTerm.value.toLowerCase())
));
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h1 class="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <ShieldCheck class="w-8 h-8 text-indigo-600" />
          Gestión de Roles y Permisos
        </h1>
        <p class="text-slate-500 font-medium mt-1">Configura los niveles de acceso y responsabilidades de los usuarios.</p>
      </div>
      <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
        <Plus class="w-5 h-5" />
        Nuevo Rol
      </button>
    </div>

    <!-- Stats Mini -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div class="p-3 bg-indigo-50 rounded-xl">
          <ShieldCheck class="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <p class="text-sm font-bold text-slate-400 uppercase tracking-widest">Roles Definidos</p>
          <p class="text-2xl font-black text-slate-900">{{ roles.length }}</p>
        </div>
      </div>
      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div class="p-3 bg-blue-50 rounded-xl">
          <Users class="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <p class="text-sm font-bold text-slate-400 uppercase tracking-widest">Usuarios Mapeados</p>
          <p class="text-2xl font-black text-slate-900">1,333</p>
        </div>
      </div>
      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div class="p-3 bg-emerald-50 rounded-xl">
          <Lock class="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <p class="text-sm font-bold text-slate-400 uppercase tracking-widest">Permisos Activos</p>
          <p class="text-2xl font-black text-slate-900">24</p>
        </div>
      </div>
    </div>

    <!-- Table Section -->
    <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="relative max-w-md w-full">
          <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            v-model="searchTerm"
            type="text" 
            placeholder="Buscar rol por nombre o descripción..."
            class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm font-medium outline-none focus:bg-white focus:border-indigo-500 transition-all"
          />
        </div>
        <div class="flex gap-2">
          <button class="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">Exportar PDF</button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              <th class="px-8 py-4">Nombre del Rol</th>
              <th class="px-8 py-4">Descripción</th>
              <th class="px-8 py-4">Usuarios</th>
              <th class="px-8 py-4">Estado</th>
              <th class="px-8 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="role in filteredRoles" :key="role.id" class="hover:bg-slate-50/50 transition-colors group">
              <td class="px-8 py-5">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <ShieldCheck class="w-4 h-4 text-indigo-600" />
                  </div>
                  <span class="font-bold text-slate-900">{{ role.name }}</span>
                </div>
              </td>
              <td class="px-8 py-5">
                <p class="text-xs text-slate-500 font-medium max-w-xs line-clamp-1">{{ role.description }}</p>
              </td>
              <td class="px-8 py-5">
                <div class="flex items-center gap-2">
                  <Users class="w-3.5 h-3.5 text-slate-400" />
                  <span class="text-xs font-bold text-slate-700">{{ role.usersCount }}</span>
                </div>
              </td>
              <td class="px-8 py-5">
                <span 
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
                  :class="role.status === 'active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-100 text-slate-400 border border-slate-200'"
                >
                  <CheckCircle2 v-if="role.status === 'active'" class="w-3 h-3" />
                  <XCircle v-else class="w-3 h-3" />
                  {{ role.status === 'active' ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td class="px-8 py-5 text-right">
                <div class="flex justify-end gap-2">
                  <button class="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                    <Edit3 class="w-4 h-4" />
                  </button>
                  <button class="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                    <Trash2 class="w-4 h-4" />
                  </button>
                  <button class="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-all">
                    <MoreHorizontal class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
