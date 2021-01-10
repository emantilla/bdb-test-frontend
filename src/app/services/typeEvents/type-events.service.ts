import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';


@Injectable({
  providedIn: 'root'
})
export class TypeEventsService {

  constructor(private httpService: HttpService) { }

  getTipologies(): Observable<any> {
    return this.httpService.getRequestWithoutPar( 'event/getTipology/').map(
      response => {
        return response;
      }, error => {
        return error;
      }
    );
  }
}
