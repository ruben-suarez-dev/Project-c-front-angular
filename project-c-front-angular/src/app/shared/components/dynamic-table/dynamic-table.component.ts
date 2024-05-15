import { Component, Input } from '@angular/core';
import { DTColums } from './data-table/data-table-interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss'
})
export class DynamicTableComponent {

  @Input() dtColumsData: DTColums | undefined;

}
