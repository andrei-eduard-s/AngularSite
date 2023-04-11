import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  items: string[] = [
    'Andrei',
    'Marius',
    'Mihai',
    'Andrei',
    'Andreea',
    'Mihaela',
  ];
constructor() { }
ngOnInit(): void {
  
}
}
