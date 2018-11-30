import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Kajian } from '../../models/Kajian';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class KajianService {
  kajianCollection: AngularFirestoreCollection<Kajian>;
  kajian: Observable<Kajian[]>;
  kajianDoc: AngularFirestoreDocument<Kajian>;
  docId: string;

  constructor(public http: Http, public afs: AngularFirestore) {
    this.kajianCollection = this.afs.collection('kajian');
  }
  // firestore snapshot 'map' function
  mapping(snapshotChanges){
    this.kajian = snapshotChanges.map(changes => {
      return changes.map(result => {
        const data = result.payload.doc.data() as Kajian;
        data.id = result.payload.doc.id;
        return data;
      })
    });
  }
  // call this in component's controller 
  // to get list of kajian
  getKajian() {
    this.kajianCollection = this.afs.collection('kajian', ref => ref.orderBy('tanggal', 'asc'));
    this.mapping(this.kajianCollection.snapshotChanges());
    return this.kajian;
  }
  getKajianSaya(username) {
    this.kajianCollection = this.afs.collection('kajian', ref => ref.where('author', '==', username));
    this.mapping(this.kajianCollection.snapshotChanges());
    return this.kajian;
  }
  getKajianCategory(category:string){
    this.kajianCollection = this.afs.collection('kajian', ref => ref.where('kategori', '==', category));
    this.mapping(this.kajianCollection.snapshotChanges());
    console.log(this.kajian);
    return this.kajian;
  }
  addKajian(kajian: Kajian) {
    return Promise.resolve(this.kajianCollection.add(kajian));
  }
  deleteKajian(kajian: Kajian) {
    this.kajianDoc = this.afs.doc(`kajian/${kajian.id}`);
    this.kajianDoc.delete();
  }
}
