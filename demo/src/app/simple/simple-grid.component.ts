import { Component, OnInit } from "@angular/core";
import { Column } from "hci-ng-grid/index";

import { DataGeneratorService } from "../services/data-generator.service";

@Component({
  selector: "simple-grid",
  template: `
    <div class="card">
      <div class="card-header">
        <h4>Simple Grid</h4>
      </div>
      <div class="card-body">
        <div class="card-text">
          A grid uses the default configuration.  Only inputs are title, data and columns.
        </div>
        <div class="card-text">
          <button type="button" class="btn btn-outline-primary" [ngbPopover]="config1" popoverTitle="Config" placement="right">Show Config</button>
          <ng-template #config1>
            <pre>
              &lt;hci-grid
                [title]="'Simple Grid'"
                [data]="simpleData1"
                [columnDefinitions]="[
                  {{"{"}} field: 'lastName' {{"}"}},
                  {{"{"}} field: 'firstName' {{"}"}},
                  {{"{"}} field: 'dob', dataType: 'date', format: 'MM/DD/YYYY' {{"}"}},
                  {{"{"}} field: 'pcg.nLabs' {{"}"}},
                  {{"{"}} field: 'pcg.nested.nLabPath' {{"}"}},
                ]&gt;
              &lt;/hci-grid&gt;
            </pre>
          </ng-template>
        </div>
        <p>
          <hci-grid [title]="'Simple Grid'"
                    [data]="simpleData1"
                    [columnDefinitions]="[
                      { field: 'lastName' },
                      { field: 'firstName' },
                      { field: 'dob', dataType: 'date', format: 'MM/DD/YYYY' },
                      { field: 'pcg.nLabs' },
                      { field: 'pcg.nested.nLabPath' }
                    ]">
          </hci-grid>
        </p>
      </div>
    </div>
    
    <div class="card">
      <div class="card-header">
        <h4>More Simple Grid</h4>
      </div>
      <div class="card-body">
        <div class="card-text">
          Here we pass the data array and column definitions.  The column definitions specify the complex data path and the
          template type and that is all.  There is no filtering, header, sorting or paging.
        </div>
        <div class="card-text">
          <button type="button" class="btn btn-outline-primary" [ngbPopover]="config2" popoverTitle="Config" placement="right">Show Config</button>
          <ng-template #config2>
            <pre>
              &lt;hci-grid
                [data]="simpleData2"
                [columnDefinitions]="[
                  {{"{"}} field: 'lastName' {{"}"}},
                  {{"{"}} field: 'firstName' {{"}"}},
                  {{"{"}} field: 'dob', dataType: 'date', format: 'MM/DD/YYYY' {{"}"}},
                  {{"{"}} field: 'pcg.nLabs' {{"}"}},
                  {{"{"}} field: 'pcg.nested.nLabPath' {{"}"}}
                ]&gt;
              &lt;/hci-grid&gt;
            </pre>
          </ng-template>
        </div>
        <p>
          <hci-grid [data]="simpleData2"
                    [columnDefinitions]="[
                      { field: 'lastName' },
                      { field: 'firstName' },
                      { field: 'dob', dataType: 'date', format: 'MM/DD/YYYY' },
                      { field: 'pcg.nLabs' },
                      { field: 'pcg.nested.nLabPath' }
                    ]">
          </hci-grid>
        </p>
      </div>
    </div>
    
    <div class="card">
      <div class="card-header">
        <h4>Even More Simple Grid</h4>
      </div>
      <div class="card-body">
        <div class="card-text">
          Here the only thing passed in is the data.  Visible label columns are created automatically based on every key
          in the object.
        </div>
        <div class="card-text">
          <button type="button" class="btn btn-outline-primary" [ngbPopover]="config3" popoverTitle="Config" placement="right">Show Config</button>
          <ng-template #config3>
            <pre>
              &lt;hci-grid
                [data]="simpleData3"
                [columnDefinitions]="[
                  {{"{"}} field: 'lastName', name: 'Last Name' {{"}"}},
                  {{"{"}} field: 'firstName', name: 'First Name' {{"}"}}
                ]&gt;
              &lt;/hci-grid&gt;
            </pre>
          </ng-template>
        </div>
        <p>
          <hci-grid [data]="simpleData3"
                    [columnDefinitions]="[
                      { field: 'lastName', name: 'Last Name' },
                      { field: 'firstName', name: 'First Name' }
                    ]">
          </hci-grid>
        </p>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h4>Simple Grid - 5s Delayed Input</h4>
      </div>
      <div class="card-body">
        <div class="card-text">
          Typical data input passed in bulk, but with a 5s delay in receiving the data.
        </div>
        <div class="card-text">
          <button type="button" class="btn btn-outline-primary" [ngbPopover]="config4" popoverTitle="Config" placement="right">Show Config</button>
          <ng-template #config4>
            <pre>
              &lt;hci-grid
                [title]="'Simple Grid Delayed'"
                [data]="simpleData4"
                [columnDefinitions]="columns4"&gt;
              &lt;/hci-grid&gt;
            </pre>
          </ng-template>
        </div>
        <p>
          <hci-grid [title]="'Simple Grid Delayed'"
                    [data]="simpleData4"
                    [columnDefinitions]="columns4">
          </hci-grid>
        </p>
      </div>
    </div>
  `
})
export class SimpleGridComponent implements OnInit {

