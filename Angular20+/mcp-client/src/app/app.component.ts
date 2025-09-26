import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Item, ItemService } from './item.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h1 class="title">MCP Server Client</h1>

    <ul>
      <li *ngFor="let item of items">
        {{item.name}} - {{item.description}}
        <button (click)="deleteItem(item.id)">Delete</button>
      </li>
    </ul>

    <input [(ngModel)]="newName" placeholder="Name">
    <input [(ngModel)]="newDesc" placeholder="Description">
    <button (click)="addItem()">Add</button>
  `
})
export class AppComponent implements OnInit {
  items: Item[] = [];
  newName = '';
  newDesc = '';

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.itemService.getItems().subscribe(data => this.items = data);
  }

  addItem() {
    const newItem: Item = { id: Date.now(), name: this.newName, description: this.newDesc };
    this.itemService.addItem(newItem).subscribe(() => this.loadItems());
    this.newName = '';
    this.newDesc = '';
  }

  deleteItem(id: number) {
    this.itemService.deleteItem(id).subscribe(() => this.loadItems());
  }
}
