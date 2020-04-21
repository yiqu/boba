import { Component, OnInit } from '@angular/core';
import { NavItem } from '../shared/models/nav-item.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RestDataFireService } from '../shared/services/fire-data.service';

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  tabLinks: NavItem[] = [];
  activeLink: NavItem;

  constructor(public router: Router, public route: ActivatedRoute,
    public fds: RestDataFireService) {
    this.tabLinks.push(
      new NavItem('open', "Open", "open-orders"),
      new NavItem('closed', "Completed", "completed-orders")
    );

    this.route.url.subscribe((val) => {
      this.setActiveTab();
    });

    this.route.queryParamMap.subscribe((val: ParamMap) => {
    });
  }

  ngOnInit() {
    this.setActiveTab();
  }

  onNewOrder() {
    this.router.navigate(['../', 'new-order'], {relativeTo: this.route});
  }

  setActiveTab() {
    const segs = this.router.url.split("/");
    const last: string = segs[segs.length-1];
    const current: number = this.tabLinks.findIndex((link: NavItem) => {
      return last.includes(link.url);
    });

    if (current > -1) {
      this.activeLink = this.tabLinks[current];
    } else {
      this.activeLink = null;
    }
  }
}
