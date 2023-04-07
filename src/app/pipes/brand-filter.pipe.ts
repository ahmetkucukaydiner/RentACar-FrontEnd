import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../models/brandModel/brand';
import { filter } from 'rxjs';

@Pipe({
  name: 'brandFilter'
})
export class BrandFilterPipe implements PipeTransform {

  transform(value:Brand[], filterText: string ) : Brand[] {
    filterText = filterText?filterText.toLocaleLowerCase():""

    return filterText?value.filter(b=>b.name.toLocaleLowerCase().indexOf(filterText)!==-1):value
  }

}
