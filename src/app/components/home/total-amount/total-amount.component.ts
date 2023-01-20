import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-total-amount',
  templateUrl: './total-amount.component.html',
  styleUrls: ['./total-amount.component.scss']
})
export class TotalAmountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  campaignOne = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
}
