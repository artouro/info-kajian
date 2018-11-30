import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  user: Observable<User[]>;
  constructor(
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
  ) { }

  updateUserProfile(data: User){
  	return this.afs.collection('users').doc(data.uid).set(data);
  }
}
