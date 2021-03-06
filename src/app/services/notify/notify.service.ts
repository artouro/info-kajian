import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Msg{
	content: string;
	style: string;
}

@Injectable({
  providedIn: 'root'
})

export class NotifyService {

  constructor() { }

  private _msgSource = new Subject<Msg | null>();

  msg = this._msgSource.asObservable();

  update(content: string, style: 'success' | 'error' | 'info') {
    const msg: Msg = { content, style };
    this._msgSource.next(msg);
  }

  clear() {
    this._msgSource.next(null);
  }
}

