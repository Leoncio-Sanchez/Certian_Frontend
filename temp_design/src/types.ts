export interface Empresa {
  id_empresa: number;
  razon_social: string;
  ruc: string;
  logo_url: string;
  rubro: string;
  status: 'activo' | 'inactivo';
}

export interface Tema {
  id_tema: number;
  nombre: string;
  descripcion: string;
}

export interface NivelDificultad {
  id_nivel_dificultad: number;
  nombre: 'basico' | 'medio' | 'avanzado';
  horas_por_defecto: number;
}

export interface TechnicalChallenge {
  id_reto: number;            // Coincide con id_reto INTEGER GENERATED ALWAYS AS IDENTITY
  id_empresa: number;         // FK fk_reto_empresa
  id_tema: number;            // FK fk_reto_tema
  id_nivel_dificultad: number; // FK fk_reto_nivel_dificultad
  titulo: string;             // varchar(150)
  descripcion_problema: string; // TEXT
  requisitos_entrega: string;   // TEXT
  estado: 'abierto' | 'cerrado'; // estado_reto_enum

  // Campos adicionales para simulación interactiva en el Dashboard
  applicantsCount: number;
  createdAt: string;
}
