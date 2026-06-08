import React, { useState } from 'react';
import { 
  Search, Plus, Code, HelpCircle, FileText, Layers, X, 
  Pencil, Trash2, Power, Users, Award, Building2, ChevronDown, ChevronUp, 
  Terminal, Copy, Check, Save, AlertCircle, Info, BookOpen, ChevronLeft, ChevronRight, LayoutGrid
} from 'lucide-react';
import { Empresa, Tema, NivelDificultad, TechnicalChallenge } from './types';

// Pristine Demo Datasets matching the PostgreSQL Schema
const INITIAL_EMPRESAS: Empresa[] = [
  { id_empresa: 1, razon_social: 'CERTIAN S.A.C.', ruc: '20601245781', logo_url: '', rubro: 'Tecnología', status: 'activo' },
  { id_empresa: 2, razon_social: 'Mype Soluciones Digitales', ruc: '20491298451', logo_url: '', rubro: 'E-commerce', status: 'activo' },
  { id_empresa: 3, razon_social: 'Global Dev Startup', ruc: '20129481921', logo_url: '', rubro: 'Consultoría TI', status: 'activo' }
];

const INITIAL_TEMAS: Tema[] = [
  { id_tema: 1, nombre: 'Desarrollo Backend', descripcion: 'Competencias de APIs, Node.js, Python, Express, Go' },
  { id_tema: 2, nombre: 'Desarrollo Frontend', descripcion: 'React, Tailwind CSS, maquetación adaptativa' },
  { id_tema: 3, nombre: 'Base de Datos', descripcion: 'SQL Postgres, indexación, disparadores, optimización' },
  { id_tema: 4, nombre: 'Excel Avanzado', descripcion: 'Tablas dinámicas, Macros, Dashboards financieros' },
  { id_tema: 5, nombre: 'Seguridad Informática', descripcion: 'Auditoría de API, penetration testing y seguridad' }
];

const INITIAL_NIVELES: NivelDificultad[] = [
  { id_nivel_dificultad: 1, nombre: 'basico', horas_por_defecto: 20 },
  { id_nivel_dificultad: 2, nombre: 'medio', horas_por_defecto: 40 },
  { id_nivel_dificultad: 3, nombre: 'avanzado', horas_por_defecto: 80 }
];

const DEFAULT_CHALLENGES: TechnicalChallenge[] = [
  {
    id_reto: 1,
    id_empresa: 1,
    id_tema: 1,
    id_nivel_dificultad: 1,
    titulo: 'PRUEBA 1',
    descripcion_problema: 'Prueba de desarrollo de servicios REST, inyección de dependencias, base de datos H2 y empaquetamiento listo para producción.',
    requisitos_entrega: '1. Repositorio público en GitHub con el código base.\n2. Archivo README.md que describa minuciosamente la puesta en marcha.\n3. Pruebas unitarias locales con cobertura superior al 80%.',
    estado: 'abierto',
    applicantsCount: 5,
    createdAt: new Date().toISOString()
  },
  {
    id_reto: 2,
    id_empresa: 1,
    id_tema: 3,
    id_nivel_dificultad: 3,
    titulo: 'BASE DE DATOS',
    descripcion_problema: 'Prueba de optimización de consultas SQL complejas, indexación, disparadores, funciones almacenadas y normalización avanzada de esquemas.',
    requisitos_entrega: '1. Script .sql con el pipeline DDL y DML completo.\n2. Captura del Plan de Ejecución (EXPLAIN ANALYZE) demostrando la reducción de tiempos.\n3. Diagrama de Entidad Relación en PDF.',
    estado: 'abierto',
    applicantsCount: 12,
    createdAt: new Date().toISOString()
  },
  {
    id_reto: 3,
    id_empresa: 3,
    id_tema: 2,
    id_nivel_dificultad: 2,
    titulo: 'MAQUETACIÓN INTERACTIVA',
    descripcion_problema: 'Desarrollar un dashboard interactivo utilizando React, Tailwind CSS y componentes accesibles para visualización de métricas financieras.',
    requisitos_entrega: '1. Enlace de despliegue directo (Vercel/Netlify).\n2. Repositorio de GitHub limpio y documentado.\n3. Configuración adaptativa móvil completa.',
    estado: 'abierto',
    applicantsCount: 8,
    createdAt: new Date().toISOString()
  }
];

