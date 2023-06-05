import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  transform(value: string): string {
    const digitStr = value.replace('TXN-', '');
    const finalstr = digitStr.substring(0, 17);
    const year = finalstr.substring(0, 4);
    const month = finalstr.substring(4, 6);
    const day = finalstr.substring(6, 8);
    const hours = finalstr.substring(8, 10);
    const minutes = finalstr.substring(10, 12);
    const seconds = finalstr.substring(12, 14);
    const ms = finalstr.substring(14, 17);
    const meridian = parseInt(hours) >= 12 ? 'PM' : 'AM';
    const hour = parseInt(hours) % 12 || 12;

    const formattedDatestr = `${day}-${month}-${year} ${hour}:${minutes}:${seconds}.${ms} ${meridian}`;
    // console.log(formattedDatestr);
    return formattedDatestr;
  }
}
