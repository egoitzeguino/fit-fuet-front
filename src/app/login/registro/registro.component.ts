import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistroComponent { }
