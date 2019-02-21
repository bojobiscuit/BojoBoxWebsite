import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() currentPage: number;
  @Input() pageCount: number;
  @Output() clickNumber: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  isCurrent(i) {
    return (i == this.currentPage);
  }

  getLink(i: number) {
    this.clickNumber.emit(i);
  }

  counter(): number[] {
    var min = Math.max(this.currentPage - 3, 0);
    var max = Math.min(this.currentPage + 3, this.pageCount - 1);
    var length = max - min;
    var pageOptions = [];
    for (var i = 0; i <= length; i++) {
      pageOptions.push(min + i);
    }
    return pageOptions;
  }
}
