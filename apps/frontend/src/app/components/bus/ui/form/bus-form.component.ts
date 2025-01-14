import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-bus-form',
  imports: [CommonModule, FloatLabelModule, InputTextModule, Button],
  templateUrl: './bus-form.component.html',
  styleUrl: './bus-form.component.scss',
})
export class BusFormComponent {}
