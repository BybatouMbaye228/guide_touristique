import { Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GuideTouristique } from '../../models/guide-touristique';
import { GuideTouristiqueService } from '../../services/guide-touristique.service';

@Component({
  selector: 'app-guide-list',
  standalone: true,
  imports: [DecimalPipe, RouterLink],
  templateUrl: './guide-list.html',
  styleUrl: './guide-list.css'
})
export class GuideList {
  private readonly guideService = inject(GuideTouristiqueService);

  // Données
  guides = signal<GuideTouristique[]>(this.guideService.getAll());
  regions = signal<string[]>(this.guideService.getRegions());

  // Filtres
  recherche = signal('');
  regionChoisie = signal('');   // '' = toutes
  statutChoisi = signal('');    // '' = tous, 'actif', 'inactif'

  // Messages
  message = signal('');
  messageErreur = signal(false);

  // Liste filtrée : recherche + région + statut combinés
  guidesFiltres = computed(() => {
    const q = this.recherche().trim().toLocaleLowerCase('fr');
    const region = this.regionChoisie();
    const statut = this.statutChoisi();

    return this.guides().filter(g => {
      const texte = `${g.prenom} ${g.nom} ${g.specialites}`.toLocaleLowerCase('fr');
      const okRecherche = texte.includes(q);
      const okRegion = region === '' || g.region === region;
      const okStatut =
        statut === '' ||
        (statut === 'actif' && g.actif) ||
        (statut === 'inactif' && !g.actif);
      return okRecherche && okRegion && okStatut;
    });
  });

  filtreActif = computed(
    () => this.recherche().trim() !== '' || this.regionChoisie() !== '' || this.statutChoisi() !== ''
  );

  surRecherche(event: Event): void {
    this.recherche.set((event.target as HTMLInputElement).value);
  }
  surRegion(event: Event): void {
    this.regionChoisie.set((event.target as HTMLSelectElement).value);
  }
  surStatut(event: Event): void {
    this.statutChoisi.set((event.target as HTMLSelectElement).value);
  }

  reinitialiserFiltres(): void {
    this.recherche.set('');
    this.regionChoisie.set('');
    this.statutChoisi.set('');
  }

  supprimer(guide: GuideTouristique): void {
    const confirme = confirm(`Supprimer ${guide.prenom} ${guide.nom} ? Cette action est définitive.`);
    if (!confirme) {
      return;
    }

    const reussi = this.guideService.supprimer(guide.id);
    if (reussi) {
      this.guides.set(this.guideService.getAll());
      this.regions.set(this.guideService.getRegions());
      if (!this.regions().includes(this.regionChoisie())) {
        this.regionChoisie.set('');
      }
      this.afficherMessage(`${guide.prenom} ${guide.nom} a été supprimé avec succès.`, false);
    } else {
      this.afficherMessage("Suppression impossible : ce guide n'existe plus.", true);
    }
  }

  private afficherMessage(texte: string, erreur: boolean): void {
    this.message.set(texte);
    this.messageErreur.set(erreur);
    setTimeout(() => this.message.set(''), 4000);
  }
}