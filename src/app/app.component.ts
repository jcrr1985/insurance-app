import { Component } from '@angular/core';
import { Persona } from './shared/interfaces/interfaces';
import '@vs-design-system/ds-table'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'web app';

  constructor(){
  }



}
