import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit, OnDestroy {
  available = [1];
  sourceSelect = [
    { key: 'item 1', value: 1 },
    { key: 'item 2', value: 2 },
    { key: 'item 3', value: 3 },
    { key: 'item 4', value: 4 }
  ]
  cards = [
    { prestacion: 'Atención Hospitalaria', name: 'atencionhospitalaria', status: '' },
    { prestacion: 'Atención Médica', name: 'atencionmedica', status: 'disabled' },
    { prestacion: 'Dentales', name: 'dentista', status: '' },
    { prestacion: 'Examenes y Procedimientos', name: 'examenes', status: '' },
    { prestacion: 'Medicamentos', name: 'medicamentos', status: '' },
    { prestacion: 'Lentes y Monturas', name: 'optica', status: '' }
  ]

  disabledButton: boolean = false;


  setCard(index: number) {
    this.cards.forEach(e => e.status = '');
    this.cards[index].status = 'active';
  }

  coldefined = 'col-span-4';

  constructor(private router: Router) {
  }
  ngOnDestroy(): void {
    if (window.removeAllListeners) window.removeAllListeners();
  }

  ngOnInit(): void {
    setInterval(() => {
      this.disabledButton = !this.disabledButton;
    }, 10000)

    window.addEventListener('keydown', event => {
      if (event.ctrlKey && event.code == 'KeyQ') this.router.navigate(['/']);
    })
    this.coldefined = 'col-span-' + 12 / this.cards.length;
  }

  receivedChangesOnInput(data: any) {
  }
  agregar() {
    this.available.push(this.available.length + 1);
  }
  eliminar() {
    this.available.pop();
  }
  changeEvent(data: any) {
    console.log("from change", data)
  }
  keypressEvent(data: any) {
    console.log("fromm keyup", data)
  }
  selectEvent(data: any) {
    console.log("from select item", data);
  }
}
