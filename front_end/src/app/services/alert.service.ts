import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  status = '';
  type: AlertType = '';
  content: string = '';

  constructor() {}

  alertError(content: string) {
    this.openAlert({ content, type: 'error'})
  }

  alertSuccess(content: string) {
    this.openAlert({ content, type: 'success'})
  }

  openAlert({ content, type }: { content: string; type: AlertType }) {
    this.status = 'open';
    this.type = type;
    this.content = content;
  }

  closeAlert() {
    this.status = 'close';
  }
}

type AlertType = 'success' | 'error' | '';
