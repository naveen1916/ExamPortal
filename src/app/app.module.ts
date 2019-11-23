import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './layouts/layouts.module';
import { BootstrapModalModule } from './custom_modules/dialogModule';
import { SharedModule } from './shared/shared.module';
import { ConfirmModalComponent } from './shared/confirm-modal/confirm-modal.component';
import { NgProgressModule, NgProgressInterceptor } from 'ngx-progressbar';
import { AddQuestionComponent } from './features/admin/questions/add-question/add-question.component';
import { AdminModule } from './features/admin/admin.module';
import { EditQuestionComponent } from './features/admin/questions/edit-question/edit-question.component';
import { NO_ERRORS_SCHEMA ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import{MydialogComponent} from './features/admin/mydialog/mydialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatDialogModule} from '@angular/material';

@Injectable({
  providedIn: 'root'
})

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutsModule,
    AppRoutingModule,
    NgProgressModule,
    AdminModule,
    BootstrapModalModule.forRoot({ container: document.body }),
    MDBBootstrapModule.forRoot(),
    NgbModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true }
  ],
  entryComponents: [
    ConfirmModalComponent,
    AddQuestionComponent,
    EditQuestionComponent,
    MydialogComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA,],

  bootstrap: [AppComponent]
})
export class AppModule { }
