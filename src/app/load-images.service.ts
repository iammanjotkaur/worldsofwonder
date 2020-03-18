import { Injectable } from '@angular/core';
// import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadImagesService {

  constructor(private http: HttpClient ) { }
  async fetchImages() {
  const data = await this.http.get('https://www.mocky.io/v2/5bdd28dd32000075008c6227').pipe(map(res => [res, 'working'])).toPromise();
  console.log('data', data);
  return data;

  }
}
