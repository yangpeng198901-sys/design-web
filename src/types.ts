export type Language = 'en' | 'zh';

export interface ProjectDetail {
  conceptEN: string;
  conceptZH: string;
  materialsEN: string[];
  materialsZH: string[];
  specs: {
    area: string;
    location: string;
    year: string;
    vibe: string;
  };
}

export interface Project {
  id: string;
  titleEN: string;
  titleZH: string;
  subtitleEN: string;
  subtitleZH: string;
  category: 'residential' | 'commercial' | 'hospitality' | 'cultural';
  categoryLabelEN: string;
  categoryLabelZH: string;
  area: string;
  locationEN: string;
  locationZH: string;
  year: string;
  mainImage: string;
  gallery: string[];
  palette: string[]; // List of hex color codes
  detail: ProjectDetail;
}

export interface MaterialItem {
  id: string;
  nameEN: string;
  nameZH: string;
  category: 'flooring' | 'wall' | 'cabinet' | 'textile' | 'accent';
  categoryLabelEN: string;
  categoryLabelZH: string;
  image: string;
  colorHex?: string;
  textureDescriptionEN: string;
  textureDescriptionZH: string;
}

export interface QuizQuestion {
  id: number;
  questionEN: string;
  questionZH: string;
  options: {
    value: string;
    labelEN: string;
    labelZH: string;
    styleTag: string; // e.g. "Japandi", "Industrial Loft", "Bauhaus Minimalist", "Wabi-Sabi"
  }[];
}

export interface QuizResult {
  styleNameEN: string;
  styleNameZH: string;
  descEN: string;
  descZH: string;
  matchScore: number;
  recommendedPalette: string[];
  estimatedCostRange: string;
  tipsEN: string[];
  tipsZH: string[];
  relevantMaterials: string[]; // ID list of matching materials
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}
