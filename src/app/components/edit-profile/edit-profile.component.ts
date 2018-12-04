import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { MasjidService } from '../../services/masjid/masjid.service';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
 user: User = {
   email: '',
   kota: '',
   level: '',
   nama: '',
   photoUrl: '',
   telp: '',
   username : ''
 };
 username;
 uid;
 selectedFile: File = null;
  constructor(
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private auth: AuthService,
    private userService: MasjidService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.user.subscribe(data => {
      this.username = data.username;
      this.userService.getDataProfile(data.username).subscribe(res => {
        this.uid = res[0].uid;
        this.afs.collection('users').doc(this.uid).ref.get().then(doc => {
          this.user = doc.data();
        });
      });
    });
  }
  selectFile(event){
    this.selectedFile = event.target.files[0];
  }
  onSubmit(){
    console.log(this.user);
    this.afs.collection('users').doc(this.uid).update(this.user).then(() => {
      if(this.selectedFile != null ){
        let ext = this.selectedFile.name.split('.').pop();

        // Set filename ..
        let filename = `${this.uid}.${ext}`;

        // Uploading ..
        this.afStorage.upload(`/userPhoto/${filename}`, this.selectedFile); 
        
        // Menambahkan field 'poster' ke document yg baru saja di-add ..
        this.afs.collection('users').doc(this.uid)
        .set({ photoUrl: filename }, { merge: true });
      }
    }).then(() => {
      return this.router.navigate([`/i/p/${this.username  }`]);
    })
  }
}
