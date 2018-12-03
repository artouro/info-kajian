import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  user: Observable<User[]>;
  userCollection: AngularFirestoreCollection<User>;
  dataFollowing: Observable<User[]>;

  constructor(
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
  ) { }

  mapping(snapshotChanges){
    this.user = snapshotChanges.map(changes => {
      return changes.map(result => {
        const data = result.payload.doc.data() as User;
        data.uid = result.payload.doc.id;
        return data;
      })
    });
  }

  getDataFollowing(username){
    this.userCollection = this.afs.collection('users', ref => ref.where('username', '==', username));
    this.mapping(this.userCollection.snapshotChanges());
    return this.user;
  }

  updateUserProfile(data: User){
  	return this.afs.collection('users').doc(data.uid).set(data);
  }
}
