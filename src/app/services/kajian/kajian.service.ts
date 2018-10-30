import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Kajian } from '../../models/Kajian';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KajianService {
  kajianCollection: AngularFirestoreCollection<Kajian>;
  kajian: Observable<Kajian[]>;
  constructor(public http: Http, public afs: AngularFirestore) {
    console.log('Data service connected..');
    this.kajian = this.afs.collection('kajian').valueChanges();
  }
  getKajian() {
    return this.kajian;
  }
}
