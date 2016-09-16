import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Rx";

import { GridConfigService } from "./grid-config.service";
import { Cell } from "../cell/cell";
import { Row } from "../row/row";
import { RowGroup } from "../row/row-group";
import { Column } from "../column/column";
import { SortInfo } from "../utils/sort-info";
import { PageInfo } from "../utils/page-info";

@Injectable()
export class GridDataService {

  inputData: Object[];
  preparedData: Array<Row>;

  gridData: Array<RowGroup>;
  data = new Subject<Array<RowGroup>>();

  columnDefinitions: Column[];

  sortInfo: SortInfo = new SortInfo();
  sortInfoObserved = new Subject<SortInfo>();

  pageInfo: PageInfo = new PageInfo();
  pageInfoObserved = new Subject<PageInfo>();

  constructor(private gridConfigService: GridConfigService) {}

  filterPreparedData() {
    console.log("filterPreparedData");
  }

  getCell(i: number, j: number, k: number): Cell {
    //console.log("getCell " + i + " " + j + " " + k);
    //let dataColumnOffset: number = this.gridConfigService.gridConfiguration.nUtilityColumns;
    if (j === -1) {
      return this.gridData[i].getHeader().get(k);
    } else {
      return this.gridData[i].get(j).get(k);
    }
  }

  getField(row: Object, field: String): Object {
    var fields = field.split(".");

    var obj = row[fields[0]];
    for (var i = 1; i < fields.length; i++) {
      obj = obj[fields[i]];
    }
    return obj;
  }

  getRowGroup(i: number): RowGroup {
    return this.gridData[i];
  }

  handleValueChange(i: number, j: number, key: number, k: number, value: any) {
    console.log("GridDataService.handleValueChange: " + key + ":" + k + ":" + value);
    if (j === -1) {
      for (var n = 0; n < this.gridData[i].length(); n++) {
        this.setInputDataValue(this.gridData[i].get(n).key, this.gridConfigService.gridConfiguration.columnDefinitions[k].field, value);
      }
    } else {
      this.setInputDataValue(key, this.gridConfigService.gridConfiguration.columnDefinitions[k].field, value);
    }
  }

  /**
   * TODO: If groupBy, don't just push rows, but check for pre-existing keys and add those rows to existing rowData.
   *
   * @param inputData
   */
  initData(prep: boolean, filter: boolean, sort: boolean, paginate: boolean) {
    console.log("initData");
    this.columnDefinitions = this.gridConfigService.gridConfiguration.columnDefinitions;

    if (prep) {
      this.prepareData();
    }
    if (filter) {
      this.filterPreparedData();
    }
    if (sort) {
      this.sortPreparedData();
    }

    let START: number = 0;
    let END: number = this.preparedData.length;
    this.pageInfo.nDataSize = this.preparedData.length;

    if (paginate) {
      START = this.pageInfo.page * this.pageInfo.pageSize;
      END = Math.min(START + this.pageInfo.pageSize, this.pageInfo.nDataSize);
      this.pageInfo.nPages = Math.ceil(this.pageInfo.nDataSize / this.pageInfo.pageSize);
    } else {
      this.pageInfo.nPages = 1;
    }
    this.pageInfoObserved.next(this.pageInfo);

    this.gridData = new Array<RowGroup>();
    if (this.gridConfigService.gridConfiguration.groupBy !== null) {
      // This is all wrong for sorting... if group by, only search for next common row.
      // If sorting on non group-by fields, then grouping sort of breaks unless those sorted rows still happen to
      // lay next to each other
      let sortColumns: Array<number> = new Array<number>();
      for (var i = 0; i < this.gridConfigService.gridConfiguration.columnDefinitions.length; i++) {
        if (this.gridConfigService.gridConfiguration.columnDefinitions[i].isGroup) {
          sortColumns.push(i);
        }
      }

      for (var i = START; i < END; i++) {
        let exists: boolean = false;
        for (var j = 0; j < this.gridData.length; j++) {
          if (this.gridData[j].header.equals(this.preparedData[i], sortColumns)) {
            this.gridData[j].add(this.preparedData[i]);
            exists = true;
            break;
          }
        }
        if (!exists) {
          let rowGroup: RowGroup = new RowGroup();
          rowGroup.add(this.preparedData[i]);
          rowGroup.createHeader(sortColumns);
          this.gridData.push(rowGroup);
        }
      }
    } else {
      for (var i = START; i < END; i++) {
        let rowGroup: RowGroup = new RowGroup();
        rowGroup.add(this.preparedData[i]);
        this.gridData.push(rowGroup);
      }
    }

    this.data.next(this.gridData);
  }

