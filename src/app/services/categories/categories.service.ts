import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpService: HttpService) { }

  getCategories(): Observable<any> {
    return this.httpService.getRequestWithoutPar('event/getCategory/').map(
      response => {
        return response;
      }, error => {
        return error;
      }
    );
  }
}
