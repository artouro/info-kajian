import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HeaderComponent } from './templates/header/header.component';
import { FooterComponent } from './templates/footer/footer.component';
import { SidebarComponent } from './templates/sidebar/sidebar.component';
import { KajianComponent } from './components/kajian/kajian.component';
import { TambahComponent } from './components/tambah/tambah.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TemplatesComponent } from './templates/templates.component';
import { AuthGuard } from './guards/auth.guard';
import { MasjidComponent } from './components/masjid/masjid.component';
import { MajelisComponent } from './components/majelis/majelis.component';
import { PemateriComponent } from './components/pemateri/pemateri.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SetNewProfileComponent } from './components/set-new-profile/set-new-profile.component';
import { DetailKajianComponent } from './components/detail-kajian/detail-kajian.component';
import { EditComponent } from './components/kajian/edit/edit.component';
import { NotFoundComponent } from './templates/not-found/not-found.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { FrontpageComponent } from './components/frontpage/frontpage.component';


const appRoutes: Routes = [
  { path: 'i', component: TemplatesComponent, children:[
      { path: '', component: KajianComponent, canActivate: [AuthGuard] },
      { path: 'tambah', component: TambahComponent, canActivate: [AuthGuard] },
      { path: 'masjid', component: MasjidComponent, canActivate: [AuthGuard] },
      { path: 'majelis', component: MajelisComponent, canActivate: [AuthGuard] },
      { path: 'pemateri', component: PemateriComponent, canActivate: [AuthGuard] },
      { path: 'set-new-profile', component: SetNewProfileComponent, canActivate: [AuthGuard] },
      { path: 'd/:id', component: DetailKajianComponent, canActivate: [AuthGuard] },
      { path: 'e/:id', component: EditComponent, canActivate: [AuthGuard] },
      { path: 'p/:username/edit', component: EditProfileComponent, canActivate: [AuthGuard] },
      { path: 'p/:username', component: ProfileComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: '', component: FrontpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    KajianComponent,
    TambahComponent,
    LoginComponent,
    SignupComponent,
    TemplatesComponent,
    MasjidComponent,
    MajelisComponent,
    PemateriComponent,
    NotificationComponent,
    ProfileComponent,
    SetNewProfileComponent,
    DetailKajianComponent,
    EditComponent,
    NotFoundComponent,
    EditProfileComponent,
    FrontpageComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase, 'infokajian'),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    ReactiveFormsModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
