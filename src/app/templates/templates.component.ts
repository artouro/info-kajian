import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
  loggedIn = false;
  constructor( private auth: AuthService ){
    this.auth.user.subscribe(data => {
      if(data != null){
        this.loggedIn = true;
      }
    })
  }
  ngOnInit() {
  }

}
