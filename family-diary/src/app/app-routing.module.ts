import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './@app-core/auth-guard.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },

  {
    path: 'forgot-password',
    loadChildren: () => import('./auth/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'verification',
    loadChildren: () => import('./auth/verification/verification.module').then( m => m.VerificationPageModule),

  },
  {
    path: 'new-password',
    loadChildren: () => import('./auth/new-password/new-password.module').then( m => m.NewPasswordPageModule),

  },
  {
    path: 'account-setting',
    loadChildren: () => import('./account-setting/account-setting.module').then( m => m.AccountSettingPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'add-event',
    loadChildren: () => import('./add-event/add-event.module').then( m => m.AddEventPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'confirm-mail',
    loadChildren: () => import('./@app-core/@modular/confirm-mail/confirm-mail.module').then( m => m.ConfirmMailPageModule)
  },
  {
    path: 'modal-add-todo',
    loadChildren: () => import('./modal-add-todo/modal-add-todo.module').then( m => m.ModalAddTodoPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'to-do',
    loadChildren: () => import('./to-do/to-do.module').then( m => m.ToDoPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'event',
    loadChildren: () => import('./event/event.module').then( m => m.EventPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'new-family',
    loadChildren: () => import('./new-family/new-family.module').then( m => m.NewFamilyPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'list-item',
    loadChildren: () => import('./list-item/list-item.module').then( m => m.ListItemPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'page-noti',
    loadChildren: () => import('./@app-core/@modular/page-noti/page-noti.module').then(m => m.PageNotiModule),
  },
  {
    path: 'update-password',
    loadChildren: () => import('./changepassword/changepassword.module').then( m => m.ChangepasswordPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'invite',
    loadChildren: () => import('./invite/invite.module').then( m => m.InvitePageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'activity-detail',
    loadChildren: () => import('./activity-detail/activity-detail.module').then( m => m.ActivityDetailPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'edit-family',
    loadChildren: () => import('./edit-family/edit-family.module').then( m => m.EditFamilyPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'calendar-event',
    loadChildren: () => import('./calendar-event/calendar-event.module').then( m => m.CalendarEventPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./about-us/about-us.module').then( m => m.AboutUsPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'photo',
    loadChildren: () => import('./photo/photo.module').then( m => m.PhotoPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'form',
    loadChildren: () => import('./@app-core/@modular/confirm-mail/confirm-mail.module').then( m => m.ConfirmMailPageModule),
  },
  { path: '**', redirectTo: 'home'  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'maps',
    loadChildren: () => import('./@app-core/@modular/maps/maps.module').then( m => m.MapsPageModule)
  },

  
  
 


  
 
 

  
 
 
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
