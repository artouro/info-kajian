import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HeaderComponent } from './templates/header/header.component';
import { FooterComponent } from './templates/footer/footer.component';
import { SidebarComponent } from './templates/sidebar/sidebar.component';
import { KajianComponent } from './components/kajian/kajian.component';
import { LoginComponent } from './login/login.component';
import { TambahComponent } from './components/tambah/tambah.component';

const appRoutes: Routes = [
  { path: '', component: KajianComponent },
  { path: 'tambah', component: TambahComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    KajianComponent,
    LoginComponent,
    TambahComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
