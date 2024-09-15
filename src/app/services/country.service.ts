import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_COUNTRIES , GET_COUNTRY_BY_CODE, GET_CONTINENTS } from '../graphql.operations';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private apolloProvider: Apollo) { }
  getContinents(): Observable<any> {
    return this.apolloProvider.watchQuery({
      query : GET_CONTINENTS 
    }).valueChanges;
  }

  getCountries():Observable<any> {
    return this.apolloProvider.watchQuery({
      query: GET_COUNTRIES
    }).valueChanges
  }

  getCountryById(code: string):Observable<any>{
    return this.apolloProvider.watchQuery({
      query:GET_COUNTRY_BY_CODE,
      variables: {code:code.trim()}
    }).valueChanges
  }
}
