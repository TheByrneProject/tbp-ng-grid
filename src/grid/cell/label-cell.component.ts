import { Component } from "@angular/core";

import { CELL_CSS } from "./cell-template.component";
import { CellTemplate } from "./cell-template.component";

@Component({
  selector: "label-cell",
  styles: [ CELL_CSS, `
    .label-cell {
      height: 100%;
      padding-top: 3px;
    }
  `],
  template: `
    <span (keydown)="onKeyDown($event);" class="grid-cell-template label-cell" [ngClass]="{ 'focused': focused }">
      {{ value }}
    </span>
  `
})
export class LabelCell extends CellTemplate {

  onKeyDown(event: KeyboardEvent) {
    console.log("LabelCell.onKeyDown");
    if (event.keyCode === 9) {
      event.preventDefault();
      this.tabEvent.emit(true);
    }
  }

}