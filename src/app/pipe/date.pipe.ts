import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: any, type: string): any {
    if (type === 'date') {
      return new Date(value).toLocaleDateString(); // Chuyển đổi ngày tháng thành dạng dd/MM/yyyy
    } else {
      return value;
    }
  }
}
