import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';

@Component({
    selector: 'mdm-pager',
    templateUrl: './pager.component.html'
})
export class PagerComponent implements OnInit, OnChanges {
    @Input() page: number;
    @Input() totalItem: number;
    @Input() itemPerPage: number;

    @Output() onPageChange: EventEmitter<number> = new EventEmitter();

    numberOfpages: number[];

    constructor() {

    }

    ngOnInit() {
        this.caluclatePageItem();
    }

    ngOnChanges() {
        this.caluclatePageItem();
    }

    onPageClick(pageNumber: number) {
        const pages = this.getTotalPage();
        if (pageNumber != this.page 
            && pageNumber > 0
            && pageNumber <= pages) {
            this.page = pageNumber;
            this.onPageChange.emit(pageNumber);
        }
    }

    private caluclatePageItem() {
        this.numberOfpages = [];
        this.itemPerPage = this.itemPerPage || 10;
        
        const pages = this.getTotalPage();
        console.log(this.page)
        if (this.page == 1) {
            this.numberOfpages = [1, 2, 3, 4]
        } else if (this.page > (pages - 4)) {
            this.numberOfpages = [pages - 4 , pages - 3 , pages - 2, pages - 1  ];
        } else {
            this.numberOfpages = [this.page - 1 , this.page , this.page + 1, this.page +2  ];
        }
        
    }

    getTotalPage() {
        let pages: number = 1;
        if (this.totalItem > this.itemPerPage) {
            pages = Math.ceil(this.totalItem / this.itemPerPage);
        }

        return pages;
    }

}
