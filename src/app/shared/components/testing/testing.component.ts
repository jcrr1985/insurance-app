import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit, OnDestroy {
  availables = [1];
  constructor(private router: Router) {
  }
  ngOnDestroy(): void {
    if (window.removeAllListeners) window.removeAllListeners();
  }

  ngOnInit(): void {
    window.addEventListener('keydown', event => {
      if (event.ctrlKey && event.code == 'KeyQ') this.router.navigate(['/']);
    })
  }

  receivedChangesOnInput(data: any) {
    console.log(data);
  }
  agregar() {
    this.availables.push(this.availables.length + 1);
  }
  eliminar() {
    this.availables.pop();
  }

}
