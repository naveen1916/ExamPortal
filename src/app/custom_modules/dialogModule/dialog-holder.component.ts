import {
  Component, ViewChild, ViewContainerRef, ComponentFactoryResolver,
  Type
} from '@angular/core';
import { DialogComponent } from './dialog.component';
import { DialogWrapperComponent } from './dialog-wrapper.component';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { DialogOptions } from './dialog.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-holder',
  template: '<template #element></template>',
})
export class DialogHolderComponent {

  /**
   * Target element to insert dialogs
   */
  @ViewChild('element', { read: ViewContainerRef,static:false }) public element: ViewContainerRef;

  /**
   * Array of dialogs
   * @type {Array<DialogComponent> }
   */
  dialogs: Array<DialogComponent<any, any>> = [];

  /**
   * Constructor
   * @param {ComponentFactoryResolver} resolver
   */
  constructor(private resolver: ComponentFactoryResolver) { }

  /**
   * Adds dialog
   * @param {Type<DialogComponent>} component
   * @param {object?} data
   * @param {DialogOptions?} options
   * @return {Observable<*>}
   */
  addDialog<T, T1>(component: Type<DialogComponent<T, T1>>, data?: T, options?: DialogOptions): Observable<T1> {
    options = options || <DialogOptions>{};
    const factory = this.resolver.resolveComponentFactory(DialogWrapperComponent);
    const componentRef = this.element.createComponent(factory, options.index);
    const dialogWrapper: DialogWrapperComponent = <DialogWrapperComponent>componentRef.instance;
    const _component: DialogComponent<T, T1> = dialogWrapper.addComponent(component);
    if (typeof (options.index) !== 'undefined') {
      this.dialogs.splice(options.index, 0, _component);
    } else {
      this.dialogs.push(_component);
    }
    setTimeout(() => {
      dialogWrapper.container.nativeElement.classList.add('show');
      dialogWrapper.container.nativeElement.classList.add('in');
    });
    if (options.autoCloseTimeout) {
      setTimeout(() => {
        this.removeDialog(_component);
      }, options.autoCloseTimeout);
    }
    if (options.closeByClickingOutside) {
      dialogWrapper.closeByClickOutside();
    }
    if (options.backdropColor) {
      dialogWrapper.container.nativeElement.style.backgroundColor = options.backdropColor;
    }
    return _component.fillData(data);
  }

  /**
   * Removes dialog
   * @param {DialogComponent} component
   */
  removeDialog(component: DialogComponent<any, any>) {
    const element = component.wrapper.container.nativeElement;

    element.classList.remove('show');
    element.classList.remove('in');
    setTimeout(() => {
      this._removeElement(component);
    }, 300);
  }

  private _removeElement(component) {
    const index = this.dialogs.indexOf(component);
    if (index > -1) {
      this.element.remove(index);
      this.dialogs.splice(index, 1);
    }
  }

  clear() {
    this.element.clear();
    this.dialogs = [];
  }
}
