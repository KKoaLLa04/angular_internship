import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  username!: FormGroup;
  today:Date = new Date();
  formattedToday:string = "2024-03-14";

  constructor(
    private userService: UserService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private modalRef: BsModalRef
    ){
      
    }

    ngOnInit(): void {
      this.initForm();
    }

    initForm(){
      this.username = this.formBuilder.group({
        avatar: ['', Validators.required],
        name: ['', Validators.required],
        username: ['', Validators.required],
        gender: ['', Validators.required],
        date_of_study: ['', Validators.required],
        block1: [false],
        block2: [false],
        status: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20) , Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()/.=+]).{6,20}")]],
        age: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
        date: [this.formattedToday, Validators.required],
      });
    }

  // add
  changeDataToParent(){
    interface UserDataRequest {
      avatar: string;
      name: string;
      username: string;
      gender: string;
      date_of_study: Date;
      block1: boolean;
      block2: boolean;
      status: string;
      password: string;
      age: number;
      date: string;
    }
    let dataRequest: UserDataRequest = {
      avatar: this.username.value.avatar,
      name: this.username.value.name,
      username: this.username.value.username,
      gender: this.username.value.gender,
      date_of_study: this.username.value.date_of_study,
      block1: this.username.value.block1,
      block2: this.username.value.block2,
      status: this.username.value.status,
      password: this.username.value.password,
      age: this.username.value.age,
      date: this.username.value.date,
    }

    return dataRequest;
  }

  submitForm(){
    if(this.username.valid){
      let data = this.changeDataToParent();
      this.addUser(data);
    }else{
      this.markFormGroupAsTouched(this.username);
    }
  }

   addUser(data:any){
    this.userService.addUser(data).subscribe({
      next: (response:any) => {
        this.modalService.hide(1);
      },
      error: (error:any) => {
        this.modalService.hide(1);
      }
    })
   }

// add
  markFormGroupAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  closeModal(){
    this.modalRef?.hide();
  }
}
