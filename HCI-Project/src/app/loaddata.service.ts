import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {InjectorInstance} from "./app.module";

@Injectable({
  providedIn: 'root'
})
export class LoaddataService {
  httpClient: HttpClient;
  data: string;

  constructor() {
    this.httpClient = InjectorInstance.get<HttpClient>(HttpClient);
    this.data = 'Empty';
  }

  async loadData() {
    return await this.httpClient.get<string>('assets/data_formatted.txt',{ responseType: 'text' as 'json'}).toPromise();
  }

  async getData() {
    this.data = await this.loadData();
    return this.data
  }
}
