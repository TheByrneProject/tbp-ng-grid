import {ElementRef, EventEmitter, Output} from "@angular/core";

import {Column} from "../../column/column";
import {GridService} from "../../services/grid.service";

export class FilterRenderer {

  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  config: any = {};
  column: Column;
  width: number = 250;
  gridService: GridService;
  elementRef: ElementRef;

  constructor(gridService: GridService, elementRef: ElementRef) {
    this.gridService = gridService;
    this.elementRef = elementRef;
  }

  getConfig(): any {
    return this.config;
  }

  setConfig(config: any) {
    if (config) {
      this.config = config;
    }
  }

  stop(event: MouseEvent) {
    event.stopPropagation();
  }

  valueClear() {
    this.close.emit(true);
  }
}
