import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges, ViewChild } from '@angular/core';
import { DrinkOrder, DrinkOrderDetail, DrinkTopping, DrinkIceLevel, DrinkType, DrinkSize, DrinkSugarLevel, DrinkFavoriteItem } from '../models/tea.models';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import * as fu from '../utils/form.utils';
import { DrinkSeries, BaseItem } from '../models/base.model';
import { STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { OrderFormService } from './order-form.service';
import { UserService } from '../services/user.service';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { takeUntil, switchMap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { RestDataFireService } from '../services/fire-data.service';
import { SnackbarService } from '../services/snackbar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';
import { DialogSingleInputComponent, DialogSingleInputData } from '../dialogs/single-input/single-input-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '../services/dialog.service';
import { Subject, of } from 'rxjs';

@Component({
  selector: 'app-shared-order-form',
  templateUrl: 'order-form.component.html',
  styleUrls: ['./order-form.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class OrderFormComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  drinkOrder: DrinkOrderDetail;

  @Output()
  onDrinkSubmit: EventEmitter<DrinkOrder> = new EventEmitter<DrinkOrder>();

  @ViewChild(MatHorizontalStepper)
  orderStepper: MatHorizontalStepper;

  currentDrinkSeries: DrinkSeries;
  isFavorite: boolean = false;
  favoriteAddDialogRef: MatDialogRef<DialogSingleInputComponent>;
  compDes$: Subject<any> = new Subject<any>();

  get drinkSeriesFc(): FormControl {
    return <FormControl>this.ofs.orderFg.get("seriesName");
  }

  get drinkNameFc(): FormControl {
    return <FormControl>this.ofs.orderFg.get("drinkName");
  }

  get drinkSettingsFg(): FormGroup {
    return <FormGroup>this.ofs.orderFg.get("settings");
  }

  get drinkToppingsFa(): FormArray {
    return <FormArray>this.ofs.orderFg.get("toppings");
  }

  get userFc(): FormControl {
    return <FormControl>this.ofs.orderFg.get("user");
  }

  get isFavoriteFc(): FormControl {
    return <FormControl>this.ofs.orderFg.get("isFavorite");
  }

  constructor(public fb: FormBuilder, public ofs: OrderFormService,
    public us: UserService, public rdf: RestDataFireService, public sbs: SnackbarService,
    public router: Router, public route: ActivatedRoute, public cs: CartService,
    public ds: DialogService) {
  }

  ngOnChanges(changes) {
    if (this.drinkOrder) {
      this.ofs.refreshComponent$.next();

      if (this.orderStepper) {
        this.orderStepper.reset();
      }

      this.ofs.orderFg = null;
      this.ofs.orderFg = this.createForm(this.drinkOrder);
      console.log("FG created: ",this.drinkOrder, this.ofs.orderFg)

      this.ofs.orderFg.valueChanges.pipe(
        takeUntil(this.ofs.refreshComponent$)
      ).subscribe(
        (val) => {
          console.log("changes", this.ofs.orderFg.controls);
          this.currentDrinkSeries = this.drinkSeriesFc.value.name;
        }
      )
    }
  }

  ngOnInit() {

  }

  createForm(dOrder: DrinkOrderDetail): FormGroup {
    const fg = new FormGroup({});

    const dSeries = {
      name: dOrder.drinkType.seriesName,
      display: dOrder.drinkType.seriesDisplay
    }
    fg.addControl("seriesName", fu.createFormControl(dSeries, false, [Validators.required]));

    const drink = {
      name: dOrder.drinkType.name,
      display: dOrder.drinkType.display
    }
    fg.addControl("drinkName", fu.createFormControl(drink, false, [Validators.required]));
    fg.addControl("settings", this.fb.group({
      size: fu.createFormControl(this.drinkOrder.size, false, [Validators.required]),
      ice: fu.createFormControl(this.drinkOrder.iceLevel, false, [Validators.required]),
      sugar: fu.createFormControl(this.drinkOrder.sugar, false, [Validators.required])
    }));

    let toppingFa: FormArray = new FormArray([]);
    dOrder.toppings.forEach((val) => {
      toppingFa.push(fu.createFormControl(val, false));
    });
    fg.addControl("toppings", toppingFa);

    const user: User = dOrder['user'] ? dOrder['user'] : null;
    fg.addControl("user", fu.createFormControl(user, false, [Validators.required]));
    fg.addControl("isFavorite", fu.createFormControl(null, false));
    return fg;
  }

  onOrderSubmit() {
    console.log("order status:",this.ofs.orderFg.status)
    console.log("order value:",this.ofs.orderFg.value)
    console.log("order fg", this.ofs.orderFg)

    const formVal: any = this.ofs.orderFg.value;
    const reviewOrderDetail = this.createCurrentDrinkOrderDetail(formVal);
    const currentUser: User = this.getSelectedUser(formVal);

    let order = new DrinkOrder(null, new Date().getTime(), [], currentUser);
    order.orders = [reviewOrderDetail];
    this.rdf.getCartOrders().push(order).then(
      (val) => {
        this.sbs.openSnackBar("Added order to cart.");
        this.proceedToCart(formVal.isFavorite);
      },
      (err) => {
        this.sbs.openSnackBar("There was an error adding this order to cart. Try again.")
      }
    );
  }

  proceedToCart(addingToFavorite: boolean) {
    if (addingToFavorite) {
      this.onFavoriteAdd();
    } else {
      this.router.navigate(['../', 'all'], {relativeTo: this.route});
    }
  }

  createCurrentDrinkOrderDetail(formVal: any): DrinkOrderDetail {
    const ice = new DrinkIceLevel(formVal.settings.ice.name, formVal.settings.ice.display);
    const type = new DrinkType(formVal.drinkName.name, formVal.drinkName.display,
      formVal.seriesName.name, formVal.seriesName.display);
    const size = new DrinkSize(formVal.settings.size.name, formVal.settings.size.display);
    const sugar = new DrinkSugarLevel(formVal.settings.sugar.name, formVal.settings.sugar.display);
    let toppings: DrinkTopping[] = [];
    formVal.toppings.forEach((val: BaseItem) => {
      toppings.push(new DrinkTopping(val.name, val.display));
    });
    return new DrinkOrderDetail(ice, type, size, sugar, toppings);
  }

  onFavoriteAdd() {
    const data: DialogSingleInputData = new DialogSingleInputData("Add new favorite",
      "Name", null, "edit", "This will be the name of your favorite drink");
    const favoriteAddDialogRef = this.ds.getFavDrinkAddDialog(data);

    favoriteAddDialogRef.afterClosed().pipe(
      takeUntil(this.compDes$),
      switchMap((name: string) => {
        if (name) {
          const timeStamp: number = new Date().getTime();
          let ref = this.cs.getFDB().ref("favorites/" + name);
          const favItem: DrinkFavoriteItem = new DrinkFavoriteItem(ref.key,
            this.getSelectedUser(this.ofs.orderFg.value), timeStamp,
            this.createCurrentDrinkOrderDetail(this.ofs.orderFg.value));
          return (ref.set(favItem));
        }
      })
    ).subscribe((val) => {
    },
    (err) => {
      this.sbs.openSnackBar("A favorite drink with that name already exists, try a different name.");
    },
    () => {
      this.sbs.openSnackBar("Favorite drink saved!");
      this.router.navigate(['../', 'all'], {relativeTo: this.route});
    });
  }

  getSelectedUser(fgVal: any): User {
    return new User(fgVal.user.id, fgVal.user.display);
  }

  ngOnDestroy() {
    this.compDes$.next();
  }
}
