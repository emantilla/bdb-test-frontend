import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/services/events-service/events.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { TypeEventsService } from 'src/app/services/typeEvents/type-events.service';

@Component({
  selector: 'app-create-events',
  templateUrl: './create-events.component.html',
  styleUrls: ['./create-events.component.css']
})
export class CreateEventsComponent implements OnInit {

  isOnlyView = false;
  eventToProcess: any;
  titleBtn = '';
  activeBtn = true;
  typeRequest = '';
  categoryDesc = '';
  typeDesc = '';

  arrayCategories: Array<{ id: string, name: string }> = new Array();
  arrayTypes: Array<{ id: string, name: string }> = new Array();

  constructor(private route: Router, private eventsService: EventsService,
    private categoriesService: CategoriesService, private typeEventService: TypeEventsService) { }

  ngOnInit() {
    if (sessionStorage.getItem('idUser') === '' || sessionStorage.getItem('idUser') === undefined ||
    sessionStorage.getItem('idUser') === null) {
      this.route.navigate(['']);
    }
    this.typeRequest = sessionStorage.getItem('typeRequest');
    this.isOnlyView = this.typeRequest === 'detail';
    this.getCategories();
    this.getTypes();
    this.startComponent();
  }

  requestToExecute() {
    if (this.titleBtn === 'Regresar') {
      this.route.navigate(['events']);
    } else if (this.titleBtn === 'Crear') {
      this.createEvent();
    } else if (this.titleBtn === 'Guardar') {
      this.editEvent();
    }
  }


  updateEvent(value, field) {
    if (field === 'event_type') {
      this.arrayTypes.forEach(type => {
        if (type.name === value) {
          this.eventToProcess[field] = type.id;
        }
      });
    } else if (field === 'category_type') {
      this.arrayCategories.forEach(category => {
        if (category.name === value) {
          this.eventToProcess[field] = category.id;
        }
      });
    } else {
      this.eventToProcess[field] = value;
    }
    this.activeBtn = this.validateFieldEvent();
  }

  editEvent() {
    this.eventsService.editEvent(this.eventToProcess).subscribe(
      response => {
        alert('Evento actualizado satisfactoriamente');
        this.route.navigate(['events']);
      }, error => {
        alert('Error actualizando el evento, intente nuevamente');
      }
    );
  }

  createEvent() {
    this.eventToProcess.creation_user = sessionStorage.getItem('idUser');
    this.eventsService.addEvent(this.eventToProcess).subscribe(
      response => {
        alert('Evento creado satisfactoriamente');
        this.route.navigate(['events']);
      }, error => {
        alert('Error creando el evento, intente nuevamente');
      }
    );
  }

  validateFieldEvent(): boolean {
    if (this.eventToProcess.name !== '' &&
      this.eventToProcess.detail !== '' &&
      this.eventToProcess.place !== '' &&
      this.eventToProcess.address !== '' &&
      this.eventToProcess.start_date !== '' &&
      this.eventToProcess.end_date !== '' &&
      this.eventToProcess.category_type !== '' &&
      this.eventToProcess.event_type !== '') {
      return true;
    } else {
      return false;
    }
  }

  return() {
    this.route.navigate(['events']);
  }

  startComponent() {
    if (this.typeRequest === 'detail') {
      this.titleBtn = 'Regresar';
      this.eventToProcess = JSON.parse(sessionStorage.getItem('eventProcess'));

    } else if (this.typeRequest === 'create') {
      this.titleBtn = 'Crear';
      this.activeBtn = false;
      this.eventToProcess = {
        name: '',
        detail: '',
        place: '',
        address: '',
        creation_date: '',
        start_date: '',
        end_date: '',
        category_type: '',
        event_type: '',
        creation_user: ''
      };

    } else if (this.typeRequest === 'edit') {
      this.titleBtn = 'Guardar';
      this.eventToProcess = JSON.parse(sessionStorage.getItem('eventProcess'));
    }
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe(
      response => {
        this.arrayCategories = response;
        this.arrayCategories.forEach(category => {
          if (category.id === this.eventToProcess.category_type) {
            this.categoryDesc = category.name;
          }
        });
      }, error => {
        console.log('error categorias ', error);
      }
    );
  }

  getTypes() {
    this.typeEventService.getTipologies().subscribe(
      response => {
        this.arrayTypes = response;
        this.arrayTypes.forEach(type => {
          if (type.id === this.eventToProcess.event_type) {
            this.typeDesc = type.name;
          }
        });
        console.log('respuesta getTipologies ', this.arrayTypes);
      }, error => {
        console.log('error getTipologies ', error);
      }
    );
  }

}
