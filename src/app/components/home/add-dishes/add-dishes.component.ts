import { Component, OnInit } from '@angular/core';
import { NodeServerApiService } from 'src/app/services/node-server-api/node-server-api.service';
import { MatTableDataSource } from '@angular/material/table';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];


@Component({
  selector: 'app-add-dishes',
  templateUrl: './add-dishes.component.html',
  styleUrls: ['./add-dishes.component.scss']
})
export class AddDishesComponent implements OnInit {
  dish: {} | undefined;
  category: String | undefined;
  name: String | undefined;
  price: String | undefined;
  alldishes: any | null;
  displayedColumns: string[] = ['Category', 'Name', 'Price'];
  result!: any[];


  constructor(
    private nodeserverapi: NodeServerApiService
  ) {

  }

  ngOnInit(): void {
    this.allDishes()
  }

  allDishes() {
    this.nodeserverapi.allDishes().subscribe(
      (res) => {
        console.log(res.body)
        this.alldishes = res.body
        this.alldishes = this.alldishes.dishes
        this.result = Object.keys(this.alldishes).map(e => this.alldishes[e]);
      }
    )
  }

  adddish() {
    console.log(this.category, this.name, this.price)
    this.dish = {
      Category: this.category,
      Dish_Name: this.name,
      Price: this.price
    }

    console.log(this.dish)

    this.nodeserverapi.addDish(this.dish).subscribe(
      (res) => {
        console.log(res)
        this.category = ''
        this.name = ''
        this.price = ''
        this.allDishes()
      }
    )
  }

}
