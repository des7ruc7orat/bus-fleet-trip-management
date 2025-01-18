import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-bus-item',
  imports: [CommonModule, TagModule],
  templateUrl: './bus-item.component.html',
  styleUrl: './bus-item.component.scss',
})
export class BusItemComponent {
  @Input() public bus: any;
}
