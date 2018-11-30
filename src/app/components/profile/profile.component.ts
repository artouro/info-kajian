import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth/auth.service';
import { UsersService } from '../../services/users/users.service';
import { KajianService } from '../../services/kajian/kajian.service';
import { User } from '../../models/user';
import { Kajian } from '../../models/Kajian';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    kajian: Kajian[];
    user: User = {
        uid: '',
        photoUrl: '',
        nama: '',
        telp: '',
        kota: '',
        profileSet: false
    };
    selectedFile: File = null;
    toggleForm: boolean = false;
    activeBtn: boolean = true;

    constructor(
        private afs: AngularFirestore,
        private afStorage: AngularFireStorage,
        public auth: AuthService,
        private users: UsersService,
        private kajianService: KajianService
    ) {}

    ngOnInit() {
        this.auth.user.subscribe(user => {
            let username = user.username;
            this.kajianService.getKajianSaya(username).subscribe(data => {
                this.kajian = data;
                data.map(res => {
                  let storage = this.afStorage.ref('poster/' + res.poster);
                  let url = storage.getDownloadURL().subscribe({
                    next(data) { res.poster = data; }
                  });
                  res.poster = url;
                });
              });
            if (user.photoUrl != null) {
                const storage = this.afStorage.ref('userPhoto/' + user.photoUrl);
                const url = storage.getDownloadURL().subscribe({
                    next(data) {
                        user.photoUrl = data;
                    }
                });
                user.photoUrl = url;
                this.user = user;
            }
        });
    }

    setPhotoProfile() {
        const ext = this.selectedFile.name.split('.').pop();
        // Uploading ..
        this.auth.user.subscribe(user => {
            const id = user.uid;
            const filename = `${id}.${ext}`;
            this.afStorage.upload(`/userPhoto/${filename}`, this.selectedFile).then(() => {
                this.afs
                    .collection('users')
                    .doc(id)
                    .set({ photoUrl: filename }, { merge: true })
                    .then(() => {
                        const storage = this.afStorage.ref('userPhoto/' + user.photoUrl);
                        const url = storage.getDownloadURL().subscribe({
                            next(data) {
                                user.photoUrl = data;
                            }
                        });
                        user.photoUrl = url;
                        this.user = user;
                        this.toggleForm = true;
                    });
            });
        });
    }

    selectFile(event) {
        this.selectedFile = event.target.files[0];
        this.activeBtn = false;
    }

    submit() {
        this.auth.user.subscribe(user => {
            user.profileSet = true;
            user.nama = this.user.nama;
            user.kota = this.user.kota;
            user.telp = this.user.telp;
            this.users.updateUserProfile(user);
        });
    }
}
