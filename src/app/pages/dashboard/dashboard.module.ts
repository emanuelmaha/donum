import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Dashboard } from './dashboard.component';
import { routing } from './dashboard.routing';

import { Calendar } from './calendar';
import { CalendarService } from './calendar/calendar.service';
import { Todo } from './todo';
import { TodoService } from './todo/todo.service';
import { MomentModule } from 'angular2-moment/moment.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    MomentModule,
    routing,
  ],
  declarations: [
    Todo,
    Calendar,
    Dashboard,
  ],
  providers: [
    CalendarService,
    TodoService,
  ],
})
export class DashboardModule { }
