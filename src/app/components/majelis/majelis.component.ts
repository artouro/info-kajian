import { Component, OnInit } from '@angular/core';
import { MasjidService } from '../../services/masjid/masjid.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-majelis',
  templateUrl: './majelis.component.html',
  styleUrls: ['./majelis.component.css']
})
export class MajelisComponent implements OnInit {
  user: User[];
  constructor(private masjidService: MasjidService) { }

  ngOnInit() {
  	this.masjidService.getMajelis().subscribe(data => {
    	this.user = data;
    });
  }

}
