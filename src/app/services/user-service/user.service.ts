import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) { }

  createUser(data): Observable<any> {
    console.log('createUser data ', data);
    return this.httpService.postJSON('event/addUser/', data).map(
      response => {
        return response;
      }, error => {
        return error;
      }
    );
  }

  authUser(data): Observable<any> {
    return this.httpService.postJSON('event/login/', data).map(
      response => {
        return response;
      }, error => {
        return error;
      }
    );
  }
}
