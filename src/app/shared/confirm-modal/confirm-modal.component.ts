import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from '../../custom_modules/dialogModule';
import { IConfirmModel } from '../class/IConfirmModel';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent extends DialogComponent<IConfirmModel, boolean> implements IConfirmModel {
  title: string;
  message: string;
  showFooter: boolean;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  confirm() {
    this.result = true;
    this.close();
  }
}
