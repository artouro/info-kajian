import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth/auth.service';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	user: User = {
		uid: '',
		photoUrl: '',
		nama: '',
		telp: '',
		kota: '',
		profileSet: false
	}
	selectedFile: File = null;
	toggleForm: boolean = false;
	activeBtn: boolean = true;
  
  constructor(private afs: AngularFirestore ,private afStorage: AngularFireStorage, public auth: AuthService, private users: UsersService) { }

  ngOnInit() {
  	this.auth.user.subscribe(user => {
  		if(user.photoUrl!=null){
	        let storage = this.afStorage.ref('userPhoto/' + user.photoUrl);
	        let url = storage.getDownloadURL().subscribe({
	          next(data) { user.photoUrl = data; }
	        });
	        user.photoUrl = url;
	        this.user = user
	    }
	});
  }

  setPhotoProfile(){
	let ext = this.selectedFile.name.split('.').pop();
	// Uploading ..
	this.auth.user.subscribe(user => {
		let id = user.uid;
		let filename = `${id}.${ext}`;
		this.afStorage.upload(`/userPhoto/${filename}`, this.selectedFile).then(()=>{
			this.afs.collection('users').doc(id)
	           .set({ photoUrl: filename }, { merge: true }).then(()=>{
		           	let storage = this.afStorage.ref('userPhoto/' + user.photoUrl);
			        let url = storage.getDownloadURL().subscribe({
			          next(data) { user.photoUrl = data; }
			        });
			        user.photoUrl = url;
			        this.user = user
			        this.toggleForm = true
	           });

		});
	});
	
  }

  selectFile(event){
    this.selectedFile = event.target.files[0];
    this.activeBtn = false;
  }

  submit(){
  	this.auth.user.subscribe(user => {
  		user.profileSet = true;
  		user.nama = this.user.nama;
  		user.kota = this.user.kota;
  		user.telp = this.user.telp;
  		this.users.updateUserProfile(user);	
  	});
  }

}
