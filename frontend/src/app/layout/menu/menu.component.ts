import { Component, OnInit } from '@angular/core';
import { AuditLogService } from 'src/app/audit-log/audit-log.service';
import { SettingsService } from 'src/app/settings/settings.service';
import { UserService } from 'src/app/user/user.service';
import { PlanService } from 'src/app/plan/plan.service';
import { CustomerService } from 'src/app/customer/customer.service';
import { CarService } from 'src/app/car/car.service';
import { OrderService } from 'src/app/order/order.service';
import { BookingService } from 'src/app/booking/booking.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  constructor(
    public auditLogService: AuditLogService,
    public settingsService: SettingsService,
    public userService: UserService,
    public planService: PlanService,
    public customerService: CustomerService,
    public carService: CarService,
    public orderService: OrderService,
    public bookingService: BookingService,
  ) {}

  ngOnInit(): void {}
}
