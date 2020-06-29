import { 
    Component, 
    Input, 
    Output, 
    EventEmitter, 
    OnInit, 
    OnChanges 
} from '@angular/core';

//@component PagerComponent: display page according Backend API value
@Component({
    selector: 'mdm-pager',
    templateUrl: './pager.component.html'
})
export class PagerComponent implements OnInit, OnChanges {
    //@property page: current page value
    //obtain from parent companent 
    //use for hilight current page in pagination
    //@type {number}
    @Input() page: number;

    //@property totalItem: number of response total result
    //ex. number of devices in the system is 100, when call backend filter with group id
    // the group contain 35 device so Backend API will response 35 to total number
    // but response will response following [itemPerPage] 
    // use for calculate total page.
    // @type number
    @Input() totalItem: number;

    //@property itemPerPage: number of display item in 1 page.
    // obtain from Backend API, use for calculate total page
    //@type {number}
    @Input() itemPerPage: number;

    @Output() onPageChange: EventEmitter<number> = new EventEmitter();

    //@property numberOfpages: total page
    //total page calculated value
    //use for display pager item
    //@type {number[]} 
    numberOfpages: number[];

    constructor() {

    }

    ngOnInit() {
        this.caluclatePageItem();
    }

    ngOnChanges() {
        this.caluclatePageItem();
    }
    
    // @method onPageClick: user selected page
    // the method will send selected page number to parent component
    // @return {void}
    onPageClick(pageNumber: number) {
        const pages = this.getTotalPage();
        if (pageNumber != this.page
            && pageNumber > 0
            && pageNumber <= pages) {
            this.page = pageNumber;
            this.onPageChange.emit(pageNumber);
        }
    }

    // @method caluclatePageItem: calculate pager items
    // calculate pager item from total pages and current page
    // @return {void}
    private caluclatePageItem() {
        this.numberOfpages = [];
        this.itemPerPage = this.itemPerPage || 10;

        const pages = this.getTotalPage();
        // issue#: if you have best solution please improve the logic

        // if only one page not do anything
        if (pages == 1) {
            return;
        // current page is page 1
        } else if (this.page == 1) {
            // total page is less than or equal max pager item
            if ((pages - 1) <= (5 - 1)) {
                for (let i = 0; i < pages - 1; i++) {
                    this.numberOfpages.push(i + 1);
                }
            // set 1 ~ 5 pager
            } else {
                this.numberOfpages = [1, 2, 3, 4];
            }
        // number current page is more than number of 5 last page
        } else  if (this.page > (pages - 4)) {
            this.numberOfpages = [pages - 4, pages - 3, pages - 2, pages - 1];
        // set pager with set current page to second of  pager item
        } else {
            this.numberOfpages = [this.page - 1, this.page, this.page + 1, this.page + 2];
        }

    }

    // @method getTotalPage: calculate number of total page
    // calculate from total page items and max item per page
    // @return {number}
    getTotalPage(): number {
        let pages: number = 1;
        if (this.totalItem > this.itemPerPage) {
            pages = Math.ceil(this.totalItem / this.itemPerPage);
        }

        return pages;
    }

}
