import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddComponent } from 'src/app/components/add/add.component';
import { EditComponent } from 'src/app/components/edit/edit.component';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'child-list',
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.scss'],
})
export class ChildListComponent implements OnChanges {
  @Input() data: any;
  dataShow:any[] = [];

  username!: FormGroup;
  message?: string;
  today: Date = new Date();
  formattedToday: string = '2024-03-18';

  @Output() reloadData = new EventEmitter<boolean>();

  constructor(
    private userService: UserService,
    private modalService: BsModalService,
    private modalRef: BsModalRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.onFilterSearchText("");
  }

  // handle search
  searchText: String = '';

  onFilterSearchText(value: string) {
    const searchLower = value.toLowerCase();
    
    this.dataShow = this.data.filter((item:any) => {
      const nameLower = item.name.toLowerCase();
      const usernameLower = item.username.toLowerCase();
      
      return nameLower.includes(searchLower) || usernameLower.includes(searchLower);
    });
  }

  // handle pagination
  currentPageData = 1;
  perPage: number = 5;

  totalPagesData: number = this.dataShow.length;

  pageChange(currentPage: number) {
    this.currentPageData = currentPage;
  }

  checkDisplayList(i: number) {
    let pageMax = this.currentPageData * 5; 
    let pageMin = (this.currentPageData - 1) * 5 + 1; 

    return i >= pageMin && i <= pageMax;
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

    this.modalRef.onHidden?.subscribe((res:any) => {
      this.checkChangeData(res.id == 1);
    })

    this.modalRef = this.modalService.show(EditComponent, { initialState });
  }

  // delete student modal
  openModalDetete(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });

    this.modalRef.onHidden?.subscribe((res:any) => {
      this.checkChangeData(res.id == 1);
    })
  }

  confirm(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: (response:any) => {
        this.modalService.hide(1);
      },
      error: (error:any) => {
        this.modalService.hide(1);
      }
    });
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }

  checkChangeData(value:boolean){
    this.reloadData.emit(value);
  }
}