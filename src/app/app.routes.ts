import { Routes } from '@angular/router';
import { GuideList } from './components/guide-list/guide-list';
import { GuideForm } from './components/guide-form/guide-form';
import { NotFound } from './components/not-found/not-found';
import { Home } from './components/home/home';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'guides', component: GuideList },
  { path: 'guides/nouveau', component: GuideForm },
  { path: 'guides/:id/modifier', component: GuideForm },
  { path: '**', component: NotFound }
];
