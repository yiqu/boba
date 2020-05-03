import { Component, OnInit, OnDestroy } from '@angular/core';
import { ManagementInventoryService } from '../../shared/services/management-inv.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavHeaderList, NavHeader, NavHeaderLink, DrinkInventoryList } from '../../shared/models/nav-item.model';
import { AllDrinkCatagoryMap } from '../../shared/models/tea.models';
import { RestDataFireService } from 'src/app/shared/services/fire-data.service';
import { DrinkItem } from 'src/app/shared/models/base.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-management-inventory',
  templateUrl: 'inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit, OnDestroy {

  compDest$: Subject<any> = new Subject<any>();
  allDrinksList: DrinkInventoryList[] = [];

  constructor(public mis: ManagementInventoryService, public fds: RestDataFireService,
    public router: Router, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.mis.allDrinksList$.pipe(
      takeUntil(this.compDest$)
    )
    .subscribe(([m, f, y]) => {
      const drinkMap: AllDrinkCatagoryMap = new AllDrinkCatagoryMap(m, f, y);
      this.createAllDrinksList(drinkMap);
    },
    (err) => {
    },
    () => {
    })
  }

  createAllDrinksList(dm: AllDrinkCatagoryMap) {
    for (const drinkType in dm) {
      this.allDrinksList.push(new DrinkInventoryList(new NavHeader(drinkType), dm[drinkType]));
    }
  }

  onDrinkItemClick(d: DrinkItem) {
    this.router.navigate([d.seriesName, d.fireKey], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.compDest$.next();
  }
}
