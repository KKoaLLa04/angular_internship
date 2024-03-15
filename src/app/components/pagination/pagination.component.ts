import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit{

  @Input() currentPage: number =1;
  @Input() totalPages: number =1;
  @Input() limit:number = 5;
  @Input() data: any = '';
  displayData: boolean = true;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  pages: number[] = [];

  ngOnInit(): void {
    const pagesCount = Math.ceil(this.totalPages/ this.limit);
    this.pages = this.range(1, pagesCount);
    this.data = this.displayList(1, pagesCount);
  }

  range(start: number, end:number): number[]{
    return [...Array(end).keys()].map(el => el + start);
  }
  
  displayList(start: number, end: number){
    return this.data.slice(start, end);
  }

  nextPage(){
    if(this.currentPage < this.totalPages){
      this.pageChange.emit(this.currentPage+1);
    }
  }

  prevPage(){
    if(this.currentPage > 1){
      this.pageChange.emit(this.currentPage-1);
    }
  }

  setPage(page: number){
    if(page >= 1 && page <= this.totalPages){
        this.pageChange.emit(page);
    }
  }
}