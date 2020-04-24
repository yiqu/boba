import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderFormService {

  orderFg: FormGroup;
  refreshComponent$: Subject<any> = new Subject<any>();

  constructor() {

  }
}

