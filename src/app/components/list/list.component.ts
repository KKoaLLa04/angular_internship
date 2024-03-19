import { Component, OnInit} from '@angular/core';
import { UserService } from '../../service/user.service';
import { DataShow } from '../interface/DataShow.interface';
import { DataType } from '../interface/DataType.interface';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{

  data!: DataType;
  constructor(
    private userService: UserService,
    private modalRef: BsModalRef
  ){
      
  }

  ngOnInit(): void {
    this.getListData();
  }

  getListData(){
    this.userService.getData().subscribe((responseData: any) => {
      this.data = responseData;
      console.log(responseData);
      this.closeModal();
    })
  }

  reloadData(value:boolean){
    console.log(value);
    if(value){
      this.getListData();
    }
  }

  closeModal(){
    this.modalRef?.hide();
  }
}
