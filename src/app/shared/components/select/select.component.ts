import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from '../../../products/models/categoty'; // Adjust the path as needed

@Component({
  selector: 'app-select',
  standalone: false,
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
})
export class SelectComponent implements OnInit {
  @Input() title: string = '';
  @Input() items: Category[] = [];
  @Output() selectedItem: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  detectChange(event: any) {
    this.selectedItem.emit(event);
  }
}