  columns4: Column[] = [
    new Column({ field: "idPatient", name: "ID", visible: true }),
    new Column({ field: "lastName", name: "Last Name" }),
    new Column({ field: "firstName", name: "First Name" }),
    new Column({ field: "dob", name: "Date of Birth", dataType: "date", format: "MM/DD/YYYY" }),
    new Column({ field: "address", name: "Address 1" }),
    new Column({ field: "citystatezip", name: "Address 2" })
  ];

  simpleData1: Array<Object> = [
    { "idPatient": 1, "firstName": "Bob", "lastName": "Smith", "dob": "1968-11-27T00:00-07:00", "pcg": { "qmatm": "What?", "nLabs": 1, "nested": { "nLabPath": 12 } } },
    { "idPatient": 2, "firstName": "Jane", "lastName": "Doe", "dob": "1966-09-25T00:00-07:00", "pcg": { "qmatm": "What?", "nLabs": 2, "nested": { "nLabPath": 23 } } },
    { "idPatient": 3, "firstName": "Rick", "lastName": "James", "dob": "1965-11-21T00:00-07:00", "pcg": { "qmatm": "What?", "nLabs": 3, "nested": { "nLabPath": 34 } } },
    { "idPatient": 4, "firstName": "Rick", "lastName": "James", "dob": "1963-06-11T00:00-07:00", "pcg": { "qmatm": "What?", "nLabs": 99, "nested": { "nLabPath": 9 } } },
    { "idPatient": 5, "firstName": "Ragini", "lastName": "Kanth", "dob": "1962-04-16T00:00-07:00", "pcg": { "qmatm": "What?", "nLabs": 4, "nested": { "nLabPath": 45 } } },
    { "idPatient": 6, "firstName": "Sameer", "lastName": "Byrne", "dob": "1961-03-11T00:00-07:00", "pcg": { "qmatm": "Huh?", "nLabs": 5, "nested": { "nLabPath": 56 } } }
  ];

  simpleData2: Array<Object> = [
    { "idPatient": 1, "firstName": "Bob", "lastName": "Smith", "dob": "1974-11-13T00:00-07:00", "pcg": { "qmatm": "What?", "nLabs": 1, "nested": { "nLabPath": 12 } } },
    { "idPatient": 2, "firstName": "Jane", "lastName": "Doe", "dob": "1975-11-11T00:00-07:00", "pcg": { "qmatm": "What?", "nLabs": 2, "nested": { "nLabPath": 23 } } },
    { "idPatient": 3, "firstName": "Rick", "lastName": "James", "dob": "1976-07-17T00:00-07:00", "pcg": { "qmatm": "What?", "nLabs": 3, "nested": { "nLabPath": 34 } } },
    { "idPatient": 4, "firstName": "Rick", "lastName": "James", "dob": "1977-04-16T00:00-07:00", "pcg": { "qmatm": "What?", "nLabs": 99, "nested": { "nLabPath": 9 } } },
    { "idPatient": 5, "firstName": "Ragini", "lastName": "Kanth", "dob": "1978-03-21T00:00-07:00", "pcg": { "qmatm": "What?", "nLabs": 4, "nested": { "nLabPath": 45 } } },
    { "idPatient": 6, "firstName": "Sameer", "lastName": "Byrne", "dob": "1979-02-11T00:00-07:00", "pcg": { "qmatm": "Huh?", "nLabs": 5, "nested": { "nLabPath": 56 } } }
  ];

  simpleData3: Array<Object> = [
    { "idPatient": 1, "firstName": "Bob", "lastName": "Smith" },
    { "idPatient": 2, "firstName": "Jane", "lastName": "Doe" },
    { "idPatient": 3, "firstName": "Rick", "lastName": "James" },
    { "idPatient": 4, "firstName": "Rick", "lastName": "James"},
    { "idPatient": 5, "firstName": "Ragini", "lastName": "Kanth" },
    { "idPatient": 6, "firstName": "Sameer", "lastName": "Byrne" }
  ];

  simpleData4: Array<Object> = null;

  constructor(private dataGeneratorService: DataGeneratorService) {}

  ngOnInit() {
    this.dataGeneratorService.generateSimpleData4(55);
    this.dataGeneratorService.getSimpleData4(5000).subscribe((simpleData4: Array<Object>) => {
      this.simpleData4 = simpleData4;
    });
  }

}
