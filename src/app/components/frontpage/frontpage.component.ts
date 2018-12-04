import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {
  loggedIn = false;
  constructor(private auth: AuthService) {
    this.auth.user.subscribe(data => {
      if(data != null) this.loggedIn = true;
    });
  }

  ngOnInit() {
    
  }

}
