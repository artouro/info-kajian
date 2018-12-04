import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { firebase } from '@firebase/app';
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { switchMap, startWith, tap, filter } from 'rxjs/operators';
import { NotifyService } from '../notify/notify.service';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user: Observable<User | null>;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router,
        private notify: NotifyService
    ) {
        this.user = this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                } else {
                    return of(null);
                }
            })
        );
    }
    getDataProfile(username){
        this.afs.collection('users', ref => ref.where('username', '==', username)).snapshotChanges().map(changes => {
            return changes.map(result => {
                const data = result.payload.doc as User;
                data.uid = result.payload.doc.id;
                console.log(data);
                return data;
            });
        });
    }
    login(email: string, password: string) {
        return this.afAuth.auth
            .signInWithEmailAndPassword(email, password)
            .then(credentials => {
                this.notify.update('Welcome back!', 'success');
                this.router.navigate(['/i']);
                // return this.updateUserData(credentials.user)
            })
            .catch(err => this.handleError(err));
    }

    register(form: FormGroup) {
        return this.afAuth.auth
            .createUserWithEmailAndPassword(form.value['email'], form.value['password'])
            .then(credential => {
                this.notify.update('Welcome new user!', 'success');
                this.router.navigate(['/i/set-new-profile']);
                // return this.updateUserData(credential.user); // if using firestore
                const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${credential.user.uid}`);

                const data: User = {
                    uid: credential.user.uid,
                    email: credential.user.email || null,
                    nama: form.value['nama'],
                    // photoUrl: user.photoUrl || 'https://goo.gl/Fz9nrQ',
                    username: form.value['username'],
                    level: form.value['level']
                };

                return userRef.set(data);
            })
            .catch(error => this.handleError(error));
    }

    logout() {
        this.afAuth.auth.signOut().then(() => {
            this.router.navigate(['/login']);
        });
    }

    private handleError(error: Error) {
        this.notify.update(error.message, 'error');
    }

    private updateUserData(user: User) {
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

        const data: User = {
            uid: user.uid,
            email: user.email || null,
            // displayName: user.displayName || 'Nameless User',
            photoUrl: user.photoUrl || 'https://goo.gl/Fz9nrQ',
            username: user.username || null
        };
        return userRef.set(data);
    }
}
