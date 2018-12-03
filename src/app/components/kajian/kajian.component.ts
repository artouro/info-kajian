import { Component, OnInit} from '@angular/core';
import { KajianService } from '../../services/kajian/kajian.service';
import { MasjidService } from '../../services/masjid/masjid.service';
import { Kajian } from '../../models/Kajian';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { AngularFireStorage } from '@angular/fire/storage';
import { formatDate } from '@angular/common';

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
  kota: string = '';
  tgl: string = '';
  tanggal: string = '';
  constructor(
    private kajianService: KajianService, 
    private masjidService: MasjidService, 
    private afStorage: AngularFireStorage
  ) { 
  }

  ngOnInit() {
    this.kajianService.getKajian().subscribe(data => {
      this.kajian = data;
      // getting kajian poster from FireStorage 
      // based on filename in document.poster
      this.getImgURL(data);
    });
    this.getDataRutin();
    this.getDataTematik();
    this.getDataTablighAkbar();
  }

  getImgURL(data){
    data.map(res => {
        let posterStorage = this.afStorage.ref('poster/' + res.poster);
        let url = posterStorage.getDownloadURL().subscribe({
          next(data) { res.poster = data; }
        });
        res.poster = url;
      });
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
  hariIni(){
    this.tanggal = formatDate(new Date(),"yyyy-MM-dd", "en");
    this.kota = '';
    this.filterKajian("==");
    this.tanggal = '';
  }
  all(){
    this.tanggal = formatDate(new Date(),"yyyy-MM-dd", "en");
    this.kota = '';
    this.filterKajian(">=");
    this.tanggal = '';
  }
  filterTgl(){
    this.tanggal = this.tgl;
    this.filterKajian("==");
  }
  filterKajian(operator: string){
    // console.log(this.kota+this.tgl);
    this.kajianService.filter(this.kota, this.tanggal, operator).subscribe(data => {
      this.kajian = data;
      this.getImgURL(data);
    })
  }

  deleteKajian(event, item) {
    this.kajianService.deleteKajian(item);
  }
}
