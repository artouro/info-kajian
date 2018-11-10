import { Component, OnInit} from '@angular/core';
import { MasjidService } from '../../services/masjid/masjid.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-masjid',
  templateUrl: './masjid.component.html',
  styleUrls: ['./masjid.component.css']
})
export class MasjidComponent implements OnInit {
	user: User[];
    constructor(private masjidService: MasjidService) {
  }	

  ngOnInit() {
    this.masjidService.getMasjid().subscribe(data => {
    	this.user = data;
    });
  }
}
