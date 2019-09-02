import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExamRoutingModule } from './exam-routing.module';
import { ExamComponent } from './exam/exam.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  imports: [
    CommonModule,
    ExamRoutingModule,
    FormsModule,
    ReactiveFormsModule,
	
  ],
  declarations: [ExamComponent, HomeComponent]

})
export class ExamModule { }
