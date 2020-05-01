import { Component, OnInit } from '@angular/core';
import { NavItem } from '../shared/models/nav-item.model';

@Component({
  selector: 'app-management',
  templateUrl: 'management.component.html'
})
export class ManagementComponent implements OnInit {

  managementLinks: NavItem[] = [];

  constructor() {
    this.managementLinks.push(
      new NavItem("inventory", "Inventory", "inventory"),
      new NavItem("users", "Users", "users"),
      new NavItem("archives", "Order Archives", "archives")
    )
  }

  ngOnInit() { }
}
