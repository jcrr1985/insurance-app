import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { timer } from 'rxjs';


@Component({
  selector: 'ds-input-v2',
  templateUrl: './ds-input.component.html',
  styleUrls: ['./ds-input.component.scss']
})
export class DsInputComponent implements OnInit {

  constructor() { }
  @Input() type: string = 'text'
  @Input() label!: string;
  @Input() helpText!: string;
  @Input() value: any;
  @Output() changeEv: EventEmitter<any> = new EventEmitter();
  @Output() keyupEv: EventEmitter<any> = new EventEmitter();
  @Input() iconActive: boolean = true;
  @Input() statusActive: boolean = true;
  isValid: boolean = false;

  ngOnInit(): void {
  }
  async emitChange() {
    // delay necesario para que el buscador pueda compartir el input
    await timer(100).toPromise();
    this.isValid = this.value && this.value.toString().trim() != '' ? true : false;
    this.changeEv.emit(this.value);
  }
  emitKeyup() {
    this.keyupEv.emit(this.value);
  }

}
