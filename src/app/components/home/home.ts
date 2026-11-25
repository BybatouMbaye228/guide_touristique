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

  get total(): number { return this.guides.length; }
  get actif(): number { return this.guides.filter(g => g.actif).length; }
  get regions(): number { return new Set(this.guides.map(g => g.region)).size; }
}