import { Component, OnInit} from '@angular/core';
import { UserService } from '../../service/user.service';
import { DataShow } from '../interface/DataShow.interface';
import { DataType } from '../interface/DataType.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{

  data!: DataType;
  constructor(
    private userService: UserService,
  ){
      
  }

  ngOnInit(): void {
    this.getListData();
  }

  getListData(){
    this.userService.getData().subscribe((responseData: any) => {
      this.data = responseData;
    })
  }

  reloadData(value:boolean){
    if(value){
      this.getListData();
    }
  }
}
