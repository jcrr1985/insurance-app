import { IArancel } from './../../../interfaces/arancel';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { timer } from 'rxjs';
import { ArancelService } from 'src/app/shared/services/arancel-service.service';

@Component({
  selector: 'ds-search-v2',
  templateUrl: './ds-search-v2.component.html',
  styleUrls: ['./ds-search-v2.component.scss']
})
export class DsSearchV2Component implements OnInit {
  @Input() label!: string;
  @Input() helpText!: string;
  // @Input() source: any[] = [];
  @Input() value = '';
  @Output() changeEv: EventEmitter<any> = new EventEmitter();
  @Output() keyupEv: EventEmitter<any> = new EventEmitter();
  keySearch: string = '';
  isValid: boolean = false;
  public filterResult: IArancel[] = [];
  elementSelected: any;

  constructor(private arancelService: ArancelService) { }

  ngOnInit(): void {
  }

  search(keySearch: string) {
    this.keySearch = keySearch ? keySearch.toString().toLowerCase() : '';
    const val = this.keySearch && this.keySearch != '' && this.keySearch.toString().trim().toLowerCase();
    this.filterResult = this.arancelService.busquedaAranceles(keySearch)
  }
  selectValue(element: any) {

    this.value = element.Arancel;
    this.elementSelected = element;
    this.keySearch = '';
    this.filterResult = [];
    this.emitChange();
  }

  emitChange() {
    this.isValid = this.elementSelected ? true : false;
    if (this.isValid) this.changeEv.emit(this.elementSelected);
  }

}
