import { Component } from "@angular/core";

import { Column } from "hci-ng-grid/index";

@Component({
  selector: "edit-grid",
  template: `
    <div style="padding: 20px;">
      <h4>Edit Grid</h4>
    </div>
    <div style="padding: 20px;">
      <div>&lt;tab&gt; through cells</div>
      <div>click on cells</div>
      <div>up/down/left/right on selected cell</div>
      <div>modify input cell values and check bound data changes</div>
    </div>
    <div style="padding: 20px;">
      <hci-grid [title]="'Edit Grid'"
                [inputData]="editData"
                [columnDefinitions]="editColumns"
                [cellSelect]="true">
      </hci-grid>
    </div>
    
    <!-- Below code only to show bound data as it is updated -->
    <div style="padding: 20px;">
      <span style="font-weight: bold;">Bound Data</span>
      <div style="font-weight: bold;">
        <span style="width: 100px; display: inline-block;">idPatient</span>
        <span style="width: 100px; display: inline-block;">firstName</span>
        <span style="width: 100px; display: inline-block;">lastName</span>
        <span style="width: 150px; display: inline-block;">dob</span>
        <span style="width: 100px; display: inline-block;">pcg.nLabs</span>
        <span style="width: 150px; display: inline-block;">pcg.nested.nLabPath</span>
      </div>
      <div *ngFor="let row of editData">
        <span style="width: 100px; display: inline-block;">{{row.idPatient}}</span>
        <span style="width: 100px; display: inline-block;">{{row.firstName}}</span>
        <span style="width: 100px; display: inline-block;">{{row.lastName}}</span>
        <span style="width: 150px; display: inline-block;">{{row.dob}}</span>
        <span style="width: 100px; display: inline-block;">{{row.pcg.nLabs}}</span>
        <span style="width: 150px; display: inline-block;">{{row.pcg.nested.nLabPath}}</span>
      </div>
    </div>
    `
})
export class EditGridComponent {

  editData: Array<Object> = [
    { "idPatient": 1, "firstName": "Bob", "lastName": "Smith", "dob": "1970-11-21T00:00-07:00", "pcg": { "qmatm": "What?", "nLabs": 1, "nested": { "nLabPath": 12 } } },
    { "idPatient": 2, "firstName": "Jane", "lastName": "Doe", "dob": "1960-12-11T00:00-07:00", "pcg": { "qmatm": "What?", "nLabs": 2, "nested": { "nLabPath": 23 } } },
    { "idPatient": 3, "firstName": "Rick", "lastName": "James", "dob": "1940-01-03T00:00-07:00", "pcg": { "qmatm": "What?", "nLabs": 3, "nested": { "nLabPath": 34 } } },
    { "idPatient": 4, "firstName": "Rick", "lastName": "James", "dob": "1950-06-06T00:00-07:00", "pcg": { "qmatm": "What?", "nLabs": 99, "nested": { "nLabPath": 9 } } },
    { "idPatient": 5, "firstName": "Ragini", "lastName": "Kanth", "dob": "1980-02-08T00:00-07:00", "pcg": { "qmatm": "What?", "nLabs": 4, "nested": { "nLabPath": 45 } } },
    { "idPatient": 6, "firstName": "Sameer", "lastName": "Byrne", "dob": "1930-01-17T00:00-07:00", "pcg": { "qmatm": "Huh?", "nLabs": 5, "nested": { "nLabPath": 56 } } }
  ];

  editColumns: Column[] = [
    new Column({ field: "idPatient", name: "ID", template: "LabelCell", visible: false }),
    new Column({ field: "lastName", name: "Last Name", template: "InputCell" }),
    new Column({ field: "firstName", name: "First Name", template: "InputCell" }),
    new Column({ field: "dob", name: "Date of Birth", template: "DateCell" }),
    new Column({ field: "pcg.nLabs", name: "# Labs", template: "LabelCell" }),
    new Column({ field: "pcg.nested.nLabPath", name: "# Lab Path", template: "InputCell" })
  ];

}
