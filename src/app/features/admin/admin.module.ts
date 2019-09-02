import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionsComponent } from './questions/questions.component';
import { ReportsComponent } from './reports/reports.component';
import { QuestionComponent } from './questions/question/question.component';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxPaginationModule } from 'ngx-pagination';
import { UsersComponent } from './users/users.component';
import { EditQuestionComponent } from './questions/edit-question/edit-question.component';
import { AddQuestionComponent } from './questions/add-question/add-question.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    Ng2SmartTableModule,
    NgxPaginationModule
  ],
  declarations: [DashboardComponent, QuestionsComponent, ReportsComponent, QuestionComponent,
    UsersComponent, EditQuestionComponent, AddQuestionComponent],
})
export class AdminModule { }
