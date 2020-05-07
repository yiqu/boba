import { Component, OnInit } from '@angular/core';
import { NavItem } from '../shared/models/nav-item.model';

@Component({
  selector: 'app-account-home',
  templateUrl: 'account.component.html'
})

export class AccountComponent implements OnInit {

  tabLinks: NavItem[] = [];
  activeLink: NavItem;

  constructor() {
    this.tabLinks.push(
      new NavItem("view", "Overview", "view", false, 'account_circle'),
      new NavItem("edit", "Update", "edit", false, 'edit'),
    );
  }

  ngOnInit() { }
}
