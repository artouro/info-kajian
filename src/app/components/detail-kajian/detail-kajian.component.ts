import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Kajian } from '../../models/Kajian';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-detail-kajian',
  templateUrl: './detail-kajian.component.html',
  styleUrls: ['./detail-kajian.component.css']
})
export class DetailKajianComponent implements OnInit {
  kajian: Kajian = {};
  id;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage
  ) { }

  ngOnInit() {
    let id = this.activeRoute.snapshot.paramMap.get('id');
    this.id = id;
    this.afs.collection('kajian').doc(id).ref.get().then(doc => {
      let data = doc.data();
      //get poster kajian from FireStorage
      let storage = this.afStorage.ref('poster/' + data.poster);
      let url = storage.getDownloadURL().subscribe({
        next(res) { data.poster = res;}
      });
      this.kajian = data;
    });
  }
  delete(id){
    this.afs.collection('kajian').doc(id).delete().then(
      () => {
        console.log("Data successfully deleted");
        this.router.navigate(['/profile']);
      }
    ).catch(err => console.log('Error: ' + err));
  }
}