import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/models/item';
import { FormComponent } from './form/form.component';
// import { InventoryComponent } from 'src/app/pages/inventory';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  error?: string;
  itemList!: Item[];
  /*items: string[] = [
    'Andrei',
    'Marius',
    'Mihai',
    'Andrei',
    'Andreea',
    'Mihaela',
  ];*/
  constructor(public dialog: MatDialog, public itemService: ItemService) {}

  getItems(): void {
    this.itemService.getItems().subscribe(
      (list: Item[]) => {
        this.itemList = list;
      },
      (err) => {
        this.error = err.error;
      }
    );
  }

  deleteItem(id: number | undefined): void {
    this.itemService.delete(id!).subscribe(
      () => {
        window.location.reload();
      },
      (err) => {}
    );
  }

  async openDialog(id: number | null) {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '250px',
      data: { idToBeEdit: id },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
    this.getItems();
  }
}
