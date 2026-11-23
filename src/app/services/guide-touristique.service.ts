import { Injectable } from '@angular/core';
import { GuideTouristique } from '../models/guide-touristique';

@Injectable({ providedIn: 'root' })
export class GuideTouristiqueService {
  private guides: GuideTouristique[] = [
    { id: 1, prenom: 'Aminata', nom: 'Diop', region: 'Dakar', langues: ['Français', 'Wolof'],
      specialites: 'Patrimoine historique', actif: true,
      email: 'aminata.diop@gmail.com', telephone: '77 123 45 67', note: 4.8 },
    { id: 2, prenom: 'Mamadou', nom: 'Sagna', region: 'Ziguinchor', langues: ['Français', 'Diola'],
      specialites: 'Écotourisme', actif: true,
      email: 'mamadou.sagna@gmail.com', telephone: '77 234 56 78', note: 4.6 },
    { id: 3, prenom: 'Khady', nom: 'Ndiaye', region: 'Saint-Louis', langues: ['Français', 'Wolof', 'Anglais'],
      specialites: 'Architecture coloniale', actif: true,
      email: 'khady.ndiaye@gmail.com', telephone: '76 345 67 89', note: 4.2 },
    { id: 4, prenom: 'Ousmane', nom: 'Ba', region: 'Tambacounda', langues: ['Français', 'Pulaar'],
      specialites: 'Safari et faune', actif: false,
      email: 'ousmane.ba@gmail.com', telephone: '78 456 78 90', note: 3.9 },
    { id: 5, prenom: 'Awa', nom: 'Faye', region: 'Thiès', langues: ['Français', 'Sérère'],
      specialites: 'Artisanat', actif: true,
      email: 'awa.faye@gmail.com', telephone: '70 567 89 01', note: 4.0 },
  ];

  // ---------- Lecture ----------
  getAll(): GuideTouristique[] {
    return [...this.guides];
  }

  getById(id: number): GuideTouristique | undefined {
    return this.guides.find(g => g.id === id);
  }

  getRegions(): string[] {
    return [...new Set(this.guides.map(g => g.region))].sort((a, b) => a.localeCompare(b, 'fr'));
  }

  // ---------- Écriture (noms du contrat d'équipe) ----------
  ajouter(donnees: Omit<GuideTouristique, 'id'>): GuideTouristique {
    const ids = this.guides.map(g => g.id);
    const nouveau: GuideTouristique = { ...donnees, id: ids.length > 0 ? Math.max(...ids) + 1 : 1 };
    this.guides = [...this.guides, nouveau];
    return nouveau;
  }

  modifier(guide: GuideTouristique): boolean {
    if (!this.guides.some(g => g.id === guide.id)) {
      return false;
    }
    this.guides = this.guides.map(g => (g.id === guide.id ? guide : g));
    return true;
  }

  supprimer(id: number): boolean {
    const avant = this.guides.length;
    this.guides = this.guides.filter(g => g.id !== id);
    return this.guides.length < avant;
  }

  // ---------- Alias (anciens noms, pour ne rien casser) ----------
  add(guide: Omit<GuideTouristique, 'id'>): GuideTouristique {
    return this.ajouter(guide);
  }

  update(guide: GuideTouristique): void {
    this.modifier(guide);
  }

  delete(id: number): void {
    this.supprimer(id);
  }
}