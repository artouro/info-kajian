import { Component, OnInit } from '@angular/core';
import { MasjidService } from '../../services/masjid/masjid.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-pemateri',
  templateUrl: './pemateri.component.html',
  styleUrls: ['./pemateri.component.css']
})
export class PemateriComponent implements OnInit {
  user: User[];
  constructor(private masjidService: MasjidService) { }

  ngOnInit() {
  	this.masjidService.getPemateri().subscribe(data => {
    	this.user = data;
    });
  }

}
