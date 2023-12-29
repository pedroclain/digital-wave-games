import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  status = '';
  type: AlertType = '';
  content: string = '';

  constructor() {}

  openAlert({ content, type }: { content: string; type: AlertType }) {
    this.status = 'open';
    this.type = type;
    this.content = content;
  }

  closeAlert() {
    this.status = 'close';
  }
}

type AlertType = 'alert' | 'success' | 'error' | '';
