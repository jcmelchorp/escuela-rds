import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@rds-auth/guards/auth.guard';

import { LayoutComponent } from '@rds-core/layout/layout.component';

import { AboutComponent } from '@rds-shared/components/about/about.component';
import { CodeConductSchoolComponent } from '@rds-shared/components/code-conduct-school/code-conduct-school.component';
import { CodeConductComponent } from '@rds-shared/components/code-conduct/code-conduct.component';
import { HomeComponent } from '@rds-shared/components/home/home.component';
import { LicenseComponent } from '@rds-shared/components/license/license.component';
import { LocationComponent } from '@rds-shared/components/location/location.component';
import { NotFoundComponent } from '@rds-shared/components/not-found/not-found.component';
import { PrivacyPolicyComponent } from '@rds-shared/components/privacy-policy/privacy-policy.component';
import { RemoteLearningComponent } from '@rds-shared/components/remote-learning/remote-learning.component';
import { TermsComponent } from '@rds-shared/components/terms/terms.component';
import { UnderConstructionComponent } from '@rds-shared/components/under-construction/under-construction.component';

import { SettingsComponent } from '@rds-core/components/settings/settings.component';

import { YoutubeComponent } from '@rds-shared/components/youtube/youtube.component';

import { AdminGuard } from '@rds-admin/guards/admin.guard';

import { ReopenningComponent } from '@rds-shared//components/reopenning/reopenning.component';

import { TeachersGuard } from './teachers/guards/teachers.guard';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: { breadcrumb: 'Home' },
    children: [
      { path: '', component: HomeComponent, data: { breadcrumb: null } },
      {
        path: 'profesores',
        loadChildren: () =>
          import('./teachers/teachers.module').then((m) => m.TeachersModule),
        canActivate: [TeachersGuard],
        data: { breadcrumb: 'Profesores' },
      },
      {
        path: 'escuela',
        loadChildren: () =>
          import('@rds-school/school.module').then((m) => m.SchoolModule),
        canActivate: [AdminGuard],
        data: { breadcrumb: 'Administración' },
      },
      {
        path: 'gsuite',
        loadChildren: () =>
          import('@rds-classroom/classroom.module').then(
            (m) => m.ClassroomModule
          ),
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Google GSuite' },
      },
      {
        path: 'perfil',
        loadChildren: () =>
          import('@rds-classroom/user-profiles/user-profiles.module').then(
            (m) => m.UserProfilesModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'calificaciones',
        loadChildren: () =>
          import('./grades/grades.module').then((m) => m.GradesModule),
        canActivate: [AdminGuard],
      },
      {
        path: 'user',
        loadChildren: () =>
          import('@rds-user/user.module').then((m) => m.UserModule),
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Servicios escolares' },
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('@rds-admin/admin.module').then((m) => m.AdminModule),
        canActivate: [AdminGuard],
      },
      { path: 'youtube', component: YoutubeComponent },
      {
        path: 'about',
        component: AboutComponent,
        data: { breadcrumb: '¿Quiénes somos?' },
      },
      {
        path: 'reopenning',
        component: ReopenningComponent,
        data: { breadcrumb: 'Reapertura' },
      },
      {
        path: 'remote-learning',
        component: RemoteLearningComponent,
        data: { breadcrumb: 'Educación a distancia' },
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
        data: { breadcrumb: 'Políticas de privacidad' },
      },
      { path: 'not-found', component: NotFoundComponent },
      {
        path: 'location',
        component: LocationComponent,
        data: { breadcrumb: '¿Dónde estamos?' },
      },
      { path: 'license', component: LicenseComponent },
      {
        path: 'code-conduct',
        component: CodeConductComponent,
        data: { breadcrumb: 'Código de conducta' },
      },
      { path: 'code-conduct-school', component: CodeConductSchoolComponent },
      {
        path: 'terms',
        component: TermsComponent,
        data: { breadcrumb: '¿Quiénes somos?' },
      },
      { path: 'under-construction', component: UnderConstructionComponent },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Configuración' },
      },
      { path: '**', component: NotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
