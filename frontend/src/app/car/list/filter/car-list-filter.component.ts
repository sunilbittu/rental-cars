import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FilterSchema } from 'src/app/shared/form/filter-schema';
import { CarListService } from 'src/app/car/list/car-list.service';
import { CarModel } from 'src/app/car/car-model';

@Component({
  selector: 'app-car-list-filter',
  templateUrl: './car-list-filter.component.html',
})
export class CarListFilterComponent implements OnInit {
  form: FormGroup;
  schema: FilterSchema;
  expanded: boolean = false;

  constructor(
    private service: CarListService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {}

  async ngOnInit() {
    this.buildSchema();
    this.buildForm();
    this.doFilter();
  }

  get fields() {
    return CarModel.fields;
  }

  get loading() {
    return this.service.loading;
  }

  doRemove(key) {
    this.form.get(key).setValue(null);
    this.expanded = false;
    const values = this.schema.cast(this.form.value);
    return this.service.doFetch(values);
  }

  doToggleExpanded() {
    this.expanded = !this.expanded;
  }

  doFilter() {
    if (!this.form.valid) {
      return;
    }

    this.expanded = false;
    const values = this.schema.cast(this.form.value);
    return this.service.doFetch(values);
  }

  buildForm() {
    const { filter } = this.service;
    const params = this.route.snapshot.queryParams;
    this.form = this.schema.buildForm(filter, params);
  }

  doReset() {
    this.form = this.schema.buildForm();
    this.doFilter();
    this.expanded = false;
  }

  private buildSchema() {
    this.schema = new FilterSchema(
      [
        this.fields.name,
        this.fields.seatsRange,
        this.fields.carType,
        this.fields.transmission,
        this.fields.deliveryType,
        this.fields.note,
        this.fields.brand,
        this.fields.priceRange,
        this.fields.countInStockRange,
        this.fields.ratingRange,
        this.fields.numReviewsRange,
        this.fields.fuelType,
        this.fields.locations,
        this.fields.freeKmsRange,
        this.fields.deliveryChargesRange,
        this.fields.bookedTimeSlotsFromRange,
        this.fields.bookedTimeSlotsToRange,
        this.fields.rentPerHourRange,
        this.fields.capacityRange,
      ],
      this.formBuilder,
    );
  }
}
