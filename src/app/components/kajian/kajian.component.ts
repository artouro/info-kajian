import { Component, OnInit} from '@angular/core';
import { KajianService } from '../../services/kajian/kajian.service';
import { Kajian } from '../../models/Kajian';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-kajian',
  templateUrl: './kajian.component.html',
  styleUrls: ['./kajian.component.css']
})
export class KajianComponent implements OnInit {
  kajian: Kajian[];
  constructor(private kajianService: KajianService, public afStorage: AngularFireStorage) {
  
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
  }

  deleteKajian(event, item) {
    this.kajianService.deleteKajian(item);
  }
}
