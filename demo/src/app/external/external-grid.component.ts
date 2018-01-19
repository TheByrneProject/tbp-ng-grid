import { Component, OnInit } from "@angular/core";

import { DataGeneratorService } from "../services/data-generator.service";
import { Column, ExternalData, ExternalInfo } from "hci-ng-grid/index";

@Component({
  selector: "external-grid",
  template: `
    <div style="padding: 20px;">
      <h2>External Grid</h2>
    </div>
    <div style="padding: 20px;">
        250 rows of data is generated in our service and stored.  We bind the onExternalDataCall which takes an object
        containing filtering/sorting/paging info.  Our data service applies the sorts/filters/pages to return a subset
        of data back to the grid.  This service mimics what a backend query would do with the same information.<br />
        In this demo we specify external call for all filter/sort/paging.  So any time a filter is changed, the page
        size is updated, or the next page is selected, this external function is called to retrieve the data.<br />
        To simulate an api call, a delay of 1 s has been added.
    </div>
    <div style="padding: 20px;">
      <hci-grid [hci-grid-config]
                [onExternalDataCall]="onExternalDataCall1"
                [externalFiltering]="true"
                [externalSorting]="true"
                [externalPaging]="true"
                [pageSize]="10">
        <column-def [field]="'idPatient'" [name]="'ID'"></column-def>
        <column-def [field]="'lastName'" [name]="'Last Name'" filterType="'input'">
            <hci-grid-cell-input #template></hci-grid-cell-input>
        </column-def>
        <column-def [field]="'middleName'" [name]="'Middle Name'" filterType="'input'">
            <hci-grid-cell-input #template></hci-grid-cell-input>
        </column-def>
        <column-def [field]="'firstName'" [name]="'First Name'" filterType="'input'">
            <hci-grid-cell-input #template></hci-grid-cell-input>
        </column-def>
        <column-def [field]="'dob'" [name]="'Date of Birth'">
            <hci-grid-cell-date #template [dateFormat]="'longDate'"></hci-grid-cell-date>
        </column-def>
        <column-def [field]="'gender'" [name]="'Gender'" filterType="'select'" filterOptions="[ '', 'Female', 'Male' ]">
            <hci-grid-cell-input #template></hci-grid-cell-input>
        </column-def>
        <column-def [field]="'address'" [name]="'Address'">
            <hci-grid-cell-input #template></hci-grid-cell-input>
        </column-def>
      </hci-grid>
    </div>
    <div style="min-height: 10px; background-color: red; border: black 1px solid; border-radius: 5px; margin: 20px;"></div>
    <div style="padding: 20px;">
      <span style="font-size: 28px; font-weight: bold;">Partially External Grid</span>
    </div>
    <div style="padding: 20px;">
        The previous example had external filter/sort/page.  Here we have external filter and sort, but paging is left
        to the grid.  So our service applies filters and sorts to the data and always returns the full remaining dataset
        which leaves the paging to the grid.
    </div>
    <div style="padding: 20px; margin-bottom: 100px;">
      <hci-grid [hci-grid-config]
                [columnDefinitions]="columns2"
                [onExternalDataCall]="onExternalDataCall2"
                [externalFiltering]="true"
                [externalSorting]="true"
                [externalPaging]="false"
                [pageSize]="10">
      </hci-grid>
    </div>
    `
})
export class ExternalGridComponent implements OnInit {

  dataSize: number = 250;

  public onExternalDataCall1: Function;
  public onExternalDataCall2: Function;

  columns2: Column[] = [
    new Column({ field: "idPatient", name: "ID", template: "LabelCell" }),
    new Column({ field: "lastName", name: "Last Name", template: "LabelCell", filterType: "input" }),
    new Column({ field: "middleName", name: "Middle Name", template: "LabelCell" }),
    new Column({ field: "firstName", name: "First Name", template: "LabelCell", filterType: "input" }),
    new Column({ field: "dob", name: "Date of Birth", template: "DateCell" }),
    new Column({ field: "gender", name: "Gender", template: "LabelCell", filterType: "select", filterOptions: [ "", "Female", "Male" ] }),
    new Column({ field: "address", name: "Address", template: "LabelCell" })
  ];

  constructor(private dataGeneratorService: DataGeneratorService) {}

  ngOnInit() {
    this.dataGeneratorService.generateExternalData1(this.dataSize);
    this.dataGeneratorService.generateExternalData2(this.dataSize);

    this.onExternalDataCall1 = this.handleExternalDataCall1.bind(this);
    this.onExternalDataCall2 = this.handleExternalDataCall2.bind(this);
  }

  public handleExternalDataCall1(externalInfo: ExternalInfo): Promise<ExternalData> {
    return new Promise((resolve, reject) => {
      this.dataGeneratorService.getExternalData1(externalInfo).subscribe((externalData: ExternalData) => {
        setTimeout(() =>
          resolve(externalData), 1000
        );
      });
    });
  }

  public handleExternalDataCall2(externalInfo: ExternalInfo): Promise<ExternalData> {
    return new Promise((resolve, reject) => {
      this.dataGeneratorService.getExternalData2(externalInfo).subscribe((externalData: ExternalData) => {
        resolve(externalData);
      });
    });
  }
}
