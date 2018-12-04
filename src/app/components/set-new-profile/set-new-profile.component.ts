import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth/auth.service';
import { UsersService } from '../../services/users/users.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './set-new-profile.component.html',
    styleUrls: ['./set-new-profile.component.css']
})
export class SetNewProfileComponent implements OnInit {
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
        private router: Router
    ) {}

    ngOnInit() {
        this.auth.user.subscribe(user => {
            if(user.profileSet == true){
                this.router.navigate(['/profile']);
            }
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
            this.router.navigate(['/i/p/' + user.username]);
        });
    }
}