  prepareData() {
    console.log("prepareData");
    this.preparedData = new Array<any>();
    let columnDefinitions: Column[] = this.gridConfigService.gridConfiguration.columnDefinitions;

    for (var i = 0; i < this.inputData.length; i++) {
      let row: Row = new Row();
      row.key = i;
      let header: Row = null;
      for (var j = 0; j < columnDefinitions.length; j++) {
        if (columnDefinitions[j].isUtility) {
          row.add(new Cell({value: columnDefinitions[j].defaultValue}));
        } else {
          row.add(new Cell({value: this.getField(this.inputData[i], columnDefinitions[j].field), key: i}));
        }
      }
      this.preparedData.push(row);
    }
  }

  setInputData(inputData: Array<Object>) {
    console.log("setInputData");
    this.inputData = inputData;
    this.initData(true, true, true, true);
  }

  /**
   * When a cell value updates, we have a i,j,k position and value.  Now this works for updating our internal
   * grid data which is flattened, but our input data could have a complex data structure.  An list of Person
   * may have a field like demographics.firstName which is in its own demographic object within person.
   *
   * @param rowIndex
   * @param field
   * @param value
   */
  setInputDataValue(key: number, field: string, value: any) {
    var fields = field.split(".");

    var obj = this.inputData[key];
    for (var i = 0; i < fields.length - 1; i++) {
      obj = obj[fields[i]];
    }
    obj[fields[fields.length - 1]] = value;
  }

  sort(column: string) {
    console.log("sort start " + this.sortInfo.column + " " + column + " " + this.sortInfo.asc);

    if (this.sortInfo.column === null || this.sortInfo.column !== column) {
      this.sortInfo.column = column;
      this.sortInfo.asc = true;
    } else {
      this.sortInfo.asc = !this.sortInfo.asc;
    }

    this.sortInfoObserved.next(this.sortInfo);

    console.log("sort end " + this.sortInfo.column + " " + this.sortInfo.asc);

    this.initData(false, false, true, true);
  }

  sortPreparedData() {
    console.log("sortPreparedData");
    let sortColumns: Array<number> = new Array<number>();

    if (this.sortInfo.column === null && this.gridConfigService.gridConfiguration.groupBy !== null) {
      this.sortInfo.column = "GROUP_BY";
    }

    if (this.sortInfo.column === "GROUP_BY") {
      for (var i = 0; i < this.columnDefinitions.length; i++) {
        if (this.columnDefinitions[i].isGroup) {
          sortColumns.push(i);
        }
      }
    } else {
      for (var i = 0; i < this.columnDefinitions.length; i++) {
        if (this.columnDefinitions[i].field === this.sortInfo.column) {
          sortColumns.push(i);
          break;
        }
      }
    }

    this.preparedData = this.preparedData.sort((o1: Row, o2: Row) => {
      let v: number = 0;
      for (var i = 0; i < sortColumns.length; i++) {
        if (typeof o1.get(sortColumns[i]).value === "number") {
          if (this.sortInfo.asc) {
            v = o1.get(sortColumns[i]).value - o2.get(sortColumns[i]).value;
          } else {
            v = o2.get(sortColumns[i]).value - o1.get(sortColumns[i]).value;
          }
        } else if (typeof o1.get(sortColumns[i]).value === "string") {
          if (this.sortInfo.asc) {
            if (o1.get(sortColumns[i]).value < o2.get(sortColumns[i]).value) {
              v = -1;
            } else if (o1.get(sortColumns[i]).value > o2.get(sortColumns[i]).value) {
              v = 1;
            }
          } else {
            if (o1.get(sortColumns[i]).value > o2.get(sortColumns[i]).value) {
              v = -1;
            } else if (o1.get(sortColumns[i]).value < o2.get(sortColumns[i]).value) {
              v = 1;
            }
          }
        }
        if (v !== 0) {
          return v;
        }
      }
      return v;
    });
  }

}
