import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/models/item';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

export interface DialogData{
  idToBeEdit: number | null;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  private itemToEdit: Item | undefined = new Item();
  errorText?: string;
  form!: FormGroup;
  subscriptionList: Subscription[] = [];
  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder, public itemService: ItemService
  ) {}

  ngOnInit(): void {
    this.errorText = " ";

    if (this.data.idToBeEdit != 0)
      this.setEditItem(this.data.idToBeEdit!);

    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      name: [null],
      number: [null],
      category: [null],
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  private addItem(newItem: Item): void{
    this.itemService.createItem(newItem).subscribe(() =>{
      this.dialogRef.close();
    }, (err) => {
      this.errorText = err.error;
    }
    );
  }
  //Private class:
  private updateItem(newItem: Item): void{
    this.itemService.edit(newItem).subscribe(() => {
      this.dialogRef.close();
    }, (err) => {
      this.errorText = err.error;
    });
  }

  saveNewItem(): void{
    const newItem: Item = {
      ...this.itemToEdit,
      ...this.form.getRawValue(),
    };

    if (this.data.idToBeEdit != 0)
      this.updateItem(newItem);
    else
    this.addItem(newItem);
  }

  private setEditItem(id: number): void{
    this.itemService.getItemById(id).subscribe((item: Item) => {
      this.itemToEdit = item;
      this.form.patchValue(item, {
        emitEvent: false
      });
    });
  }
}
