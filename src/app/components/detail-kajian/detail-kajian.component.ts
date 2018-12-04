import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Kajian } from '../../models/Kajian';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-detail-kajian',
  templateUrl: './detail-kajian.component.html',
  styleUrls: ['./detail-kajian.component.css']
})
export class DetailKajianComponent implements OnInit {
  kajian: Kajian = {};
  id;
  authUsername;
  author = false;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      this.authUsername = user.username;
    });
    let id = this.activeRoute.snapshot.paramMap.get('id');
    this.id = id;
    this.afs.collection('kajian').doc(id).ref.get().then(doc => {
      let data = doc.data();
      if(data.author == this.authUsername) this.author = true;

      //get poster kajian from FireStorage
      let storage = this.afStorage.ref('poster/' + data.poster);
      storage.getDownloadURL().subscribe({
        next(res) { data.poster = res;}
      });
      this.kajian = data;
    });
  }
  delete(id){
    this.afs.collection('kajian').doc(id).delete().then(
      () => {
        this.router.navigate(['/i/p/' + this.authUsername]);
      }
    );
  }
}