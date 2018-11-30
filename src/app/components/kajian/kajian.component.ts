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
  tablighAkbar: Kajian[];
  rutin: Kajian[];
  tematik: Kajian[];
  constructor(private kajianService: KajianService, private masjidService: MasjidService, public afStorage: AngularFireStorage) {
  }

  ngOnInit() {
    this.kajianService.getKajian().subscribe(data => {
      this.kajian = data;
      // getting kajian poster from FireStorage 
      // based on filename in document.poster
      data.map(res => {
        let posterStorage = this.afStorage.ref('poster/' + res.poster);
        let url = posterStorage.getDownloadURL().subscribe({
          next(data) { res.poster = data; }
        });
        res.poster = url;
      });
    });
    this.getDataRutin();
    this.getDataTematik();
    this.getDataTablighAkbar();
  }

  getDataTablighAkbar(){
    this.kajianService.getKajianCategory('Tabligh Akbar').subscribe(data => {
      this.tablighAkbar = data;
    });
  }
  getDataTematik(){
    this.kajianService.getKajianCategory('Tematik').subscribe(data => {
      this.tematik = data;
    });
  }
  getDataRutin(){
    this.kajianService.getKajianCategory('Rutin').subscribe(data => {
      this.rutin = data;
    });
  }

  deleteKajian(event, item) {
    this.kajianService.deleteKajian(item);
  }
}
