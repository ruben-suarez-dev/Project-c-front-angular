import { Component } from '@angular/core';
import { CreateCondominiumComponent } from '../create-condominium/create-condominium.component';
import { ListCondominiumComponent } from '../list-condominium/list-condominium.component';

@Component({
  selector: 'app-condominium-container',
  standalone: true,
  imports: [CreateCondominiumComponent, ListCondominiumComponent],
  templateUrl: './condominium-container.component.html',
  styleUrl: './condominium-container.component.scss'
})
export class CondominiumContainerComponent {

}
