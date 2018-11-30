import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { User } from '../../models/User';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class MasjidService {
  userCollection: AngularFirestoreCollection<User>;
  user: Observable<User[]>;
  userDoc: AngularFirestoreDocument<User>;
  constructor(public http: Http, public afs: AngularFirestore) { 
}
  mapping(snapshotChanges){
    this.user = snapshotChanges.map(changes => {
      return changes.map(result => {
        const data = result.payload.doc.data() as User;
        return data;
      })
    });
  }
  getMajelis(){
    this.userCollection = this.afs.collection('users', ref => ref.where('level', '==', '2'));
    this.mapping(this.userCollection.snapshotChanges());
    return this.user;
  }
  getMasjid(){
    this.userCollection = this.afs.collection('users', ref => ref.where('level', '==', '1'));
    this.mapping(this.userCollection.snapshotChanges());
  	return this.user;
  }
  getPemateri(){
    this.userCollection = this.afs.collection('users', ref => ref.where('level', '==', '3'));
    this.mapping(this.userCollection.snapshotChanges());
    return this.user;
  }
  getDataProfile(username){
    this.userCollection = this.afs.collection('users', ref => ref.where('username', '==', username).limit(1));
    this.mapping(this.userCollection.snapshotChanges());
    return this.user;
  }
}
