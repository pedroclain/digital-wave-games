import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading = false;

  constructor() { }

  openLoading() {
    this.isLoading = true;
  }

  closeLoading() {
    this.isLoading = false;
  }
}
