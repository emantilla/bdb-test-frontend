import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/services/events-service/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  userId = '';
  emailUser = '';
  hasEvents = false;
  arrayEvents: Array<{
    id: string, name: string, detail: string, place: string, address: string, start_date: string,
    end_date: string, category_type: string, event_type: string, creation_user: string
  }> = new Array();

  constructor(private route: Router, private eventsService: EventsService) { }

  ngOnInit() {
    if (sessionStorage.getItem('idUser') === '' || sessionStorage.getItem('idUser') === undefined ||
    sessionStorage.getItem('idUser') === null) {
      this.route.navigate(['']);
    }
    this.emailUser = sessionStorage.getItem('mailUser');
    this.initEvents();
    sessionStorage.setItem('typeRequest', '');
    sessionStorage.setItem('eventProcess', '' );
  }

  initEvents() {
    const request = {
      userId: sessionStorage.getItem('idUser')
    };
    this.eventsService.getEventsByUser(request).subscribe(
        response => {
          this.arrayEvents = response;
          this.hasEvents = this.arrayEvents.length > 0;
        }, error => {
          console.log('error getEventsByUser ' , error.status);
        }
      );
  }

  createEvent() {
    sessionStorage.setItem('typeRequest', 'create');
    this.route.navigate(['create-event']);
  }

  exitEvents() {
    sessionStorage.clear();
    this.route.navigate(['']);
  }

  deleteEvent(idEvent) {
    const request = {
      id: idEvent + ''
    };
    this.eventsService.deleteEvent(request).subscribe(
      response => {
        alert('Evento eliminado satisfactoriamente');
        this.initEvents();
      }, error => {
        alert('Error eliminado el evento, intente nuevamente');
      }
    );
  }

  redirect(idEvent, typeTx) {
    sessionStorage.setItem('typeRequest', typeTx);
    this.arrayEvents.forEach(event => {
      if (event.id === idEvent) {
        sessionStorage.setItem('eventProcess', JSON.stringify(event) );
      }
    });
    this.route.navigate(['create-event']);
  }
}
