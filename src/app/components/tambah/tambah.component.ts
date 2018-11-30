import { Component, OnInit } from '@angular/core';
import { KajianService } from '../../services/kajian/kajian.service';
import { Kajian } from '../../models/Kajian';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-tambah',
  templateUrl: './tambah.component.html',
  styleUrls: ['./tambah.component.css']
})
export class TambahComponent implements OnInit {
  kajian: Kajian = {
    author: '',
    judul: '',
    pemateri: '',
    lokasi: '',
    tanggal: '',
    kategori: ''
  };
  selectedFile: File = null;
  constructor(
    private kajianService: KajianService, 
    private afs: AngularFirestore ,
    private afStorage: AngularFireStorage,
    private auth: AuthService
    ){ }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      this.kajian.author = user.username;
    })
  }

  selectFile(event){
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.kajian.judul !== '' && this.kajian.pemateri !== '' && this.kajian.lokasi !== '' &&
        this.kajian.tanggal !== '' && this.kajian.kategori !== '') {
        this.kajianService.addKajian(this.kajian).then(docRef => {
          
          // Mengambil id doc kajian yang baru saja diupload ..
          let id = docRef.id;

          // Mengambil ekstensi file yang dipilih ..
          let ext = this.selectedFile.name.split('.').pop();

          // Set filename ..
          let filename = `${id}.${ext}`;

          // Uploading ..
          this.afStorage.upload(`/poster/${filename}`, this.selectedFile); 
          
          // Menambahkan field 'poster' ke document yg baru saja di-add ..
          this.afs.collection('kajian').doc(id)
           .set({ poster: filename }, { merge: true });
          
          // Reset model
          this.kajian.judul = '';
          this.kajian.pemateri = '';
          this.kajian.lokasi = '';
          this.kajian.tanggal = '';
          this.kajian.kategori = '';
        });
    }
  }

}
