export interface GuideTouristique {
  id: number;
  prenom: string;
  nom: string;
  region: string;
  langues: string[];
  specialites: string;
  actif: boolean;
  email: string;
  telephone: string;
  note: number;
}