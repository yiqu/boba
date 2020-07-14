import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges, ViewChild } from '@angular/core';
import { DrinkOrder, DrinkOrderDetail, DrinkTopping, DrinkIceLevel, DrinkType, DrinkSize, DrinkSugarLevel, DrinkFavoriteItem } from '../models/tea.models';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import * as fu from '../utils/form.utils';
import { DrinkSeries, BaseItem } from '../models/base.model';
import { STEPPER_GLOBAL_OPTIONS, CdkStep} from '@angular/cdk/stepper';
import { OrderFormService } from './order-form.service';
import { UserService } from '../services/user.service';
import { MatHorizontalStepper, MatStep } from '@angular/material/stepper';
import { takeUntil, switchMap, catchError } from 'rxjs/operators';
import { User, VerifiedUser } from '../models/user.model';
import { RestDataFireService } from '../services/fire-data.service';
import { SnackbarService } from '../services/snackbar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';
import { DialogSingleInputComponent, DialogSingleInputData } from '../dialogs/single-input/single-input-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '../services/dialog.service';
import { Subject, of, Observable, throwError } from 'rxjs';
import * as fv from '../validators/general-form.validator';

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

  labelPosition: "end" | "bottom" = "bottom";
  isStepperLinear: boolean = false;
  selectionFcNames: string[] = ["seriesName", "drinkName", "settings"];

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
      this.setFormValidStatus(this.ofs.orderFg.status);

      this.ofs.orderFg.valueChanges.pipe(
        takeUntil(this.ofs.refreshComponent$)
      ).subscribe(
        (val) => {
          this.setFormValidStatus(this.ofs.orderFg.status);
          this.ofs.fgErrorMsgs = this.examineFgErrors();
          console.log("changes", this.ofs.orderFg);
          this.currentDrinkSeries = this.drinkSeriesFc.value.name;
        }
      )
    }
  }

  setFormValidStatus(valid: string) {
    this.ofs.formValid = (valid==="VALID") ? true : false;
  }

  ngOnInit() {

  }

  createForm(dOrder: DrinkOrderDetail): FormGroup {
    const fg = new FormGroup({});

    const dSeries = {
      name: dOrder.drinkType.seriesName,
      display: dOrder.drinkType.seriesDisplay
    }
    fg.addControl("seriesName", fu.createFormControl(dSeries, false, [fv.customRequiredValidator]));

    const drink = {
      name: dOrder.drinkType.name,
      display: dOrder.drinkType.display
    }
    fg.addControl("drinkName", fu.createFormControl(drink, false, [fv.customRequiredValidator]));
    fg.addControl("settings", this.fb.group({
      size: fu.createFormControl(this.drinkOrder.size, false, [fv.customRequiredValidator]),
      ice: fu.createFormControl(this.drinkOrder.iceLevel, false, [fv.customRequiredValidator]),
      sugar: fu.createFormControl(this.drinkOrder.sugar, false, [fv.customRequiredValidator])
    }));

    let toppingFa: FormArray = new FormArray([]);
    dOrder.toppings.forEach((val) => {
      toppingFa.push(fu.createFormControl(val, false));
    });
    fg.addControl("toppings", toppingFa);

    const user: User = dOrder['user'] ? dOrder['user'] : null;
    fg.addControl("user", fu.createFormControl(user, false, [Validators.required, fv.customRequiredValidator]));
    fg.addControl("isFavorite", fu.createFormControl(null, false));
    return fg;
  }

  onOrderSubmit() {
    const formVal: any = this.ofs.orderFg.value;
    const reviewOrderDetail = this.createCurrentDrinkOrderDetail(formVal);
    const currentUser: User = this.getSelectedUser(formVal);
    let order = new DrinkOrder(null, new Date().getTime(), [], currentUser, null);
    order.orders = [reviewOrderDetail];

    // if fav. is being saved, then only add to cart after fav. is saved
    if (formVal.isFavorite) {
      this.getFavoriteAddObs(formVal).pipe(
        switchMap((r) => {
          return this.rdf.getCartOrders().push(order);
        }),
        catchError((err) => {
          return throwError(err['code']);
        })
      ).subscribe((res) => {
      },
      (err) => {
        console.error(err);
        this.sbs.openSnackBar("A favorite drink with that name already exists, try a different name.", 5000);
      },
      () => {
        this.sbs.openSnackBar("Fav drink saved and order added to cart.");
        this.router.navigate(['../', 'all'], {relativeTo: this.route});
      })
    } else {
      this.rdf.getCartOrders().push(order).then(
        (val) => {
          this.sbs.openSnackBar("Order added to cart.");
          this.router.navigate(['../', 'all'], {relativeTo: this.route});
        },
        (err) => {
          this.sbs.openSnackBar("There was an error adding this order to cart. " + err['code']);
        }
     );
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


  getFavoriteAddObs(formValue: any): Observable<any> {
    const data: DialogSingleInputData = new DialogSingleInputData("Add new favorite",
      "Name", null, "edit", "This will be the name of your favorite drink");
    const favoriteAddDialogRef = this.ds.getFavDrinkAddDialog(data);
    const user: VerifiedUser = formValue.user?.user;
    return favoriteAddDialogRef.afterClosed().pipe(
      takeUntil(this.compDes$),
      switchMap((name: string) => {
        if (user && name) {
          const timeStamp: number = new Date().getTime();
          let ref = this.cs.getFDB().ref("favorites/" + user.uid + "/" + name);
          const favItem: DrinkFavoriteItem = new DrinkFavoriteItem(ref.key,
            this.getSelectedUser(this.ofs.orderFg.value), timeStamp,
            this.createCurrentDrinkOrderDetail(this.ofs.orderFg.value));
          return (ref.set(favItem));
        }
      })
    );
  }

  getSelectedUser(fgVal: any): User {
    return new User(fgVal.user.id, fgVal.user.display, fgVal.user.user);
  }

  onFixGoBack(slideIndex: number) {
    if (slideIndex !== null) {
      this.orderStepper.selectedIndex = slideIndex;
    }
  }

  examineFgErrors(): any[] {
    let errs: any[] = [];
    this.orderStepper.steps.forEach((s: CdkStep) => {
      if (s && s.stepControl && s.stepControl.invalid) {
        errs.push(s.errorMessage);
      }
    });
    return errs;
  }

  ngOnDestroy() {
    this.compDes$.next();
  }
}
