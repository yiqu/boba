import { Component, OnInit } from '@angular/core';
import { NavItem } from '../shared/models/nav-item.model';

@Component({
  selector: 'app-management',
  templateUrl: 'management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  tabLinks: NavItem[] = [];
  activeLink: NavItem;

  constructor() {
    this.tabLinks.push(
      new NavItem("inventory", "Inventory", "inventory", false, 'assignment'),
      new NavItem("users", "Users", "users", false, 'people'),
      new NavItem("archives", "Order Archives", "archives", false, 'poll')
    );
  }

  ngOnInit() { }
}
