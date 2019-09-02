import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthModule } from './features/auth/auth.module';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';




const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'exam',
    component: MainLayoutComponent,
    loadChildren: './features/exam/exam.module#ExamModule'
  },
  {
    path: 'auth',
    component: LoginLayoutComponent,
    loadChildren: './features/auth/auth.module#AuthModule'
  },
  {
    path: 'admin',
    component: MainLayoutComponent,
    loadChildren: './features/admin/admin.module#AdminModule'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
