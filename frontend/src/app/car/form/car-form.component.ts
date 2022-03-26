import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CarModel } from 'src/app/car/car-model';
import { FormSchema } from 'src/app/shared/form/form-schema';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
})
export class CarFormComponent implements OnInit {
  form: FormGroup;
  schema: FormSchema;

  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Input() isEditing;
  @Input() record;
  @Input() saveLoading;
  @Input() modal = false;

  constructor(private formBuilder: FormBuilder) {}

  async ngOnInit() {
    this.buildSchema();
    this.buildForm();
  }

  get fields() {
    return CarModel.fields;
  }

  doSave() {
    if (!this.form.valid) {
      return;
    }

    const id = this.record && this.record.id;
    const values = this.schema.cast(this.form.value);

    this.save.emit({ id, values });
  }

  doReset() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.schema.buildForm(this.record);
  }

  private buildSchema() {
    this.schema = new FormSchema(
      [
        this.fields.name,
        this.fields.image,
        this.fields.seats,
        this.fields.carType,
        this.fields.transmission,
        this.fields.deliveryType,
        this.fields.note,
        this.fields.brand,
        this.fields.price,
        this.fields.countInStock,
        this.fields.rating,
        this.fields.numReviews,
        this.fields.fuelType,
        this.fields.locations,
        this.fields.freeKms,
        this.fields.deliveryCharges,
        this.fields.bookedTimeSlotsFrom,
        this.fields.bookedTimeSlotsTo,
        this.fields.rentPerHour,
        this.fields.capacity,
      ],
      this.formBuilder,
    );
  }
}
