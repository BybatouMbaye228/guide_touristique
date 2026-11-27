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
  { nom: 'Lac Rose', region: 'Dakar', image: 'images/lac_rose.jpeg', description: 'Un lac aux eaux roses.' },
  { nom: 'Île de Gorée', region: 'Dakar', image: 'images/ile_goree.jpg', description: 'Île historique classée à l\'UNESCO.' },
  { nom: 'Saint-Louis', region: 'Saint-Louis', image: 'images/saint_louis.jpg', description: 'Ancienne capitale coloniale.' },
  { nom: 'Delta du Saloum', region: 'Fatick', image: 'images/delta_Sine_Saloum.jpeg', description: 'Mangroves et îlots du delta.' },
  { nom: 'Cascade de Kédougou', region: 'Kédougou', image: 'images/cascade_kedougou.jpeg', description: 'Chutes d\'eau dans le sud-est du pays.' },
  { nom: 'Niokolo-Koba',region: 'Tambacounda', image: 'images/Niokolo-Koba.jpeg', description: 'vaste aire protégée situé dans le sud-est du Sénégal'}
 ];

  get total(): number { return this.guides.length; }
  get actif(): number { return this.guides.filter(g => g.actif).length; }
  get regions(): number { return new Set(this.guides.map(g => g.region)).size; }
}