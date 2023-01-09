import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Data } from '@angular/router';
import { NodeServerApiService } from 'src/app/services/node-server-api/node-server-api.service';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.scss']
})
export class CreateTableComponent implements OnInit {

  editProfileForm!: FormGroup;
  tableData: any;
  displayedColumns: string[] = ['Table_No', 'Dishes', 'Price'];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getTableData() {

  }

  addTable(): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: 'fit-content',
      height: 'fit-content'
    })
  }

  onSubmit() {

  }

}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: './dialog-box/dialog-box.html',
  styleUrls: ['./dialog-box/dialog-box.scss']
})
export class DialogAnimationsExampleDialog {
  tableno: any
  dishvalue: any
  quan: any
  displayedColumns: string[] = ['Table_No', 'Dishes', 'Quantity'];

  Data: any = [];
  tableData!: { tableNo: any; Dishes: ({ dish: any; quantity?: undefined; } | { quantity: any; dish?: undefined; })[]; };
  tempData!: any[];



  constructor(
    public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
    public nodeserverapi: NodeServerApiService
  ) { }

  @ViewChild(MatTable)
  table!: MatTable<Data>;

  addTable(tableNo: any, Dish: any, Quantity: any) {
    this.Data.push({
      dish: Dish,
      quantity: Quantity
    })
    this.tempData=[{
      tableNo:tableNo,
      Dishes:this.Data
    }]

    console.log(this.Data)
    console.log(this.tempData)
    this.dishvalue = ''
    this.quan = ''
    if (this.Data.length > 1) {
      this.table.renderRows()
    }
  }

  submitData() {
    // console.log(this.Data.tableNo)
  //   this.tableData = {
  //     tableNo: this.Data.tableNo,
  //     Dishes: [{
  //       dish: this.Data.dish,
  //       quantity: this.Data.quantity
  //   }]
  // }
  //   console.log(this.tableData)
  //   this.nodeserverapi.addTable(this.tableData).subscribe(
  //   (res) => {
  //     console.log(res)
  //   }
  // )
  }
}


