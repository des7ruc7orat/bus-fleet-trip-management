import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import {DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dummy',
  imports: [
    CommonModule,
    TagModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
    MultiSelectModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
  ],
  templateUrl: './dummy.html',
  styleUrl: './dummy.scss',
  standalone: true,
})
export class DummyComponent {
  private config: DynamicDialogConfig = inject(DynamicDialogConfig);

  constructor() {
    console.log(this.config, 'config');
  }

}
