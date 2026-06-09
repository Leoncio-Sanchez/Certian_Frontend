<script setup lang="ts">
import { 
  Zap, 
  Shield, 
  Award, 
  Clock, 
  Save, 
  ExternalLink, 
  Eye, 
  MapPin, 
  Globe, 
  Upload, 
  CheckCircle2 
} from 'lucide-vue-next';
import { DEFAULT_COMPANY_PROFILE } from '~/utils/empresaData';

const profile = ref(DEFAULT_COMPANY_PROFILE);
const isPreviewMode = ref(false);
const historyTxt = ref(profile.value.history);
const communityTxt = ref(profile.value.communityImpact);

const handleSave = () => {
  profile.value.history = historyTxt.value;
  profile.value.communityImpact = communityTxt.value;
  profile.value.lastUpdated = "Hace unos instantes";
  alert("¡Perfil de Marca Corporativa guardado correctamente!");
};
</script>

<template>
  <div class="space-y-6 animate-fade-in text-slate-800" id="empresa-profile-view">
    <!-- View Title -->
    <div class="border-b pb-6 border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-sans font-semibold text-slate-900 tracking-tight"> Marca Empleadora Corporativa </h1>
        <p class="text-sm text-slate-500 mt-1"> Plataforma de posicionamiento frente a la comunidad de talentos de CERTIAN. </p>
      </div>

      <div class="flex gap-2.5">
        <button
          @click="isPreviewMode = !isPreviewMode"
          class="p-2 px-4 border bg-white border-slate-200 text-slate-700 hover:bg-slate-50 transition-all rounded-xl text-xs font-semibold flex items-center gap-1.5"
        >
          <Eye class="w-4 h-4 text-slate-500" />
          {{ isPreviewMode ? "Editar Perfil" : "Vista Candidato Real" }}
        </button>
      </div>
    </div>

    <!-- Cover / Banner -->
    <div class="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
      <div class="h-44 md:h-56 relative bg-slate-950">
        <img :src="profile.coverImage" alt="Corporate Banner" class="w-full h-full object-cover opacity-60" />
        <div class="absolute top-4 left-4 bg-teal-500 text-white font-mono text-[9px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full border border-teal-400"> Sello Académico Certificado CERTIAN </div>
      </div>

      <!-- Logo and Name -->
      <div class="p-6 pt-12 relative flex flex-col md:flex-row md:items-center justify-between md:gap-6 border-b border-slate-100">
        <div class="absolute -top-10 left-6">
          <img :src="profile.logo" alt="Logo" class="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-md bg-white" />
        </div>

        <div>
          <div class="flex items-center gap-2">
            <h2 class="text-2xl font-sans font-semibold text-slate-950">{{ profile.name }}</h2>
            <span class="text-[10px] uppercase font-mono bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-1 rounded-full font-bold shadow-sm"> {{ profile.partnerStatus }} </span>
          </div>
          <div class="flex items-center gap-4 mt-2 text-xs font-medium text-slate-500">
            <span class="flex items-center gap-1.5"><MapPin class="w-3.5 h-3.5" /> San Isidro, Lima</span>
            <span class="flex items-center gap-1.5"><Globe class="w-3.5 h-3.5" /> globaltech.la</span>
            <span class="flex items-center gap-1.5 text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-md"><Clock class="w-3 h-3" /> Actualizado {{ profile.lastUpdated }}</span>
          </div>
        </div>

        <div v-if="!isPreviewMode" class="mt-4 md:mt-0 flex gap-2">
          <button class="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"><Upload class="w-4 h-4 text-slate-400" /></button>
          <button @click="handleSave" class="px-5 py-2.5 bg-slate-950 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-slate-950/20 active:scale-95 flex items-center gap-2">
            <Save class="w-4 h-4" /> Guardar Perfil
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="p-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <!-- Main Info -->
        <div class="lg:col-span-2 space-y-8">
          <section>
            <h3 class="text-xs uppercase font-mono font-bold tracking-widest text-slate-400 mb-4 flex items-center gap-2"> <ExternalLink class="w-4 h-4" /> Nuestra Trayectoria e Historia </h3>
            <div v-if="isPreviewMode" class="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
              <p class="text-sm font-medium leading-relaxed text-slate-700 whitespace-pre-wrap">{{ profile.history }}</p>
            </div>
            <textarea v-else v-model="historyTxt" rows="5" class="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 transition-all shadow-inner"></textarea>
          </section>

          <section>
            <h3 class="text-xs uppercase font-mono font-bold tracking-widest text-slate-400 mb-6"> Nuestros Pilares y Valores </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div v-for="val in profile.values" :key="val.title" class="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
                <div class="p-2.5 bg-slate-50 rounded-xl w-fit group-hover:bg-indigo-50 transition-colors">
                  <component :is="val.icon === 'Zap' ? Zap : val.icon === 'Shield' ? Shield : Award" class="w-5 h-5 text-slate-900 group-hover:text-indigo-600" />
                </div>
                <h4 class="font-sans font-bold text-sm text-slate-950 mt-4">{{ val.title }}</h4>
                <p class="text-xs text-slate-500 mt-2 leading-relaxed font-medium">{{ val.description }}</p>
              </div>
            </div>
          </section>

          <section>
            <h3 class="text-xs uppercase font-mono font-bold tracking-widest text-slate-400 mb-4"> Impacto en la Comunidad Académica </h3>
            <div v-if="isPreviewMode" class="bg-indigo-50/30 p-6 rounded-2xl border border-indigo-100/50">
              <p class="text-sm font-medium leading-relaxed text-slate-700 italic">"{{ profile.communityImpact }}"</p>
            </div>
            <textarea v-else v-model="communityTxt" rows="4" class="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 transition-all shadow-inner"></textarea>
          </section>
        </div>

        <!-- Sidebar Info -->
        <div class="space-y-8">
          <section class="bg-slate-50 border border-slate-100 rounded-3xl p-6">
            <h3 class="text-xs uppercase font-mono font-bold tracking-widest text-slate-400 mb-5 flex items-center gap-2"> <CheckCircle2 class="w-4 h-4 text-teal-600" /> Beneficios CERTIAN </h3>
            <div class="space-y-4">
              <div v-for="(ben, idx) in profile.benefits" :key="idx" class="flex gap-3">
                <div class="mt-1 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0"></div>
                <p class="text-xs font-medium text-slate-600 leading-relaxed">{{ ben }}</p>
              </div>
            </div>
          </section>

          <section class="bg-indigo-900 rounded-3xl p-6 text-white overflow-hidden relative group">
            <div class="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
            <h3 class="text-lg font-sans font-bold relative z-10 leading-tight">Impulsa tu <br /> marca con Retos</h3>
            <p class="text-xs text-indigo-200 mt-3 font-medium opacity-80 leading-relaxed relative z-10"> Publica desafíos técnicos exclusivos para la red elite de la UPeU y atrae talento validado. </p>
            <button @click="navigateTo('/empresa/challenges')" class="w-full mt-6 py-3 bg-white text-indigo-900 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-indigo-50 transition-colors relative z-10"> Gestionar Retos + </button>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
