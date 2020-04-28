import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderFormService {

  orderFg: FormGroup;
  refreshComponent$: Subject<any> = new Subject<any>();
  formValid: boolean = false;
  selectionsInvalid: boolean = true;
  userNameInvalid: boolean = true;
  fgErrorMsgs: string[] = [];

  constructor() {

  }
}

