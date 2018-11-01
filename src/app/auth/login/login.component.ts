import { Component, OnInit, HostBinding } from '@angular/core';
// import { AngularFireModule } from '@angular/fire';
// import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // error: any;

  // constructor(public afAuth: AngularFireAuth, private router: Router) { 
  //   this.afAuth.auth.onAuthStateChanged(auth => {
  //     if (auth) {
  //       this.router.navigateByUrl('/').then((success) => {
  //         this.router.navigate(['/']);
  //       }).catch((err) => this.error = err);
  //     }
  //   });
  // }

  // loginGoogle() {
  //   this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  // }

  ngOnInit() {
  }

}