export default function App() {
  const [empresas, setEmpresas] = useState<Empresa[]>(INITIAL_EMPRESAS);
  const [temas, setTemas] = useState<Tema[]>(INITIAL_TEMAS);
  const [challenges, setChallenges] = useState<TechnicalChallenge[]>(DEFAULT_CHALLENGES);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingChallenge, setEditingChallenge] = useState<TechnicalChallenge | null>(null);

  // Form Fields State
  const [formTitulo, setFormTitulo] = useState('');
  const [formIdEmpresa, setFormIdEmpresa] = useState<number>(1);
  const [formIdTema, setFormIdTema] = useState<number>(1);
  const [formIdNivelDificultad, setFormIdNivelDificultad] = useState<number>(1);
  const [formDescripcion, setFormDescripcion] = useState('');
  const [formRequisitos, setFormRequisitos] = useState('');
  const [formEstado, setFormEstado] = useState<'abierto' | 'cerrado'>('abierto');
  const [formApplicantsCount, setFormApplicantsCount] = useState<number>(0);

  // Local state for interactive expanded cards
  const [expandedRequirements, setExpandedRequirements] = useState<Record<number, boolean>>({});

  const handleOpenCreateDrawer = () => {
    setEditingChallenge(null);
    setFormTitulo('');
    setFormIdEmpresa(empresas[0]?.id_empresa || 1);
    setFormIdTema(temas[0]?.id_tema || 1);
    setFormIdNivelDificultad(1);
    setFormDescripcion('');
    setFormRequisitos('1. Repositorio de código fuente limpio.\n2. Archivo descriptivo del proyecto.\n3. Captura del correcto funcionamiento.');
    setFormEstado('abierto');
    setFormApplicantsCount(0);
    setIsDrawerOpen(true);
  };

  const handleOpenEditDrawer = (challenge: TechnicalChallenge) => {
    setEditingChallenge(challenge);
    setFormTitulo(challenge.titulo);
    setFormIdEmpresa(challenge.id_empresa);
    setFormIdTema(challenge.id_tema);
    setFormIdNivelDificultad(challenge.id_nivel_dificultad);
    setFormDescripcion(challenge.descripcion_problema);
    setFormRequisitos(challenge.requisitos_entrega);
    setFormEstado(challenge.estado);
    setFormApplicantsCount(challenge.applicantsCount);
    setIsDrawerOpen(true);
  };

  const handleSaveChallenge = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingChallenge) {
      setChallenges(prev => prev.map(c => 
        c.id_reto === editingChallenge.id_reto 
          ? {
              ...c,
              titulo: formTitulo,
              id_empresa: formIdEmpresa,
              id_tema: formIdTema,
              id_nivel_dificultad: formIdNivelDificultad,
              descripcion_problema: formDescripcion,
              requisitos_entrega: formRequisitos,
              estado: formEstado,
              applicantsCount: formApplicantsCount
            }
          : c
      ));
    } else {
      const nextId = Math.max(0, ...challenges.map(c => c.id_reto)) + 1;
      const newChallenge: TechnicalChallenge = {
        id_reto: nextId,
        id_empresa: formIdEmpresa,
        id_tema: formIdTema,
        id_nivel_dificultad: formIdNivelDificultad,
        titulo: formTitulo,
        descripcion_problema: formDescripcion,
        requisitos_entrega: formRequisitos,
        estado: formEstado,
        applicantsCount: formApplicantsCount,
        createdAt: new Date().toISOString()
      };
      setChallenges(prev => [newChallenge, ...prev]);
    }

    setIsDrawerOpen(false);
  };

  const handleDeleteChallenge = (id: number) => {
    setChallenges(prev => prev.filter(c => c.id_reto !== id));
  };

  const handleToggleStatus = (id: number) => {
    setChallenges(prev => prev.map(c => 
      c.id_reto === id ? { ...c, estado: c.estado === 'abierto' ? 'cerrado' : 'abierto' } : c
    ));
  };

  const handleIncrementApplicants = (id: number) => {
    setChallenges(prev => prev.map(c => 
      c.id_reto === id ? { ...c, applicantsCount: c.applicantsCount + 1 } : c
    ));
  };

  const filteredChallenges = challenges.filter(c => {
    const term = searchQuery.toLowerCase().trim();
    if (!term) return true;

    const emp = empresas.find(e => e.id_empresa === c.id_empresa);
    const tm = temas.find(t => t.id_tema === c.id_tema);
    const nv = INITIAL_NIVELES.find(n => n.id_nivel_dificultad === c.id_nivel_dificultad);

    return (
      c.titulo.toLowerCase().includes(term) ||
      c.descripcion_problema.toLowerCase().includes(term) ||
      (emp && emp.razon_social.toLowerCase().includes(term)) ||
      (tm && tm.nombre.toLowerCase().includes(term)) ||
      (nv && nv.nombre.toLowerCase().includes(term))
    );
  });

  // Simple statistics
  const totalApplicants = challenges.reduce((acc, curr) => acc + curr.applicantsCount, 0);
  const activeChallengesCount = challenges.filter(c => c.estado === 'abierto').length;
  const pendingEvaluationCount = challenges.length > 0 ? Math.round(challenges.length * 1.5) : 0;

  return (
    <div id="app_root" className="flex bg-slate-50 min-h-screen text-slate-800 font-sans antialiased overflow-hidden w-full">
      
      {/* Visual Sidebar */}
      <aside 
        id="app_sidebar"
        className={`bg-white border-r border-slate-100 min-h-screen flex flex-col justify-between transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-20' : 'w-64'} shrink-0 relative z-20 shadow-xs`}
      >
        <button 
          id="sidebar_toggle_btn"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="absolute top-6 -right-3 bg-white border border-slate-100 text-slate-400 hover:text-slate-600 rounded-full p-1 shadow-sm cursor-pointer z-30 transition-transform hover:scale-110"
        >
          {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        <div className="p-5 flex flex-col h-full">
          {/* Logo Brand Header */}
          <div className={`flex items-center gap-3 overflow-hidden ${isSidebarCollapsed ? 'justify-center' : 'px-2'}`}>
            <div className="flex items-center justify-center bg-blue-600 rounded-xl p-2.5 text-white shadow-sm shrink-0">
              <Code size={18} className="stroke-[2.5]" />
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col">
                <span className="font-bold tracking-tight text-slate-800 text-base leading-none">
                  CERTIAN
                </span>
                <span className="text-[8px] font-mono font-bold text-blue-500 tracking-wider mt-1 uppercase leading-none">
                  SISTEMA RELACIONAL
                </span>
              </div>
            )}
          </div>

          {/* Sidebar Nav Items */}
          <div className="mt-8 space-y-1.5 flex-1">
            {!isSidebarCollapsed && (
              <p className="text-[9px] font-black text-slate-400 tracking-widest uppercase px-3.5 mb-2">
                MENÚ PRINCIPAL
              </p>
            )}
            <button className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${
              isSidebarCollapsed ? 'justify-center bg-blue-50 text-blue-600' : 'bg-blue-600 text-white shadow-md shadow-blue-600/10'
            }`}>
              <BookOpen size={16} className="shrink-0" />
              {!isSidebarCollapsed && <span className="text-xs">Desafíos</span>}
            </button>
            
            <button className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all ${
              isSidebarCollapsed ? 'justify-center' : ''
            }`}>
              <LayoutGrid size={16} className="shrink-0" />
              {!isSidebarCollapsed && <span className="text-xs">Empresas</span>}
            </button>
          </div>

          {/* User Profile Info Footer */}
          <div className="mt-auto pt-6 border-t border-slate-100">
            <div className={`flex items-center gap-2.5 bg-slate-50 p-2.5 rounded-xl ${isSidebarCollapsed ? 'justify-center p-1.5' : ''}`}>
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs shrink-0">
                A
              </div>
              {!isSidebarCollapsed && (
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-slate-800 leading-none truncate">Administrador</div>
                  <div className="text-[8px] font-bold text-slate-400 tracking-wider uppercase mt-1">PRO DEVELOPER</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div id="main_content_area" className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto relative bg-[#f8fafc]">
        
        {/* Top Minimal Header */}
        <header className="bg-white border-b border-slate-100 px-6 sm:px-8 py-4.5 flex items-center justify-between shrink-0">
          <div className="relative w-72 max-w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Search size={15} />
            </span>
            <input
              type="text"
              placeholder="Buscar desafío..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-150 rounded-xl text-xs placeholder:text-slate-400 focus:outline-hidden focus:border-blue-500 hover:bg-slate-100/50 transition-all font-medium text-slate-700"
            />
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-[10px] font-mono tracking-wider text-slate-400 font-bold bg-slate-100/80 px-2.5 py-1.5 rounded-lg border border-slate-150/50">
              POSTGRESQL ESQUEMA ACTIVO
            </span>
          </div>
        </header>

        {/* Content Panel Frame */}
        <main className="p-6 sm:p-8 lg:p-10 flex-1 max-w-7xl w-full mx-auto space-y-8 pb-20">
          
          {/* Main Title Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-800">
                Gestión de <span className="text-blue-600">Retos Técnicos</span>
              </h2>
              <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase mt-1 flex items-center gap-1.5 leading-none">
                DISEÑA DESAFÍOS PARA FILTRAR EL <span className="text-slate-800 font-extrabold bg-amber-150 px-1.5 py-0.5 rounded text-[9px]">MEJOR TALENTO</span>
              </p>
            </div>

            {/* Main Action Blue Button */}
            <div className="shrink-0">
              <button
                id="create_challenge_shortcut_btn"
                onClick={handleOpenCreateDrawer}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-blue-500/10"
              >
                <Plus size={14} className="stroke-[2.5]" />
                <span>Crear Reto</span>
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: Candidatos */}
            <div className="bg-white rounded-2xl border border-slate-100 flex overflow-hidden shadow-xs">
              <div className="w-1.5 bg-emerald-500"></div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
                    <Users size={16} />
                  </div>
                  <span className="text-[8px] font-bold tracking-wider bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full uppercase">
                    Activas
                  </span>
                </div>
                <div className="mt-3">
                  <h3 className="text-2xl font-black text-slate-850">{totalApplicants}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Postulaciones Totales</p>
                </div>
              </div>
            </div>

            {/* Card 2: Desafíos */}
            <div className="bg-white rounded-2xl border border-slate-100 flex overflow-hidden shadow-xs">
              <div className="w-1.5 bg-blue-500"></div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                    <BookOpen size={16} />
                  </div>
                  <span className="text-[8px] font-bold tracking-wider bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full uppercase">
                    Publicados
                  </span>
                </div>
                <div className="mt-3">
                  <h3 className="text-2xl font-black text-slate-850">{challenges.length}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Retos Disponibles</p>
                </div>
              </div>
            </div>

            {/* Card 3: Pendientes */}
            <div className="bg-white rounded-2xl border border-slate-100 flex overflow-hidden shadow-xs">
              <div className="w-1.5 bg-amber-500"></div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600">
                    <Layers size={16} />
                  </div>
                  <span className="text-[8px] font-bold tracking-wider bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full uppercase">
                    En Revisión
                  </span>
                </div>
                <div className="mt-3">
                  <h3 className="text-2xl font-black text-slate-850">{pendingEvaluationCount}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Por Calificar</p>
                </div>
              </div>
            </div>
          </section>

          {/* Main challenges block */}
          <div className="space-y-6">
            <div className="border-b border-slate-150 pb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold tracking-wider uppercase text-slate-400 flex items-center gap-2">
                <span>Catálogo de Retos</span>
                <span className="bg-slate-200 text-slate-600 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
                  {filteredChallenges.length}
                </span>
              </h3>
            </div>

            {filteredChallenges.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredChallenges.map((challenge) => {
                  const emp = empresas.find(e => e.id_empresa === challenge.id_empresa) || FIRST_COMPANY_FALLBACK(empresas);
                  const tm = temas.find(t => t.id_tema === challenge.id_tema) || FIRST_TOPIC_FALLBACK(temas);
                  const nv = INITIAL_NIVELES.find(n => n.id_nivel_dificultad === challenge.id_nivel_dificultad) || INITIAL_NIVELES[0];
                  const isAbierto = challenge.estado === 'abierto';
                  const isExpanded = !!expandedRequirements[challenge.id_reto];

                  return (
                    <article 
                      key={challenge.id_reto} 
                      className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between overflow-hidden hover:shadow-md transition-shadow"
                    >
                      {/* Top bar indicator */}
                      <div className={`h-1.5 w-full ${isAbierto ? 'bg-blue-600' : 'bg-slate-300'}`}></div>

                      <div className="p-5 flex-1 flex flex-col justify-between relative">
                        {/* Status tag */}
                        <div className="absolute top-4 right-4">
                          <span className={`text-[8px] font-mono font-black uppercase px-2 py-0.5 rounded border ${
                            isAbierto 
                              ? 'bg-blue-50 text-blue-600 border-blue-200' 
                              : 'bg-slate-50 text-slate-500 border-slate-200'
                          }`}>
                            {challenge.estado}
                          </span>
                        </div>

                        <div>
                          {/* Company icon & Identity */}
                          <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600 shrink-0">
                              <Code size={18} />
                            </div>
                            <div className="min-w-0 flex-1 pr-12">
                              <h4 
                                onClick={() => handleOpenEditDrawer(challenge)}
                                className="text-sm font-black text-slate-800 hover:text-blue-600 transition-colors cursor-pointer truncate"
                              >
                                {challenge.titulo}
                              </h4>
                              <p className="text-[10px] font-extrabold text-slate-500 tracking-wide uppercase truncate mt-0.5">
                                {emp?.razon_social}
                              </p>
                              <span className="text-[8px] font-mono text-slate-400 select-all">
                                RUC: {emp?.ruc}
                              </span>
                            </div>
                          </div>

                          {/* Attribute Tags */}
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            <span className="text-[8px] font-mono bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-black">
                              ID: {challenge.id_reto}
                            </span>
                            <span className="text-[8px] font-bold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded uppercase">
                              {tm?.nombre}
                            </span>
                            <span className="text-[8px] font-bold bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded uppercase">
                              {nv?.nombre}
                            </span>
                          </div>

                          {/* Brief block */}
                          <div className="bg-slate-50 border border-slate-100/60 rounded-xl p-3 mt-4 space-y-1">
                            <span className="text-[8px] font-mono font-black text-slate-400 uppercase tracking-widest block">
                              CRITERIO TÉCNICO:
                            </span>
                            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                              {challenge.descripcion_problema}
                            </p>
                          </div>

                          {/* Certification Hours Badge */}
                          <div className="mt-3 flex items-center justify-between text-[10px] font-bold text-purple-600 bg-purple-50/50 p-2.5 rounded-xl border border-purple-100/50">
                            <span className="flex items-center gap-1">
                              <Award size={12} />
                              <span>Reconocimiento HEC:</span>
                            </span>
                            <span className="font-mono bg-white border border-purple-200/80 px-2.5 py-0.5 rounded text-[10px]">
                              +{nv?.horas_por_defecto}h HEC
                            </span>
                          </div>

                          {/* Collapsible Requirements Segment */}
                          <div className="mt-4 pt-1">
                            <button
                              onClick={() => {
                                setExpandedRequirements(prev => ({
                                  ...prev,
                                  [challenge.id_reto]: !prev[challenge.id_reto]
                                }));
                              }}
                              className="w-full flex items-center justify-between text-[9px] font-semibold text-slate-400 hover:text-slate-600 py-1"
                            >
                              <span>VER REQUISITOS DE ENTREGA</span>
                              {isExpanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                            </button>
                            {isExpanded && (
                              <div className="mt-1.5 p-3 bg-slate-50 border border-slate-100 rounded-xl text-[10px] text-slate-500 font-sans whitespace-pre-line leading-relaxed">
                                {challenge.requisitos_entrega}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Card bottom bar actions */}
                        <div className="border-t border-slate-100 mt-4.5 pt-3.5 flex items-center justify-between">
                          <div className="flex gap-1.5">
                            <button 
                              onClick={() => handleOpenEditDrawer(challenge)}
                              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Editar Reto"
                            >
                              <Pencil size={12} />
                            </button>
                            <button
                              onClick={() => handleDeleteChallenge(challenge.id_reto)}
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Eliminar Reto"
                            >
                              <Trash2 size={12} />
                            </button>
                            <button
                              onClick={() => handleToggleStatus(challenge.id_reto)}
                              className="px-2.5 py-1 text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1 font-mono text-[9px] font-bold"
                              title="Alternar estado"
                            >
                              <Power size={10} />
                              <span>{challenge.estado}</span>
                            </button>
                          </div>

                          <button
                            onClick={() => handleIncrementApplicants(challenge.id_reto)}
                            className="bg-slate-800 hover:bg-blue-600 text-white rounded-full px-2.5 py-1 flex items-center gap-1.5 text-xs font-bold transition-all active:scale-95 shrink-0 hover:shadow-xs"
                            title="Simular postulante"
                          >
                            <Users size={11} className="text-slate-300" />
                            <span className="font-mono text-xs">{challenge.applicantsCount}</span>
                            <span className="text-[8px] font-mono font-black text-blue-300 bg-white/10 px-1 rounded-sm">+1</span>
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="p-12 text-center bg-white border border-dashed border-slate-200 rounded-3xl max-w-sm mx-auto">
                <Code size={24} className="text-slate-400 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-slate-700">Catálogo vacío</h4>
                <p className="text-xs text-slate-400 mt-1">Haga clic en "Crear Reto" para registrar un nuevo desafío.</p>
              </div>
            )}
          </div>

        </main>
      </div>

      {/* 
        CREAR/EDITAR RETO DRAWER:
        Puro CSS / Minimalistic sliding panel style.
        Completely transparent sidebar overlay with zero backdrop opacity (clicking on the left doesn't block layout or dim). 
        Perfect visual boundaries.
      */}
      <div 
        id="create_challenge_drawer"
        className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white border-l border-slate-100 shadow-[0_0_50px_rgba(0,0,0,0.06)] z-50 flex flex-col transition-all duration-300 ease-in-out transform ${
          isDrawerOpen ? 'translate-x-0 opacity-100 visible' : 'translate-x-full opacity-0 invisible'
        }`}
      >
        {/* Simple crisp header */}
        <header className="p-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex gap-2.5 items-center">
            <div className="p-2 bg-blue-50 border border-blue-150 rounded-lg">
              <Plus size={15} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-xs font-black font-mono tracking-widest text-slate-400 leading-none uppercase">
                FORMULARIO DE DESAFÍO
              </h3>
              <h4 className="text-sm font-black text-slate-800 tracking-tight mt-1">
                {editingChallenge ? '✏️ EDITAR RETO EXISTENTE' : '✨ CREAR RETO TÉCNICO'}
              </h4>
            </div>
          </div>

          <button
            onClick={() => setIsDrawerOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-lg transition-transform hover:scale-105 cursor-pointer"
            title="Cerrar"
          >
            <X size={15} />
          </button>
        </header>

        {/* Action Form */}
        <form onSubmit={handleSaveChallenge} className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-slate-600">
          
          {/* Informative micro-badge */}
          <div className="bg-blue-50/50 border border-blue-100 p-3.5 rounded-xl flex items-start gap-2.5">
            <Info size={14} className="text-blue-600 shrink-0 mt-0.5 animate-pulse" />
            <p className="text-[10.5px] text-slate-600 leading-relaxed font-medium">
              Complete los campos para parametrizar el reto técnico. Todos los datos ingresados tendrán impacto directo en la visualización del listado y en sus badges de capacitación correspondientes.
            </p>
          </div>

          {/* Form input: Título */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-0.5">
              <label className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                Título del reto *
              </label>
              <span className="text-[8px] font-mono text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded">
                LONGITUD MAX 150
              </span>
            </div>
            <input
              type="text"
              required
              maxLength={150}
              placeholder="Ej. API REST DE ALTO RENDIMIENTO CON GO"
              value={formTitulo}
              onChange={(e) => setFormTitulo(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-850 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all text-xs font-semibold"
            />
          </div>

          {/* Selector Grid: Enterprise and technology */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Empresa ID selection */}
            <div className="space-y-1.5">
              <label className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Building2 size={11} className="text-slate-400" />
                <span>Empresa Socia *</span>
              </label>
              <select
                value={formIdEmpresa}
                onChange={(e) => setFormIdEmpresa(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-hidden text-slate-705 font-medium focus:bg-white cursor-pointer"
              >
                {empresas.map((emp) => (
                  <option key={emp.id_empresa} value={emp.id_empresa}>
                    {emp.razon_social} (RUC: {emp.ruc})
                  </option>
                ))}
              </select>
            </div>

            {/* Tema ID selection */}
            <div className="space-y-1.5">
              <label className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Layers size={11} className="text-slate-400" />
                <span>Especialidad / Tema *</span>
              </label>
              <select
                value={formIdTema}
                onChange={(e) => setFormIdTema(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-hidden text-slate-705 font-medium focus:bg-white cursor-pointer"
              >
                {temas.map((t) => (
                  <option key={t.id_tema} value={t.id_tema}>
                    {t.nombre}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Dificultad selector buttons */}
          <div className="space-y-1.5">
            <label className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Award size={12} className="text-slate-400" />
              <span>Nivel de Dificultad</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {INITIAL_NIVELES.map((n) => {
                const isActive = formIdNivelDificultad === n.id_nivel_dificultad;
                return (
                  <button
                    key={n.id_nivel_dificultad}
                    type="button"
                    onClick={() => setFormIdNivelDificultad(n.id_nivel_dificultad)}
                    className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer font-bold ${
                      isActive 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-xs' 
                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    <p className="text-[10px] uppercase block">{n.nombre}</p>
                    <p className={`text-[8px] font-mono mt-0.5 leading-none ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                      +{n.horas_por_defecto}h HEC
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form input: Descripción del problema */}
          <div className="space-y-1.5">
            <label className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              Descripción del Problema Técnico *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Describa a detalle el problema de ingeniería que el postulante debe resolver..."
              value={formDescripcion}
              onChange={(e) => setFormDescripcion(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all resize-none leading-relaxed"
            />
          </div>

          {/* Form input: Requisitos */}
          <div className="space-y-1.5">
            <label className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              Requisitos de Entrega e Evidencias *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Ej. 1. Repositorio con código limpio.&#10;2. Configuración en un README.md."
              value={formRequisitos}
              onChange={(e) => setFormRequisitos(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all resize-none leading-relaxed"
            />
          </div>

          {/* Form input: Simular Postulantes */}
          <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <label className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-widest block font-sans">
                Simular Candidatos Iniciales
              </label>
              <span className="text-[8px] text-slate-400 leading-none font-medium">
                Puntapié inicial de egresados para el registro.
              </span>
            </div>
            <input
              type="number"
              min="0"
              value={formApplicantsCount}
              onChange={(e) => setFormApplicantsCount(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-16 px-2 py-1 bg-white border border-slate-200 focus:border-blue-500 rounded-lg text-center font-mono text-xs font-bold text-slate-700"
            />
          </div>

          {/* Estado Selection */}
          <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-widest block font-sans">
                Estado de la Convocatoria
              </span>
              <span className="text-[8px] text-slate-400 leading-none font-sans font-medium">
                Establece si recibe postulaciones actualmente.
              </span>
            </div>
            <div className="flex bg-slate-200 p-0.5 rounded-lg border border-slate-300">
              <button
                type="button"
                onClick={() => setFormEstado('abierto')}
                className={`px-3 py-1 text-[9px] font-bold uppercase rounded-md transition-all cursor-pointer ${
                  formEstado === 'abierto' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Abierto
              </button>
              <button
                type="button"
                onClick={() => setFormEstado('cerrado')}
                className={`px-3 py-1 text-[9px] font-bold uppercase rounded-md transition-all cursor-pointer ${
                  formEstado === 'cerrado' ? 'bg-white text-slate-600 shadow-xs' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Cerrado
              </button>
            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="pt-6 border-t border-slate-150 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="px-4.5 py-2.5 hover:bg-slate-105 text-slate-500 rounded-xl text-xs font-bold transition-colors cursor-pointer font-sans"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-extrabold uppercase tracking-wide transition-all shadow-md shadow-blue-500/5 cursor-pointer flex items-center gap-1.5"
            >
              <Save size={14} />
              <span>Guardar Desafío</span>
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}

// Minimal helpers
function FIRST_COMPANY_FALLBACK(all: Empresa[]): Empresa {
  return all[0] || { id_empresa: 1, razon_social: 'Certian SAC', ruc: '20601245781', logo_url: '', rubro: 'Tecnología', status: 'activo' };
}

// Fallback topic finder helper 
function FIRST_TOPIC_FALLBACK(all: Tema[]): Tema {
  return all[0] || { id_tema: 1, nombre: 'Desarrollo General', descripcion: 'Competencias técnicas generales' };
}
