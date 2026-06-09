<script setup lang="ts">
import { 
  Users, 
  MapPin, 
  Clock, 
  Calendar, 
  ArrowRight, 
  MessageSquare, 
  Award, 
  Sparkles, 
  Send 
} from 'lucide-vue-next';
import { MENTORS, IMMERSION_ITEMS } from '~/utils/empresaData';

const mentors = ref(MENTORS);
const immersions = ref(IMMERSION_ITEMS);

const chatMessages = ref<{ sender: "user" | "bot"; text: string; time: string }[]>([
  { sender: "bot", text: "¡Hola! Soy el asistente de inmersión. ¿En cuál de nuestras pasantías o mentorías te gustaría postular hoy?", time: "Ahora" }
]);
const chatInput = ref("");

const handleSendMessage = () => {
  if (!chatInput.value.trim()) return;

  const userMsg = chatInput.value.trim();
  chatMessages.value.push({ sender: "user", text: userMsg, time: "Ahora" });
  chatInput.value = "";

  setTimeout(() => {
    let botResponse = "Interesante iniciativa. Analizando tu perfil... Veo que posees sólidos créditos académicos HEC. Recomiendo la Pasantía Express.";
    if (userMsg.toLowerCase().includes("mentor") || userMsg.toLowerCase().includes("mendoza")) {
      botResponse = "El Dr. Carlos Mendoza tiene cupos este Jueves a las 4pm. He iniciado la pre-reserva de tu cita.";
    } else if (userMsg.toLowerCase().includes("falabella")) {
      botResponse = "Falabella Tech solicita fuertes conocimientos en UI. Tu perfil coincide a la perfección.";
    }
    chatMessages.value.push({ sender: "bot", text: botResponse, time: "Hace un instante" });
  }, 1000);
};

const handleScheduleMentor = (mentorName: string) => {
  alert(`¡Cupo agendado con ${mentorName}! Recibirás una invitación pronto.`);
};

const handleJoinImmersion = (immTitle: string) => {
  alert(`Solicitud para "${immTitle}" enviada. Tus rúbricas serán evaluadas.`);
};
</script>

<template>
  <div class="space-y-10 animate-fade-in text-slate-800 bg-slate-50/50 p-6 rounded-3xl" id="networking-hub-view">
    <!-- Header -->
    <div class="border-b pb-6 border-slate-200/60 flex flex-col items-start">
      <span class="flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-100/80 px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
        <Sparkles class="w-3.5 h-3.5" /> Collaboration Hub
      </span>
      <h1 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-500 tracking-tight mt-3"> Centro de Networking e Inmersión </h1>
      <p class="text-sm text-slate-500 mt-2 max-w-2xl font-medium leading-relaxed"> Vincula tu desarrollo con mentores de prestigio global e intégrate a convocatorias empresariales de rápida inserción con un solo clic. </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Left Side -->
      <div class="lg:col-span-8 space-y-10">
        
        <!-- Mentors -->
        <section class="space-y-5">
          <h3 class="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2"> <Users class="w-4.5 h-4.5 text-blue-500" /> Mentores Universitarios Destacados </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div v-for="m in mentors" :key="m.id" class="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
              <div class="flex items-center gap-4">
                <img :src="m.avatar" :alt="m.name" class="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md ring-1 ring-slate-100" />
                <div class="overflow-hidden">
                  <h4 class="font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors truncate">{{ m.name }}</h4>
                  <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 truncate">{{ m.role }} @ {{ m.company }}</p>
                </div>
              </div>
              <div class="mt-5 space-y-3">
                <div class="flex flex-wrap gap-1.5">
                  <span v-for="topic in m.topics" :key="topic" class="text-[9px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-md border border-blue-100"> {{ topic }} </span>
                </div>
                <div class="flex items-center gap-1.5 text-[10px] font-medium text-slate-500">
                  <Calendar class="w-3 h-3 text-slate-400" /> {{ m.availability }}
                </div>
              </div>
              <button @click="handleScheduleMentor(m.name)" class="mt-6 w-full py-2.5 bg-slate-950 text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-lg active:scale-95"> Agendar Mentoría <ArrowRight class="w-3.5 h-3.5" /> </button>
            </div>
          </div>
        </section>

        <!-- Immersions -->
        <section class="space-y-5">
          <h3 class="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2"> <Award class="w-4.5 h-4.5 text-amber-500" /> Tablero de Inmersión Corporativa </h3>
          <div class="space-y-4">
            <div v-for="imm in immersions" :key="imm.id" class="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm hover:border-amber-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 relative group overflow-hidden">
              <div class="absolute top-0 left-0 w-1.5 h-full bg-amber-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div class="space-y-3 md:max-w-md">
                <div class="flex items-center gap-2">
                  <span :class="`px-2.5 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${imm.badgeColor}`"> {{ imm.badgeText }} </span>
                  <span class="text-xs font-bold text-slate-400"> @ {{ imm.company }} </span>
                </div>
                <h4 class="text-xl font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors"> {{ imm.title }} </h4>
                <p class="text-sm text-slate-500 font-medium leading-relaxed"> {{ imm.description }} </p>
                <div class="flex items-center gap-4 pt-1">
                  <span class="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase"> <Clock class="w-3.5 h-3.5" /> {{ imm.duration }} </span>
                  <span class="flex items-center gap-1.5 text-[11px] font-black text-amber-600 uppercase"> <Users class="w-3.5 h-3.5" /> {{ imm.vacantSpots }} Vacantes </span>
                </div>
              </div>
              <button @click="handleJoinImmersion(imm.title)" class="px-8 py-3.5 bg-amber-500 hover:bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-amber-500/10 active:scale-95"> Aplicar Ahora </button>
            </div>
          </div>
        </section>
      </div>

      <!-- Right Side: AI Assistant -->
      <div class="lg:col-span-4 h-fit sticky top-8">
        <div class="bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[700px]">
          <div class="p-6 bg-indigo-900 text-white flex items-center gap-4 relative">
            <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div class="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 relative z-10"> <MessageSquare class="w-6 h-6" /> </div>
            <div class="relative z-10">
              <h4 class="font-extrabold text-lg leading-tight">Concierge IA</h4>
              <p class="text-[10px] uppercase font-bold text-indigo-300 tracking-widest mt-0.5">Asistente de Carreras 24/7</p>
            </div>
          </div>

          <div class="flex-1 p-6 overflow-y-auto space-y-5 custom-scrollbar bg-slate-50/30">
            <div v-for="(msg, idx) in chatMessages" :key="idx" :class="`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`">
              <div :class="`max-w-[85%] p-4 rounded-2xl text-sm font-medium shadow-sm leading-relaxed ${msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'}`">
                {{ msg.text }}
                <div :class="`text-[9px] mt-2 font-bold uppercase opacity-50 ${msg.sender === 'user' ? 'text-indigo-100' : 'text-slate-400'}`"> {{ msg.time }} </div>
              </div>
            </div>
          </div>

          <form @submit.prevent="handleSendMessage" class="p-5 border-t border-slate-100 bg-white">
            <div class="relative group">
              <input v-model="chatInput" type="text" placeholder="Pregúntale a la IA..." class="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-5 pr-14 py-4 text-sm font-medium outline-none focus:bg-white focus:border-indigo-500 transition-all shadow-inner" />
              <button type="submit" class="absolute right-2 top-2 p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-90"> <Send class="w-4 h-4" /> </button>
            </div>
            <p class="text-[9px] text-center text-slate-400 font-bold uppercase tracking-widest mt-3"> IA generativa · Validada por Certian </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
</style>
