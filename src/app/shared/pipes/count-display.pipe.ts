import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';

@Pipe({
  name: 'countNumberDisplay',
  pure: true
})

export class CountNumberDisplayPipe implements PipeTransform {

  @memo()
  transform(value: number): any {
    if (value == null) {
      return "";
    } else {
      return "(" + value + ")";
    }

  }
}
