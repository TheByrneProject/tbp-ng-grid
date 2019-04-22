import {Component} from "@angular/core";

import {DataGeneratorService} from "../services/data-generator.service";

@Component({
  selector: "saving-demo",
  template: `
    <div class="card">
      <div class="card-header">
        <h4>Cell Saving</h4>
      </div>
      <div class="card-body">
        <div class="card-text">
          Edit a cell's value and hit enter.  The returned json will appear below.  The value must be different to register as a save.
        </div>
        <div class="card-text">
          {{cellSaveOutput}}
        </div>
        <div class="card-text">
          <button type="button" class="btn btn-outline-primary" [ngbPopover]="config1" popoverTitle="Config" placement="right">Show Config</button>
          <ng-template #config1>
            <pre>
              &lt;hci-grid
                [data]="data1"
                [columns]="columns1"
                [mode]="'spreadsheet'"
                (onCellSave)="onCellSave($event)"&gt;
              &lt;/hci-grid&gt;
              
              Columns:
              isKey: true, field: "idPatient", name: "ID", visible: false
              field: "lastName", name: "Last Name"
              field: "firstName", name: "First Name"
              field: "dob", name: "Date of Birth", dataType: "date"
              field: "pcg.nLabs", name: "# Labs"
              field: "pcg.nested.nLabPath", name: "# Lab Path"
              
              Listeners:
              listeners1: Array&lt;any&gt; = [
                {{"{"}} type: RowDblClickListener {{"}"}}
              ];
            </pre>
          </ng-template>
        </div>
        <p>
          <hci-grid [data]="data1"
                    [columns]="columns1"
                    [mode]="'spreadsheet'"
                    (onCellSave)="onCellSave($event)">
          </hci-grid>
        </p>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h4>Auto Row Saving</h4>
      </div>
      <div class="card-body">
        <div class="card-text">
          Edit a cell's value then tab until you hit the next row.  Information and the dirty row as original format will be broadcast.
          Next, tab through the entire next row and you won't see any emit because there were no changes.
        </div>
        <div class="card-text">
          {{rowSaveOutput}}
        </div>
        <div class="card-text">
          <button type="button" class="btn btn-outline-primary" [ngbPopover]="config2" popoverTitle="Config" placement="right">Show Config</button>
          <ng-template #config2>
            <pre>
              &lt;hci-grid
                [data]="data1"
                [columns]="columns1"
                [mode]="'spreadsheet'"
                [saveOnDirtyRowChange]="true"
                (onRowSave)="onRowSave($event)"&gt;
              &lt;/hci-grid&gt;
              
              Columns:
              isKey: true, field: "idPatient", name: "ID", visible: false
              field: "lastName", name: "Last Name"
              field: "firstName", name: "First Name"
              field: "dob", name: "Date of Birth", dataType: "date"
              field: "nLabs", name: "# Labs"
              field: "path.nPath", name: "# Lab Path"
              ];
            </pre>
          </ng-template>
        </div>
        <p>
          <hci-grid [data]="data1"
                    [columns]="columns1"
                    [mode]="'spreadsheet'"
                    [saveOnDirtyRowChange]="true"
                    (onRowSave)="onRowSave($event)">
          </hci-grid>
        </p>
      </div>
    </div>
  `,
  host: {class: "outlet-column"}
})
export class SavingDemoComponent {

  cellSaveOutput: string;
  rowSaveOutput: string;

  data1: Object[];

  columns1: any[] = [
    { isKey: true, field: "idPatient", name: "ID", visible: false },
    { field: "lastName", name: "Last Name" },
    { field: "firstName", name: "First Name" },
    { field: "dob", name: "Date of Birth", dataType: "date" },
    { field: "nLabs", name: "# Labs" },
    { field: "path.nPath", name: "# Path" }
  ];

  constructor(private dataGeneratorService: DataGeneratorService) {
    this.data1 = this.dataGeneratorService.getData(6);
  }

  onCellSave(dataChange: any) {
    this.cellSaveOutput = JSON.stringify(dataChange);
  }

  onRowSave(dataChange: any) {
    this.rowSaveOutput = JSON.stringify(dataChange);
  }
}
