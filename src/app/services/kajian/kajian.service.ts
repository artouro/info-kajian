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

  constructor(public http: Http, public afs: AngularFirestore) {
    this.kajianCollection = this.afs.collection('kajian', ref => ref.orderBy('tanggal', 'desc'));
    this.kajian = this.kajianCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Kajian;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }
  getKajian() {
    return this.kajian;
  }
  addKajian(kajian: Kajian) {
    this.kajianCollection.add(kajian);
  }
  deleteKajian(kajian: Kajian) {
    this.kajianDoc = this.afs.doc(`kajian/${kajian.id}`);
    this.kajianDoc.delete();
  }
}
