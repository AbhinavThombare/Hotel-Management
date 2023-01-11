import { Component, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  tableData: any = [];
  displayedColumns: string[] = ['Table_No','Dishes','Quantity','Unit_Price', 'Price','Total_Price','Action'];

  constructor(
    public dialog: MatDialog,
    public nodeserverapi: NodeServerApiService
  ) { }

  ngOnInit(): void {
    this.getTableData()
  }

  getTableData() {
    this.nodeserverapi.getTables().subscribe(
      (res) => {
        console.log(res.body)
        this.tableData = res.body
      }
    )
  }

  addTable(): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: 'fit-content',
      height: 'fit-content'
    })
  }
  updateTable(tableNo:any): void {
    const onetable = this.tableData.find((i:any) => {
      return (i.tableNo === tableNo)
    })
    this.dialog.open(DialogAnimationsExampleDialog,{
      width: 'fit-content',
      height: 'fit-content',
      data:onetable,
      
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
  tableno:any;
  dishvalue: any;
  quan: any;
  displayedColumns: string[] = ['Dishes', 'Quantity','Action'];
  Data: any = [];
  tempData!: any;
  dishList!: any;
  tableData!: any;
  tableList = [1,2,3,4,5,6,7,8,9]

  constructor(
    public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
    public nodeserverapi: NodeServerApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getDishList();
    this.getTableList();
    if(data){
      this.tableno=(data.tableNo).toString();
      data.Dishes.forEach((element:any) => {
        this.Data.push(element)
      });
    }
   
  }


  @ViewChild(MatTable)
  table!: MatTable<Data>;

  getDishList() {
    this.nodeserverapi.allDishes().subscribe(
      (res) => {
        this.dishList = res.body
        console.log(this.dishList.dishes)
      }
    )
  }

  getTableList(){
    this.nodeserverapi.getTables().subscribe(
      (res) => {
        this.tableData = res.body
        console.log(this.tableData)
      }
    )
  }

  getTableOccupied(no:any) {
   if(this.tableData){
    var result =this.tableData.find((i:any) => {
      return (i.tableNo === no)
    })
   }
   return result;
  }

  addTable(tableNo: any, Dish: any, Quantity: any) {
    this.Data.push({
      dish: Dish,
      quantity: Quantity,
      Price: ''
    })
    this.tempData = {
      tableNo: tableNo,
      Dishes: this.Data
    }

    console.log(this.Data)
    console.log(this.tempData)
    this.dishvalue = ''
    this.quan = ''
    if (this.Data.length > 1) {
      this.table.renderRows()
    }
  }

  editDialog(e:any) {
    console.log(e)
  }

  submitData() {
    this.nodeserverapi.addTable(this.tempData).subscribe(
      (res) => {
        console.log(res)
      }
    )
  }
}


