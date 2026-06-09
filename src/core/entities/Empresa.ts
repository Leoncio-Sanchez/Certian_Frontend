export interface Candidate {
  id: string;
  name: string;
  avatar: string;
  career: string;
  cycle: string;
  location: string;
  matches: number; // e.g., 98 for 98%
  topTalent: boolean; // e.g., "Top 1% Talento"
  badge: "Gold" | "Sapphire" | "Ruby" | "Diamond" | null;
  techStack: string[];
  softSkills: string[];
  bio: string;
  validation360: {
    technical: number; // 0-100
    analytic: number; // 0-100
    communication: number; // 0-100
    systemic: number; // 0-100
    resilience: number; // 0-100
  };
  challengesCompleted: {
    id: string;
    title: string;
    date: string;
    points: number;
    seal: string;
  }[];
  contactEmail: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  rewardHEC: number; // Creditos de Excelencia Academica
  durationWeeks: number;
  activeParticipantsCount: number;
  status: "active" | "completed" | "draft";
  difficulty: "Intermedio" | "Avanzado" | "Básico";
  tags: string[];
  category: string;
  participants: {
    id: string;
    name: string;
    avatar: string;
    progress: number; // 0-100
    score?: number;
  }[];
}

export interface EvaluationSubmission {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateCareer: string;
  candidateAvatar: string;
  challengeTitle: string;
  submissionDate: string;
  docTitle: string;
  docContent: string;
  rubricScore: {
    technical: number; // 1-10
    analytic: number; // 1-10
    communication: number; // 1-10
  };
  checkedSkills: string[];
  status: "pending" | "approved" | "rejected";
  feedback?: string;
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  topics: string[];
  availability: string;
}

export interface ImmersionBoardItem {
  id: string;
  company: string;
  title: string;
  badgeText: string;
  badgeColor: string;
  duration: string;
  description: string;
  vacantSpots: number;
}

export interface CompanyBrandProfile {
  name: string;
  logo: string;
  coverImage: string;
  partnerStatus: string; // e.g. "Socio Estratégico CERTIAN"
  lastUpdated: string;
  history: string;
  values: {
    title: string;
    description: string;
    icon: string;
  }[];
  benefits: string[];
  communityImpact: string;
}
