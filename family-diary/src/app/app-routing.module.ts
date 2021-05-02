import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'forgot-password',
    loadChildren: () => import('./auth/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'verification',
    loadChildren: () => import('./auth/verification/verification.module').then( m => m.VerificationPageModule)
  },
  {
    path: 'new-password',
    loadChildren: () => import('./auth/new-password/new-password.module').then( m => m.NewPasswordPageModule)
  },
  {
    path: 'confirm-mail',
    loadChildren: () => import('./@app-core/@modular/confirm-mail/confirm-mail.module').then( m => m.ConfirmMailPageModule)
  },

  // { path: '**', redirectTo: 'main/chabad' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
