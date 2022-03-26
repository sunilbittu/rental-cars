import { Component, Input } from '@angular/core';
import { CarFormModalService } from 'src/app/car/form/car-form-modal.service';
import { CarService } from 'src/app/car/car.service';

@Component({
  selector: 'app-car-form-field',
  templateUrl: './car-form-field.component.html',
})
export class CarFormFieldComponent {
  @Input() mode = 'single';
  @Input() submitted = false;
  @Input() control;
  @Input() label;
  @Input() required = false;
  @Input() appAutofocus = false;
  @Input() serverSideSearch = false;
  @Input() fetchFn = null;
  @Input() mapperFn = null;
  @Input()
  ngForm: any;
  @Input() showCreate = false;
  @Input() hint;
  @Input() placeholder;

  constructor(
    public service: CarFormModalService,
    public carService: CarService,
  ) {}

  public get hasPermissionToCreate() {
    return this.carService.hasPermissionToCreate;
  }

  public async createModalOpen() {
    const record = await this.service.open();
    if (record) {
      if (this.mode === 'multiple') {
        this.control.setValue([
          ...(this.control.value || []),
          this.mapperFn(record),
        ]);
      } else {
        this.control.setValue(this.mapperFn(record));
      }
    }
  }
}
