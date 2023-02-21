import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private sensibleData: string;
  constructor() { }

  getData() {
    return this.sensibleData;
  }
  setData(param) {
    this.sensibleData = param;
  }
}
