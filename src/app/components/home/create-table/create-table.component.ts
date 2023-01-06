import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.scss']
})
export class CreateTableComponent implements OnInit {

  editProfileForm!: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

  openModal(targetModal:any) {
    // this.modalService.open(targetModal, {
    //  centered: true,
    //  backdrop: 'static'
    // });
    // this.editProfileForm.patchValue({
    //   firstname: user.firstname,
    //   lastname: user.lastname,
    //   username: user.username,
    //   email: user.email
    //  });
    }
  onSubmit() {

  }

}
