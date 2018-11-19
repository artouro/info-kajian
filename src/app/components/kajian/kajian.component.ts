import { Component, OnInit} from '@angular/core';
import { KajianService } from '../../services/kajian/kajian.service';
import { MasjidService } from '../../services/masjid/masjid.service';
import { Kajian } from '../../models/Kajian';
import { User } from '../../models/User';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-kajian',
  templateUrl: './kajian.component.html',
  styleUrls: ['./kajian.component.css']
})
export class KajianComponent implements OnInit {
  kajian: Kajian[];
  majelis: User[];
  masjid: User[];
  pemateri: User[];
  constructor(private kajianService: KajianService, private masjidService: MasjidService, public afStorage: AngularFireStorage) {
  }

  ngOnInit() {
    this.kajianService.getKajian().subscribe(data => {
      this.kajian = data;
      data.map(res => {
        let storage = this.afStorage.ref('poster/' + res.poster);
        let url = storage.getDownloadURL().subscribe({
          next(data) { res.poster = data; }
        });
        res.poster = url;
      });
    });
    this.getDataMasjid();
    this.getDataMajelis();
    this.getDataPemateri();
  }

  getDataMasjid(){
    this.masjidService.getMasjid().subscribe(data => {
      this.masjid = data;
    });
  }
  getDataMajelis(){
    this.masjidService.getMajelis().subscribe(data => {
      this.majelis = data;
    });
  }
  getDataPemateri(){
    this.masjidService.getPemateri().subscribe(data => {
      this.pemateri = data;
    });
  }

  deleteKajian(event, item) {
    this.kajianService.deleteKajian(item);
  }
}
