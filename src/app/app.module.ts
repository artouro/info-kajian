import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
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
import { AuthGuard } from './auth.guard';
import { MasjidComponent } from './components/masjid/masjid.component';
import { MajelisComponent } from './components/majelis/majelis.component';
import { PemateriComponent } from './components/pemateri/pemateri.component';
import { NotificationComponent } from './components/notification/notification.component';

const appRoutes: Routes = [
  { path: '', component: TemplatesComponent, children:[
      { path: '', component: KajianComponent, canActivate: [AuthGuard] },
      { path: 'tambah', component: TambahComponent, canActivate: [AuthGuard] },
      { path: 'masjid', component: MasjidComponent, canActivate: [AuthGuard] },
      { path: 'majelis', component: MajelisComponent, canActivate: [AuthGuard] },
      { path: 'pemateri', component: PemateriComponent, canActivate: [AuthGuard] }
    ] 
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
