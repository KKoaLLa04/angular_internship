import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddComponent } from 'src/app/components/add/add.component';
import { EditComponent } from 'src/app/components/edit/edit.component';
import { UserService } from 'src/app/service/user.service';
import { DataType } from '../interface/DataType.interface';
import { DataShow } from '../interface/DataShow.interface';

@Component({
  selector: 'child-list',
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.scss'],
})
export class ChildListComponent implements OnChanges {
  @Input() data!: DataType;
  dataShow: DataShow[] = [];

  username!: FormGroup;
  message?: string;
  today: Date = new Date();
  formattedToday: string = '2024-03-18';

  @Output() reloadData = new EventEmitter<boolean>();

  // handle search
  searchText: String = '';

  // handle pagination
  currentPageData: number = 1;
  perPage: number = 5;

  totalPagesData: number = 11; // hardcode tam thoi

  constructor(
    private userService: UserService,
    private modalService: BsModalService,
    private modalRef: BsModalRef
  ) {
  }

  ngOnChanges(): void {
    this.onFilterSearchText("");
  }

  onFilterSearchText(value: string) {
    const searchLower = value.toLowerCase();
    
    if(this.data!==undefined){
      this.dataShow = this.data.filter((item:any) => {
        const nameLower = item.name.toLowerCase();
        const usernameLower = item.username.toLowerCase();
        
        return nameLower.includes(searchLower) || usernameLower.includes(searchLower);
      });
    }
  }

  pageChange(currentPage: number) {
    this.currentPageData = currentPage;
  }

  // add student modal
  openModal() {
    this.modalRef = this.modalService.show(AddComponent, {});

    this.modalRef.onHidden?.subscribe((res:any) => {
      this.checkChangeData(res.id == 1);
    })
  }

  // edit student modal
  openEditModal(itemId: number) {
    const initialState: {itemId:number} = {
      itemId: itemId,
    };

    this.modalRef = this.modalService.show(EditComponent, { initialState });
    
    this.modalRef.onHidden?.subscribe((res: any) => {
      this.checkChangeData(res.id == 1);
    })
  }

  // delete student modal
  openModalDetete(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });

    this.modalRef.onHidden?.subscribe((res:any) => {
      this.checkChangeData(res.id == 1);
    })
  }

  confirmDeleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: (response:any) => {
        this.modalService.hide(1);
        this.closeModal();
      },
      error: (error:any) => {
        this.modalService.hide(0);
      }
    });
  }

  declineDeleteUser(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }

  closeModal(){
    this.modalRef?.hide();
  }

  checkChangeData(value:boolean){
    this.reloadData.emit(value);
  }
}
