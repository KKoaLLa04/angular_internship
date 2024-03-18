import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit{
  username!: FormGroup;
  userData!: any;
  itemId: number = 0;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private modalRef: BsModalRef,
    private modalService: BsModalService,
    ){
    }

    ngOnInit(): void {
      this.getDetailUser(this.itemId);
    }

    changeDataToParent(){
      // Block fix cứng tạm thời
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

  initFormEdit(data: userData){
    this.username = this.formBuilder.group({
      avatar: [data.avatar, Validators.required],
      name: [data.name, Validators.required],
      username: [data.username, Validators.required],
      gender: [data.gender, Validators.required],
      date_of_study: [data.date_of_study, Validators.required],
      block1: [data.block1],
      block2: [data.block2],
      status: [data.status, Validators.required],
      password: [data.password, [Validators.required, Validators.minLength(6), Validators.maxLength(20) , Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()/.=+]).{6,20}")]],
      age: [data.age, [Validators.required, Validators.min(1), Validators.max(100)]],
      date: [data.date, Validators.required],
    });
  }

  getDetailUser(idItem: number){
    this.userService.getDetailUser(idItem).subscribe(data => {
      this.userData = data;
      this.initFormEdit(this.userData);
    })
  }

  submitFormEdit(){
    if(this.username.valid){
      // add
      let data = this.changeDataToParent();
      this.userService.updateUser(this.itemId, data).subscribe({
        next: (response:any) => {
          this.modalService.hide(1);
        },
        error: (error:any) => {
          this.modalService.hide(1);
        }
      })
    }else{
      this.markFormGroupAsTouched(this.username);
    }
  }

  markFormGroupAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  closeModal(){
    this.modalRef?.hide();
  }
}

export interface userData{
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