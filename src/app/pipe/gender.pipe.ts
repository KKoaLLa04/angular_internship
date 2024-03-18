import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: any, type: string): any {
    if (type === 'gender') {
      return value === '1' ? 'Nam' : 'Nữ';
    } else {
      return value;
    }
  }

}
