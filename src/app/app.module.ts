import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
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
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
  { path: '', component: TemplatesComponent, children:[
      { path: '', component: KajianComponent },
      { path: 'tambah', component: TambahComponent },
    ] 
  },
  { path: 'auth', component: AuthComponent, children:[
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: SignupComponent },
    ] 
  },
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
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase, 'infokajian'),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
