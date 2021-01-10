import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private httpService: HttpService) { }

  addEvent(data): Observable<any> {
    return this.httpService.postJSON('event/addEvent/', data).map(
      response => {
        return response;
      }, error => {
        return error;
      }
    );
  }

  getEventsByUser(data): Observable<any> {
    return this.httpService.getRequest( 'event/getEvents/', data).map(
      response => {
        return response;
      }, error => {
        return error;
      }
    );
  }

  editEvent(data): Observable<any> {
    return this.httpService.postJSON('event/editEvent/', data).map(
      response => {
        return response;
      }, error => {
        return error;
      }
    );
  }

 deleteEvent(data): Observable<any> {
    return this.httpService.postJSON('event/removeEvent/', data).map(
      response => {
        return response;
      }, error => {
        return error;
      }
    );
  }
}
