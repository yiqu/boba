import { FormControl } from '@angular/forms';

export function customRequiredValidator(control: FormControl): {[s: string]: boolean} {
  const val: string = control.value;
  // not checking if the value is falsey
  if (val && val['name'] && val['display']) {
    return null;
  } else if (val && val['id'] && val['display']) {
    return null;
  }
  return {"fieldRequired": true};
}


