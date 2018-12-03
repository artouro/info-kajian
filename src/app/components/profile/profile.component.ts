import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth/auth.service';
import { UsersService } from '../../services/users/users.service';
import { KajianService } from '../../services/kajian/kajian.service';
import { User } from '../../models/user';
import { Kajian } from '../../models/Kajian';
import { ActivatedRoute } from '@angular/router';
import { MasjidService } from 'src/app/services/masjid/masjid.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    kajian: Kajian[];
    dataFollowing = [];
    kajianFollowing: Kajian[];
    dataFollowingActive: string;
    userCollection : AngularFirestoreCollection<User>;
    user: User = {
        uid: '',
        photoUrl: '',
        nama: '',
        telp: '',
        kota: '',
        profileSet: false
    };
    following = false;
    selectedFile: File = null;
    toggleForm: boolean = false;
    activeBtn: boolean = true;
    username;
    authUsername = false;
    constructor(
        private afs: AngularFirestore,
        private afStorage: AngularFireStorage,
        private auth: AuthService,
        private users: UsersService,
        private kajianService: KajianService,
        private userService: UsersService,
        private masjidService: MasjidService,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.username = this.activatedRoute.snapshot.paramMap.get('username');
        this.auth.user.subscribe(user => {
            if (user.username == this.username) this.authUsername = true;
        });
        //get data profile
        this.userCollection = this.afs.collection('users', ref => ref.where('username', '==', this.username));
        let data = this.userCollection.snapshotChanges().map(changes => {
            return changes.map(result => {
                const data = result.payload.doc.data() as User;
                return data;
            });
        });
        data.subscribe(data => {
            data.map(res => {
                this.user = res;
                if(res.photoUrl != ''){
                    let storage = this.afStorage.ref('userPhoto/' + res.photoUrl);
                    let url = storage.getDownloadURL().subscribe({
                    next(data) { res.photoUrl = data; }
                    });
                    res.photoUrl = url;
                }
            })
        });

        //get data kajian saya
        this.kajianService.getKajianSaya(this.username).subscribe(data => {
            this.kajian = data;
            data.map(res => {
                let storage = this.afStorage.ref('poster/' + res.poster);
                let url = storage.getDownloadURL().subscribe({
                next(data) { res.poster = data; }
                });
                res.poster = url;
            });
        });

        // set follow/unfollow button
        this.getAuthData().then((data: any) => {
            if(data.following != null){
                let arr = data.following;
                if(arr.includes(this.username)){
                   this.following = true; 
                }
            } 
        });
        //get data following
        this.getAuthData().then((data: any) => {
            let arr = data.following;
            for(let i = 0; i < arr.length; i++){
                this.userService.getDataFollowing(arr[i]).subscribe(items => {
                    this.dataFollowing[i] = items;
                });
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

    follow(username){
        // this.auth.user.subscribe(data => {
        //     let storage = this.afStorage.ref('userPhoto/' + data.photoUrl);
        //     let url = storage.getDownloadURL().subscribe(url => this.link = url);
        //     this.link = url;
        // }); 
        // this.afs.collection('users').doc(uid).set({ following : username } , { merge: true }).then(docRef => {
        //     console.log(docRef);
        // });
        this.getAuthData().then((data: any) => {
            if(data.following != null){
                let arr = data.following;
                if(!arr.includes(username)){
                    arr.push(username);
                    this.afs.collection('users').doc(data.uid).set({ following : arr } , { merge: true });
                }
            } else {
                this.afs.collection('users').doc(data.uid).set({ following : [username] } , { merge: true });
            }
            this.following = true;
        });
    }  
    unfollow(username){
        this.getAuthData().then((data: any) => {
            let followers = data.following;
            let index = followers.indexOf(username);
            if(index > -1){
                followers.splice(index, 1);
                this.afs.collection('users').doc(data.uid).set({ following : followers } , { merge: true });
                this.following = false;
            }
        });
    }  
    showKajianFollowing(username){
        this.kajianService.getKajianSaya(username).subscribe(data => {
            this.kajianFollowing = data;
        })
        this.masjidService.getDataProfile(username).subscribe(data => {
            this.dataFollowingActive = data[0].nama;
        });
    }
    getAuthData(){
        return new Promise(resolve => {
            this.auth.user.subscribe( (data: any) => {
                resolve(data);
            });
        })
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
