import { Pipe, PipeTransform } from "@angular/core";

import { Column } from "../column/column";

@Pipe({
  name: "isFixed",
  pure: false
})
export class IsFixedPipe implements PipeTransform {
  transform(list: Array<Column>, fixed: boolean) {
    if (list === undefined) {
      return list;
    } else {
      return list.filter((o: Column) => o.isFixed === fixed);
    }
  }
}
