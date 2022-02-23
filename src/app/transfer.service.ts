import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  private data: any;
  constructor() {}

  setData(data: any) {
    this.data = data;
  }

  getData() {
    let temp = this.data;
    this.clearData();
    return temp;
  }

  clearData() {
    this.data = undefined;
  }
}
