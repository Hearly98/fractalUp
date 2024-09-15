import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  api_key = environment.API_KEY
  private urlApi = "https://pixabay.com/api/"
  constructor(private http: HttpClient) { }
  public getImages(search: String, page= 1, perPage= 10): Observable<any>{
    return this.http.get<any>(`${this.urlApi}/?key=${this.api_key}&q=${search}&image_type=photo&page=${page}&per_page=${perPage}`);
  }
}
