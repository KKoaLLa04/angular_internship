import { Component, OnInit} from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{

  data: any;
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
