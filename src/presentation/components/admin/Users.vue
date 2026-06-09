<script setup lang="ts">
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Shield, 
  CheckCircle2,
  XCircle,
  Trash2,
  Edit,
  UserCheck,
  UserX
} from 'lucide-vue-next';
import { ref, computed, onMounted } from 'vue';

const config = useRuntimeConfig();
const { token } = useUser();

const users = ref<any[]>([]);
const loading = ref(true);
const actionMenuId = ref<number | null>(null);

const fetchUsers = async () => {
  try {
    loading.value = true;
    const response: any = await $fetch(`${config.public.apiUrl}/admin/users`, {
      headers: { Authorization: `Bearer ${token.value}` }
    });
    
    const usersData = response.data || response.users || response || [];
    users.value = Array.isArray(usersData) ? usersData.map((u: any) => ({
      id: u.id_usuario || u.id,
      name: u.estudianteProfile?.nombre || u.empresaProfile?.nombre_empresa || u.username || 'Usuario Sin Nombre',
      email: u.username || u.email || 'N/A',
      role: u.usuarioRol?.[0]?.rol?.nombre_rol || u.role || 'Usuario',
      roleId: u.id_usuario_tipo || (u.usuarioRol?.[0]?.id_rol),
      status: (u.estado_cuenta === 1 || u.status === 'active') ? 'active' : 'pending',
      lastLogin: 'Recientemente'
    })) : [];
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    loading.value = false;
  }
};

const updateUserStatus = async (userId: number, newStatus: number) => {
  try {
    await $fetch(`${config.public.apiUrl}/admin/users/${userId}/status`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token.value}` },
      body: { estado_cuenta: newStatus }
    });
    await fetchUsers();
    actionMenuId.value = null;
  } catch (error) {
    alert('Error al actualizar el estado');
  }
};

const deleteUser = async (userId: number) => {
  if (!confirm('¿Estás seguro de eliminar este usuario permanentemente?')) return;
  try {
    await $fetch(`${config.public.apiUrl}/admin/users/${userId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token.value}` }
    });
    await fetchUsers();
  } catch (error) {
    alert('Error al eliminar el usuario');
  }
};

const toggleMenu = (id: number) => {
  actionMenuId.value = actionMenuId.value === id ? null : id;
};

onMounted(() => {
  fetchUsers();
});

const searchTerm = ref('');
const filteredUsers = computed(() => users.value.filter(u => 
  u.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
  u.email.toLowerCase().includes(searchTerm.value.toLowerCase())
));
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h1 class="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <Users class="w-8 h-8 text-blue-600" />
          Gestión de Usuarios
        </h1>
        <p class="text-slate-500 font-medium mt-1">Administra el acceso y los perfiles de todos los miembros de la plataforma.</p>
      </div>
      <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 active:scale-95">
        <UserPlus class="w-5 h-5" />
        Añadir Usuario
      </button>
    </div>

    <!-- Filters & Search -->
    <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="relative max-w-md w-full">
          <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            v-model="searchTerm"
            type="text" 
            placeholder="Buscar por nombre, email..."
            class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm font-medium outline-none focus:bg-white focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      <!-- User Table -->
      <div class="overflow-x-auto min-h-[400px]">
        <table class="w-full text-left">
          <thead>
            <tr class="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              <th class="px-8 py-4">Usuario</th>
              <th class="px-8 py-4">Rol</th>
              <th class="px-8 py-4">Estado</th>
              <th class="px-8 py-4">Último Acceso</th>
              <th class="px-8 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-if="loading" v-for="i in 3" :key="i" class="animate-pulse">
               <td colspan="5" class="px-8 py-10 bg-slate-50/20"></td>
            </tr>
            <tr v-else v-for="user in filteredUsers" :key="user.id" class="hover:bg-slate-50/50 transition-colors group relative">
              <td class="px-8 py-5">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400 border border-slate-200">
                    {{ user.name.split(' ').map(n => n[0]).join('') }}
                  </div>
                  <div>
                    <p class="text-sm font-bold text-slate-900">{{ user.name }}</p>
                    <p class="text-[10px] text-slate-400 font-medium">{{ user.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-8 py-5">
                <div class="flex items-center gap-2">
                  <Shield class="w-3.5 h-3.5 text-slate-400" />
                  <span class="text-xs font-bold text-slate-700">{{ user.role }}</span>
                </div>
              </td>
              <td class="px-8 py-5">
                <span 
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
                  :class="user.status === 'active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'"
                >
                  <CheckCircle2 v-if="user.status === 'active'" class="w-3 h-3" />
                  <XCircle v-else class="w-3 h-3" />
                  {{ user.status === 'active' ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td class="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-tighter">
                {{ user.lastLogin }}
              </td>
              <td class="px-8 py-5 text-right relative">
                <button 
                  @click="toggleMenu(user.id)"
                  class="p-2 text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <MoreVertical class="w-4 h-4" />
                </button>
                
                <!-- Floating Action Menu -->
                <div v-if="actionMenuId === user.id" class="absolute right-8 top-12 z-20 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2">
                   <button 
                    @click="updateUserStatus(user.id, user.status === 'active' ? 0 : 1)"
                    class="w-full text-left px-4 py-3 text-xs font-bold flex items-center gap-2 hover:bg-slate-50 transition-colors"
                    :class="user.status === 'active' ? 'text-amber-600' : 'text-emerald-600'"
                   >
                     <UserX v-if="user.status === 'active'" class="w-4 h-4" />
                     <UserCheck v-else class="w-4 h-4" />
                     {{ user.status === 'active' ? 'Desactivar' : 'Activar' }}
                   </button>
                   <button 
                    @click="deleteUser(user.id)"
                    class="w-full text-left px-4 py-3 text-xs font-bold text-rose-600 flex items-center gap-2 hover:bg-rose-50 transition-colors"
                   >
                     <Trash2 class="w-4 h-4" />
                     Eliminar Usuario
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
