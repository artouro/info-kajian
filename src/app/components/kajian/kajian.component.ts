import { Component, OnInit} from '@angular/core';
import { KajianService } from '../../services/kajian/kajian.service';
import { Kajian } from '../../models/Kajian';

declare var Flickity: any;

@Component({
  selector: 'app-kajian',
  templateUrl: './kajian.component.html',
  styleUrls: ['./kajian.component.css']
})
export class KajianComponent implements OnInit, AfterViewInit {
  kajian: Kajian[];
    constructor(private kajianService: KajianService) {
  }

  ngOnInit() {
    this.kajianService.getKajian().subscribe(data => {
      this.kajian = data;
    });
  }

  deleteKajian(event, item) {
    this.kajianService.deleteKajian(item);
  }
}
