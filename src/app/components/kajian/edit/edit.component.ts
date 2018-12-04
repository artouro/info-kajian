import { Component, OnInit } from '@angular/core';
import { KajianService } from '../../../services/kajian/kajian.service';
import { Kajian } from '../../../models/Kajian';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  kajian: Kajian = {
    author: '',
    judul: '',
    pemateri: '',
    lokasi: '',
    tanggal: new Date,
    kategori: '',
    kota: ''
  };
  id;
  selectedFile: File = null;
  constructor(
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private kajianService: KajianService
  ) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.id = id;
    this.afs.collection('kajian').doc(id).ref.get().then(doc => {
      this.kajian = doc.data();
    });
  }
  selectFile(event){
    this.selectedFile = event.target.files[0];
  }
  onSubmit(){
    this.afs.collection('kajian').doc(this.id).update(this.kajian).then(res => {
      if(this.selectedFile != null ){
        let ext = this.selectedFile.name.split('.').pop();

        // Set filename ..
        let filename = `${this.id}.${ext}`;

        // Uploading ..
        this.afStorage.upload(`/poster/${filename}`, this.selectedFile); 
        
        // Menambahkan field 'poster' ke document yg baru saja di-add ..
        this.afs.collection('kajian').doc(this.id)
        .set({ poster: filename }, { merge: true });
      }
    }).then(() => {
      this.router.navigate([`/i/d/${this.id}`]);
    })
  }
}
