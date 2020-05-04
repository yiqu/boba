import { Component, OnInit, OnDestroy } from '@angular/core';
import { ManagementInventoryService } from '../../shared/services/management-inv.service';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavHeaderList, NavHeader, NavHeaderLink, DrinkInventoryList, NavItem } from '../../shared/models/nav-item.model';
import { InventoryCatagoryMap } from '../../shared/models/tea.models';
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
  inventorySubText: string = "This is a list of all the selections of our editable items on the menu. " +
    "Click on a item below to edit."


  constructor(public mis: ManagementInventoryService, public fds: RestDataFireService,
    public router: Router, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.mis.allDrinksList$.pipe(
      takeUntil(this.compDest$)
    )
    .subscribe(([m, f, y, t]) => {
      this.allDrinksList = [];
      const drinkMap: InventoryCatagoryMap = new InventoryCatagoryMap(m, f, y, t);
      this.createAllDrinksList(drinkMap);
    },
    (err) => {
    },
    () => {
    })
  }

  createAllDrinksList(dm: InventoryCatagoryMap) {
    for (const drinkType in dm) {
      this.allDrinksList.push(new DrinkInventoryList(new NavHeader(drinkType), dm[drinkType]));
    }
  }

  onDrinkItemClick(d: DrinkItem) {
    // if it is a drink item it has a series. Or it is a Topping
    const series = d.seriesName ? d.seriesName : 'toppings';

    this.router.navigate([series, d.fireKey], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.compDest$.next();
  }
}
