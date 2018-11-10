import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../../services/notify/notify.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(public notify: NotifyService) { }

  ngOnInit() {
  }

}
