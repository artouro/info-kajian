import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { User } from '../../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MajelisService {	  
  userCollection: AngularFirestoreCollection<User>;
  user: Observable<User[]>;
  userDoc: AngularFirestoreDocument<User>;

  constructor(public http: Http, public afs: AngularFirestore) { 
  	this.userCollection = this.afs.collection('users', ref => ref.where('level', '==', '2'));
    this.user = this.userCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(result => {
        const data = result.payload.doc.data() as User;
        return data;
      });
    }));  
  }

  getMasjid(){
  	return this.user;
  }
}
