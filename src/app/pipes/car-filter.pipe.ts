import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/carModel/car';

@Pipe({
  name: 'carFilter'
})
export class CarFilterPipe implements PipeTransform {

  transform(value: Car[], filterText: string): Car[] {
    filterText=filterText?filterText.toLocaleLowerCase(): "";

    return filterText?value.filter(c=>c.carName.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
