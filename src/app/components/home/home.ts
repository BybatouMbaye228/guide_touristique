import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GuideTouristiqueService } from '../../services/guide-touristique.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  private service = inject(GuideTouristiqueService);
  guides = this.service.getAll();

  destinations = [
    { nom: 'Lac Rose', region: 'Dakar', image: 'images/lac-rose.jpg', description: 'Un lac aux eaux roses.' },
    { nom: 'Île de Gorée', region: 'Dakar', image: 'images/goree.jpg', description: 'Île historique classée à l\'UNESCO.' },
    { nom: 'Saint-Louis', region: 'Saint-Louis', image: 'images/saint-louis.jpg', description: 'Ancienne capitale coloniale.' }
  ];

  get total(): number { return this.guides.length; }
  get actif(): number { return this.guides.filter(g => g.actif).length; }
  get regions(): number { return new Set(this.guides.map(g => g.region)).size; }
}