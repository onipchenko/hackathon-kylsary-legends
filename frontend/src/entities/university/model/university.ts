export type ProgramStat = {
  year?: number;
  bachelor_places?: number;
  master_places?: number;
  tuition_fee?: number;
  passing_score?: number;
};

export type Program = {
  id: number;
  name: string;
  code?: string;
  category?: string;
  tags?: string[];
  description?: string;
  program_stats: ProgramStat[];
};

export type UniversityDetails = {
  id: number;
  name_ru: string;
  name_en?: string;
  city?: string;
  country?: string;
  description?: string;
  hero_image_url?: string;
  logo_url?: string;
  website?: string;
  slug: string;
  programs: Program[];
  students_count?: number;
  graduates_yearly?: number;
  qs_ranking?: number;
  campuses_count?: number;
};
