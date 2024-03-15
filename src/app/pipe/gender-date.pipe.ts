import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderDate'
})
export class GenderDatePipe implements PipeTransform {

  transform(value: any, type: string): any {
    if (type === 'gender') {
      return value === '1' ? 'Nam' : 'Nữ';
    } else if (type === 'date') {
      return new Date(value).toLocaleDateString(); // Chuyển đổi ngày tháng thành dạng dd/MM/yyyy
    } else {
      return value;
    }
  }

}
