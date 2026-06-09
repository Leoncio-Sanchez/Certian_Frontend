<script setup lang="ts">
import { 
  Search, 
  Filter, 
  MapPin, 
  Mail, 
  Award, 
  Sparkles, 
  Check, 
  X, 
  Compass, 
  CheckCircle2,
  TrendingUp,
  Users,
  Star,
  Zap,
  Code,
  Rocket,
  Heart,
  Crown,
  Briefcase,
  Clock,
  Flame,
  Shield,
  Activity,
  ShieldCheck,
  ChevronDown,
  Target,
  Trophy,
  User,
  Github,
  Linkedin,
  ExternalLink,
  ArrowLeft,
  Smartphone,
  Fingerprint,
  GraduationCap,
  Layers,
  Info,
  Building2
} from 'lucide-vue-next';
import { INITIAL_CANDIDATES } from '~/utils/empresaData';
import type { Candidate } from '~/types/empresa';
import { ref, computed, onMounted } from 'vue';

const config = useRuntimeConfig();
const { token } = useUser();

const candidates = ref<Candidate[]>([]);
const loading = ref(true);

// Profile Drawer State
const showProfileDrawer = ref(false);
const selectedCandidate = ref<Candidate | null>(null);

const searchTerm = ref("");
const selectedCareer = ref("Todas");
const selectedCycle = ref("Todos");
const invitedList = ref<string[]>([]);

const fetchTalents = async () => {
  try {
    loading.value = true;
    const response: any = await $fetch(`${config.public.apiUrl}/company/talents`, {
      headers: { Authorization: `Bearer ${token.value}` }
    });
    
    const apiData = response.data || response || [];
    if (Array.isArray(apiData) && apiData.length > 0) {
      candidates.value = apiData.map((cand: any) => ({
        ...cand,
        badge: mapToLevel(cand.badge),
        challengesCompleted: (cand.challengesCompleted || []).map((ch: any) => ({
          ...ch,
          seal: mapToLevel(ch.seal)
        }))
      }));
    } else {
      candidates.value = INITIAL_CANDIDATES.map(c => ({
        ...c,
        badge: mapToLevel(c.badge),
        challengesCompleted: c.challengesCompleted?.map(ch => ({ ...ch, seal: mapToLevel(ch.seal) }))
      }));
    }
  } catch (error) {
    candidates.value = INITIAL_CANDIDATES.map(c => ({
      ...c,
      badge: mapToLevel(c.badge),
      challengesCompleted: c.challengesCompleted?.map(ch => ({ ...ch, seal: mapToLevel(ch.seal) }))
    }));
  } finally {
    loading.value = false;
  }
};

const mapToLevel = (val: string | null | undefined): string => {
  if (!val) return "Básico";
  const v = val.toLowerCase();
  if (v === "avanzado" || v === "gold" || v === "diamond") return "Avanzado";
  if (v === "medio" || v === "sapphire" || v === "ruby") return "Medio";
  return "Básico";
};

onMounted(() => {
  fetchTalents();
});

const careers = computed(() => ["Todas", ...new Set(candidates.value.map(c => c.career.split(" ")[0]))]);
const cycles = ["Todos", "7mo Ciclo", "8vo Ciclo", "9no Ciclo", "10mo Ciclo"];

const filteredCandidates = computed(() => {
  return candidates.value.filter(cand => {
    const matchesSearch = cand.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                          cand.techStack.some(t => t.toLowerCase().includes(searchTerm.value.toLowerCase())) ||
                          cand.career.toLowerCase().includes(searchTerm.value.toLowerCase());
    const matchesCareer = selectedCareer.value === "Todas" || cand.career.includes(selectedCareer.value);
    const matchesCycle = selectedCycle.value === "Todos" || cand.cycle === selectedCycle.value;
    return matchesSearch && matchesCareer && matchesCycle;
  });
});

const handleInvite = (candName: string) => {
  if (!invitedList.value.includes(candName)) {
    invitedList.value.push(candName);
  }
};

