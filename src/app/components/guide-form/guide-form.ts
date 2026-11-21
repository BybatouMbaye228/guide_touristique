import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GuideTouristique } from '../../models/guide-touristique';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-guide-form',
  styleUrl: './guide-form.css',
  templateUrl: './guide-form.html',
})
export class GuideForm {
  private readonly fb = inject(FormBuilder);

  readonly regions = [
    'Dakar', 'Diourbel', 'Fatick', 'Kaffrine', 'Kaolack', 'Kédougou', 'Kolda',
    'Louga', 'Matam', 'Saint-Louis', 'Sédhiou', 'Tambacounda', 'Thiès', 'Ziguinchor',
  ];

  form = this.fb.nonNullable.group({
    prenom: ['', [Validators.required, Validators.minLength(2)]],
    nom: ['', [Validators.required, Validators.minLength(2)]],
    region: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]],
    telephone: ['', [Validators.required, Validators.pattern(/^(\+221\s?)?(7[05678]|3[03])(\s?\d){7}$/)]],
    langues: ['', Validators.required],
    specialites: ['', [Validators.required, Validators.minLength(3)]],
    note: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
    actif: [true],
  });

  messageSucces = signal('');
  messageErreur = signal('');

  // Renvoie le message d'erreur d'un champ (ou '' s'il n'y a rien à afficher)
  erreur(champ: string): string {
    const c = this.form.get(champ);
    if (!c || !c.touched || !c.errors) {
      return '';
    }
    if (c.errors['required']) {
      return 'Ce champ est obligatoire.';
    }
    if (c.errors['minlength']) {
      return `Saisissez au moins ${c.errors['minlength'].requiredLength} caractères.`;
    }
    if (c.errors['min'] || c.errors['max']) {
      return 'La note doit être comprise entre 0 et 5.';
    }
    if (c.errors['pattern']) {
      return champ === 'email'
        ? 'Adresse e-mail invalide. Exemple : nom@exemple.com'
        : 'Numéro invalide. Exemple : 77 123 45 67 ou +221 77 123 45 67';
    }
    return 'Valeur invalide.';
  }

  enregistrer(): void {
    this.messageSucces.set('');
    this.messageErreur.set('');

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.messageErreur.set('Le formulaire contient des erreurs. Corrigez les champs signalés.');
      return;
    }

    const v = this.form.getRawValue();
    const guide: Omit<GuideTouristique, 'id'> = {
      prenom: v.prenom.trim(),
      nom: v.nom.trim(),
      region: v.region,
      email: v.email.trim(),
      telephone: v.telephone.trim(),
      langues: v.langues.split(',').map(l => l.trim()).filter(l => l.length > 0),
      specialites: v.specialites.trim(),
      note: v.note,
      actif: v.actif,
    };

    // Temporaire : l'enregistrement réel viendra quand le service sera écrit
    console.log('Guide à enregistrer :', guide);

    this.messageSucces.set(`Le guide ${guide.prenom} ${guide.nom} a été ajouté avec succès.`);
    this.form.reset();
  }
}