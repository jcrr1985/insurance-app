import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'ds-search-v2',
  templateUrl: './ds-search-v2.component.html',
  styleUrls: ['./ds-search-v2.component.scss']
})
export class DsSearchV2Component implements OnInit {
  @Input() label!: string;
  @Input() helpText!: string;
  @Input() source: any[] = [];
  @Input() value = '';
  @Output() changeEv: EventEmitter<any> = new EventEmitter();
  @Output() keyupEv: EventEmitter<any> = new EventEmitter();
  keySearch: string = '';
  isValid: boolean = false;
  filterResult: any[] = [];
  elementSelected: any;

  constructor() { }

  ngOnInit(): void {
  }

  search(keySearch: string) {
    this.keySearch = keySearch;
    console.log("to search", this.keySearch);
    const val = this.keySearch && this.keySearch.trim().toLowerCase();
    this.filterResult = this.source.filter(e => (e.key.toString().toLowerCase() as string).startsWith(val));
  }
  selectValue(element: any) {
    console.log("1")
    this.value = element.key;
    this.elementSelected = element;
    this.keySearch = '';
    this.filterResult = [];
    this.emitChange();
  }

  emitChange() {
    console.log("2")
    this.isValid = this.elementSelected ? true : false;
    if (this.isValid) this.changeEv.emit(this.elementSelected);
  }

}