const showProfile = (cand: Candidate) => {
  selectedCandidate.value = cand;
  showProfileDrawer.value = true;
};

const closeDrawer = () => {
  showProfileDrawer.value = false;
};

const totalCandidates = computed(() => candidates.value.length);
</script>

<template>
  <div class="min-h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased overflow-x-hidden relative text-left">
    
    <main class="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto space-y-8 pb-20 text-left">
      
      <!-- Header -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 text-left">
        <div class="text-left text-left">
          <h1 class="text-3xl font-black text-slate-900 tracking-tight text-left uppercase">
            Explorador de <span class="text-[#245DFF]">Talento</span>
          </h1>
          <p class="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1 text-left text-left">
            CONECTA CON TALENTO VALIDADO POR <span class="text-slate-900 font-extrabold bg-amber-100 px-1.5 py-0.5 rounded">CERTIAN</span>
          </p>
        </div>
        
        <div class="flex-1 max-w-2xl flex flex-col md:flex-row gap-4">
          <div class="flex-1 relative group">
            <Search class="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-[#245DFF] transition-colors" />
            <input
              type="text"
              placeholder="Buscar talento..."
              v-model="searchTerm"
              class="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none focus:border-[#245DFF] focus:ring-4 focus:ring-[#245DFF]/5 transition-all font-medium shadow-sm"
            />
          </div>

          <div class="flex gap-3 text-left">
            <div class="relative group text-left">
              <select
                v-model="selectedCareer"
                class="bg-white border border-slate-200 rounded-xl pl-4 pr-10 py-2.5 text-[10px] outline-none focus:border-[#245DFF] transition-all cursor-pointer appearance-none font-black text-slate-700 uppercase tracking-widest shadow-sm"
              >
                <option v-for="c in careers" :key="c" :value="c">{{ c === "Todas" ? "CARRERAS" : c }}</option>
              </select>
              <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
            <div class="relative group text-left">
              <select
                v-model="selectedCycle"
                class="bg-white border border-slate-200 rounded-xl pl-4 pr-10 py-2.5 text-[10px] outline-none focus:border-[#245DFF] transition-all cursor-pointer appearance-none font-black text-slate-700 uppercase tracking-widest shadow-sm"
              >
                <option v-for="cy in cycles" :key="cy" :value="cy">{{ cy === "Todos" ? "CICLOS" : cy }}</option>
              </select>
              <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <!-- KPI Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div class="bg-white rounded-2xl border border-slate-100 flex overflow-hidden shadow-sm text-left">
          <div class="w-1.5 bg-emerald-500"></div>
          <div class="p-5 flex-1 flex flex-col justify-between">
            <div class="flex justify-between items-start text-left">
              <div class="p-2.5 bg-emerald-50 rounded-xl text-emerald-600"><Users class="w-4 h-4" /></div>
              <span class="text-[8px] font-bold tracking-wider bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full uppercase">Activas</span>
            </div>
            <div class="mt-3 text-left">
              <h3 class="text-2xl font-black text-slate-800 text-left">{{ totalCandidates }}</h3>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5 text-left">Postulaciones Totales</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-2xl border border-slate-100 flex overflow-hidden shadow-sm text-left">
          <div class="w-1.5 bg-blue-500"></div>
          <div class="p-5 flex-1 flex flex-col justify-between">
            <div class="flex justify-between items-start text-left">
              <div class="p-2.5 bg-blue-50 rounded-xl text-[#245DFF]"><Activity class="w-4 h-4" /></div>
              <span class="text-[8px] font-bold tracking-wider bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full uppercase">Activos</span>
            </div>
            <div class="mt-3 text-left">
              <h3 class="text-2xl font-black text-slate-800 text-left">2</h3>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5 text-left text-left">Retos Publicados</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-2xl border border-slate-100 flex overflow-hidden shadow-sm text-left">
          <div class="w-1.5 bg-purple-500"></div>
          <div class="p-5 flex-1 flex flex-col justify-between">
            <div class="flex justify-between items-start text-left">
              <div class="p-2.5 bg-purple-50 rounded-xl text-purple-600"><ShieldCheck class="w-4 h-4" /></div>
              <span class="text-[8px] font-bold tracking-wider bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full uppercase text-left">Revisión</span>
            </div>
            <div class="mt-3 text-left">
              <h3 class="text-2xl font-black text-slate-800 text-left">0</h3>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5 text-left text-left">Por Calificar</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Talent Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        <article v-for="cand in filteredCandidates" :key="cand.id" class="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between overflow-hidden hover:shadow-md transition-shadow group text-left">
          <div class="h-1.5 w-full bg-[#245DFF]"></div>
          
          <div class="p-5 flex-1 flex flex-col justify-between relative text-left">
            <div class="flex items-start gap-4 mb-6 text-left">
              <div class="relative shrink-0 text-left">
                <img :src="cand.avatar" class="w-14 h-14 rounded-2xl object-cover border-2 border-slate-100 shadow-sm" />
                <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-sm text-left text-left"></div>
              </div>
              <div class="flex-1 min-w-0 text-left">
                <h4 @click="showProfile(cand)" class="text-sm font-black text-slate-800 hover:text-blue-600 transition-colors cursor-pointer truncate uppercase tracking-tight text-left">{{ cand.name }}</h4>
                <p class="text-[10px] font-extrabold text-slate-500 tracking-wide uppercase truncate mt-0.5 text-left">{{ cand.career }}</p>
                <div class="flex gap-1.5 mt-2 text-left">
                  <span class="text-[8px] font-black px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded uppercase text-left">{{ cand.cycle }}</span>
                  <span class="text-[8px] font-black px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded uppercase text-left">{{ cand.badge }}</span>
                </div>
              </div>
            </div>

            <div class="mb-6 min-h-[60px] flex items-center text-left">
              <div class="flex flex-wrap gap-1.5 text-left">
                <span v-for="tech in cand.techStack.slice(0, 4)" :key="tech" class="text-[8px] font-black uppercase tracking-widest px-2 py-1 bg-slate-50 text-slate-800 rounded-lg border border-slate-100 text-left">
                  {{ tech }}
                </span>
                <span v-if="cand.techStack.length > 4" class="text-[8px] font-black px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-left">
                  +{{ cand.techStack.length - 4 }}
                </span>
              </div>
            </div>

            <div class="pt-4 border-t border-slate-100 flex items-center gap-3 text-left">
              <button @click="showProfile(cand)" class="flex-1 py-2.5 rounded-xl text-[10px] font-black border-2 border-slate-100 text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all uppercase tracking-wider flex items-center justify-center gap-2 text-left">
                <User :size="14" /> PERFIL
              </button>
              <button @click.stop="handleInvite(cand.name)" class="flex-1 py-2.5 rounded-xl text-[10px] font-black transition-all shadow-lg shadow-blue-600/10 uppercase tracking-wider flex items-center justify-center gap-2 text-left" :class="invitedList.includes(cand.name) ? 'bg-emerald-50 text-emerald-700 border-2 border-emerald-100' : 'bg-[#245DFF] text-white hover:bg-blue-700'">
                <template v-if="invitedList.includes(cand.name)"><Check :size="14" /> ENVIADO</template>
                <template v-else><Zap :size="14" /> ENTREVISTA</template>
              </button>
            </div>
          </div>
        </article>
      </div>

    </main>

    <!-- STUDENT PROFILE DRAWER -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div v-if="showProfileDrawer && selectedCandidate" class="fixed inset-y-0 right-0 z-[120] w-full sm:w-[500px] bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden text-left text-left">
        
        <!-- Header -->
        <header class="p-6 bg-[#f8fafc] border-b border-slate-200 flex items-center justify-between shrink-0 text-left text-left">
          <div class="flex gap-3.5 items-center text-left text-left">
            <div class="p-2.5 bg-blue-50 border border-blue-100 rounded-xl text-left">
              <User class="w-5 h-5 text-blue-600 stroke-[3]" />
            </div>
            <div class="text-left">
              <h3 class="text-[9px] font-black font-mono tracking-[0.2em] text-slate-400 leading-none uppercase text-left">VISTA DE TALENTO</h3>
              <h4 class="text-sm font-black text-slate-800 tracking-tight mt-1.5 uppercase text-left text-left">
                Perfil Validado CERTIAN
              </h4>
            </div>
          </div>
          <button @click="closeDrawer" class="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-200/50 rounded-xl transition-all"><X class="w-5 h-5" /></button>
        </header>

        <!-- Body con barra de desplazamiento idéntica -->
        <div class="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar pb-32 text-left">
          
          <div class="flex items-center gap-6 p-6 bg-slate-900 rounded-[2rem] text-white shadow-xl relative overflow-hidden text-left text-left">
             <div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
             <img :src="selectedCandidate.avatar" class="w-20 h-20 rounded-3xl object-cover border-4 border-white/10 relative z-10 text-left text-left" />
             <div class="relative z-10 text-left text-left">
                <h2 class="text-xl font-black tracking-tight leading-none uppercase text-left text-left text-left">{{ selectedCandidate.name }}</h2>
                <p class="text-blue-400 text-[9px] font-black uppercase tracking-[0.2em] mt-2 text-left text-left">{{ selectedCandidate.career }}</p>
                <div class="flex gap-2 mt-4 text-left text-left">
                   <span class="px-2 py-0.5 bg-white/10 rounded text-[8px] font-black uppercase border border-white/5 text-left text-left">Ranking: #{{ selectedCandidate.validation360.technical }}</span>
                   <span class="px-2 py-0.5 bg-blue-600 rounded text-[8px] font-black uppercase text-white shadow-lg border border-blue-400 text-left text-left">Nivel {{ selectedCandidate.badge }}</span>
                </div>
             </div>
          </div>

          <div class="grid grid-cols-2 gap-4 text-left text-left">
             <div class="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1 text-left text-left">
                <label class="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 text-left text-left"><GraduationCap class="w-3 h-3 text-blue-600" /> Carrera</label>
                <p class="text-[12px] font-black text-slate-700 uppercase tracking-tight leading-none mt-1 text-left text-left">{{ selectedCandidate.career }}</p>
             </div>
             <div class="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1 text-left text-left">
                <label class="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 text-left text-left"><Layers class="w-3 h-3 text-amber-500" /> Ciclo Académico</label>
                <p class="text-[12px] font-black text-slate-700 uppercase tracking-tight mt-1 text-left text-left">{{ selectedCandidate.cycle }}</p>
             </div>
             <div class="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1 text-left text-left">
                <label class="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 text-left text-left">DNI: 7******{{ selectedCandidate.id.slice(-1) }}</label>
             </div>
             <div class="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1 text-left text-left">
                <label class="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 text-left text-left"><Trophy class="w-3 h-3 text-emerald-600" /> Puntos Ranking</label>
                <p class="text-[12px] font-black text-slate-700 uppercase tracking-tight mt-1 text-left text-left">{{ selectedCandidate.validation360.technical * 10 }} PTS</p>
             </div>
          </div>

          <div class="space-y-4 text-left text-left">
             <label class="font-mono text-[9px] font-black text-slate-400 uppercase tracking-widest text-left text-left">REDES & CONTACTO</label>
             <div class="p-6 border-2 border-slate-100 rounded-[2.5rem] space-y-4 text-left text-left">
                <div class="flex items-center justify-between text-left text-left">
                   <div class="flex items-center gap-3 text-left text-left">
                      <div class="p-2 bg-slate-100 rounded-xl text-slate-500 text-left text-left"><Mail class="w-4 h-4" /></div>
                      <p class="text-xs font-bold text-slate-600 lowercase text-left text-left">{{ selectedCandidate.contactEmail || 'usuario@upeu.edu.pe' }}</p>
                   </div>
                </div>
                <div class="flex gap-2 pt-2 text-left text-left">
                   <a v-if="selectedCandidate.linkedinUrl" :href="selectedCandidate.linkedinUrl" target="_blank" class="flex-1 p-3.5 bg-[#0077b5] text-white rounded-2xl flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-blue-600/10 text-left text-left"><Linkedin class="w-3.5 h-3.5" /> LinkedIn</a>
                   <a v-if="selectedCandidate.githubUrl" :href="selectedCandidate.githubUrl" target="_blank" class="flex-1 p-3.5 bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-slate-900/10 text-left text-left"><Github class="w-3.5 h-3.5" /> GitHub</a>
                </div>
             </div>
          </div>

          <div class="space-y-4 text-left text-left">
             <label class="font-mono text-[9px] font-black text-slate-400 uppercase tracking-widest text-left text-left">HABILIDADES TÉCNICAS</label>
             <div class="flex flex-wrap gap-2 text-left text-left">
                <span v-for="tech in selectedCandidate.techStack" :key="tech" class="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm text-left text-left">
                   {{ tech }}
                </span>
             </div>
          </div>

          <div class="space-y-4 text-left text-left">
             <label class="font-mono text-[9px] font-black text-slate-400 uppercase tracking-widest text-left text-left">FORMACIÓN INSTITUCIONAL</label>
             <div class="p-6 bg-slate-50 border border-slate-200 rounded-[2.5rem] flex items-center gap-4 text-left text-left">
                <div class="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-[#245DFF] shadow-sm text-left text-left">
                   <Building2 class="w-6 h-6" />
                </div>
                <div class="text-left text-left">
                   <p class="text-sm font-black text-slate-800 uppercase tracking-tight text-left text-left">Universidad Peruana Unión</p>
                   <p class="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1 text-left text-left">Sello de Excelencia Académica</p>
                   <div class="flex items-center gap-1.5 mt-2 text-left text-left">
                      <ShieldCheck class="w-3 h-3 text-emerald-500" />
                      <span class="text-[8px] font-black text-emerald-600 uppercase tracking-widest text-left text-left">Candidato Validado</span>
                   </div>
                </div>
             </div>
          </div>

          <div class="pt-6 text-left text-left">
             <button
               @click.stop="handleInvite(selectedCandidate.name)"
               class="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-blue-600/30 active:scale-[0.98] transition-all flex items-center justify-center gap-4 text-left text-left"
             >
                <Zap v-if="!invitedList.includes(selectedCandidate.name)" class="w-5 h-5" />
                <Check v-else class="w-5 h-5" />
                <span>{{ invitedList.includes(selectedCandidate.name) ? 'INVITACIÓN ENVIADA' : 'INICIAR PROCESO DE ENTREVISTA' }}</span>
             </button>
          </div>

          <div class="h-60 text-left text-left"></div>

        </div>
      </div>
    </transition>

    <!-- Overlay backdrop -->
    <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="showProfileDrawer" @click="closeDrawer" class="fixed inset-0 bg-slate-900/10 backdrop-blur-[2px] z-[110]"></div>
    </transition>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap');

.font-sans { font-family: 'Inter', sans-serif; }
.font-mono { font-family: 'JetBrains Mono', monospace; }

/* Barra de desplazamiento idéntica a crear retos */
.custom-scrollbar::-webkit-scrollbar { 
  width: 6px; 
}
.custom-scrollbar::-webkit-scrollbar-track { 
  background: transparent; 
}
.custom-scrollbar::-webkit-scrollbar-thumb { 
  background: #e2e8f0; 
  border-radius: 10px; 
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover { 
  background: #cbd5e1; 
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

select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 0.8rem;
}
</style>
