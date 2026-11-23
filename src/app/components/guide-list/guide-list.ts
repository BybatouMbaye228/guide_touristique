import { Component, computed, inject, signal } from '@angular/core';
import { GuideTouristique } from '../../models/guide-touristique';
import { GuideTouristiqueService } from '../../services/guide-touristique.service';

@Component({
  selector: 'app-guide-list',
  standalone: true,
  imports: [],
  templateUrl: './guide-list.html',
  styleUrl: './guide-list.css'
})
export class GuideList {
  private readonly guideService = inject(GuideTouristiqueService);

  guides = signal<GuideTouristique[]>(this.guideService.getAll());

  recherche = signal('');

  // Liste filtrée par la recherche (nom, prénom, spécialité)
  guidesFiltres = computed(() => {
    const q = this.recherche().trim().toLocaleLowerCase('fr');
    return this.guides().filter(g =>
      `${g.prenom} ${g.nom} ${g.specialites}`.toLocaleLowerCase('fr').includes(q)
    );
  });

  surRecherche(event: Event): void {
    this.recherche.set((event.target as HTMLInputElement).value);
  }

  reinitialiserRecherche(): void {
    this.recherche.set('');
  }

  // TODO Membre 1 : signals regionChoisie / statutChoisi et filtres
  // TODO Membre 2 (plus tard) : supprimer(guide)
}