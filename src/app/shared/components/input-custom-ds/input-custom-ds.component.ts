import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import '@vs-design-system/ds-input';
import '@vs-design-system/ds-datepicker';
import '@vs-design-system/ds-select';


@Component({
  selector: 'app-input-custom-ds',
  templateUrl: './input-custom-ds.component.html',
  styleUrls: ['./input-custom-ds.component.scss']
})
export class InputCustomDsComponent implements OnInit, OnDestroy {

  @Input() type: string = '';
  @Input() controlName: string = '';
  @Input() helpMsg: string = '';
  @Input() placeholder: string = '';
  @Output() emitChange: EventEmitter<any> = new EventEmitter();

  elementOnDocument: any;


  constructor() { }

  ngOnInit(): void {
    this.enabledEvents();
  }
  ngOnDestroy() {
    console.log(this.elementOnDocument);
    //if (this.elementOnDocument.removeAllListeners) this.elementOnDocument.removeAllListeners();
  }

  enabledEvents() {
    switch (this.type) {
      case 'text':
        window.addEventListener('oninput', (event: any) => {
          if (this.controlName == event.target.id) {
            this.emitChange.emit({ value: event.detail, controlName: this.controlName })
            this.elementOnDocument = event.target;
          }
        })
        break;
      case 'select':
        window.addEventListener('onchangeSelect', (event: any) => {
          if (this.controlName == event.target.id) {
            this.emitChange.emit({ value: event.detail, controlName: this.controlName })
            this.elementOnDocument = event.target;
          }
        })
        break;
      case 'date':
        window.addEventListener('onSelectDate', (event: any) => {
          if (this.controlName == this.getIdFromDateInput(event)) {
            this.emitChange.emit({ value: event.detail, controlName: this.controlName })
            this.elementOnDocument = event.target;
          }
        })
        break;

      default:
        break;
    }
  }

  getIdFromDateInput(event: any) {
    if (event.path) {
      for (const e of event.path) { if (e.attributes && e.attributes['id']) return (e.attributes['id']['value']) }
    }
  }
  options: any = [];
}
