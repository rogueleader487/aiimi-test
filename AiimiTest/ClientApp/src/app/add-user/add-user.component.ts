import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SaveResult } from '../entities/save-result';
import { User } from '../entities/user';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styles: [':host {display: contents;}']
})
export class AddUserComponent implements OnInit {
  public showAddUser = false;
  public submitted = false;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) { }  

  ngOnInit(): void {    
  }

  newUserForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    jobTitle: new FormControl(''),
    phone: new FormControl('', [Validators.required, Validators.pattern("^0([1-6][0-9]{8,10}|7[0-9]{9})$")]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
  });

  get f() { return this.newUserForm.controls; }

  addUserDisplay(): void {
    this.showAddUser = !this.showAddUser;
  }

  submit(): void {
    this.submitted = true;

    if (this.newUserForm.invalid) {
      return;
    }

    this.userService.create(this.newUserForm.value as User).subscribe(result => {
      if (result == SaveResult.DuplicateExists) {
        this.toastr.show('User already exists', '', {
          closeButton: true,
          toastClass: 'toast-brand ngx-toastr'
        });
      }
      else {
        this.toastr.show('New User added!', '', {
          closeButton: true,
          toastClass: 'toast-brand ngx-toastr'
          });
      }
    })

    this.submitted = false;
  }
}

