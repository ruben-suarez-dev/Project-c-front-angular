import { Component } from '@angular/core';
import { CreateInhabitantsComponent } from '../create-inhabitants/create-inhabitants.component';
import { ListInhabitantsComponent } from '../list-inhabitants/list-inhabitants.component';

@Component({
  selector: 'app-inhabitant-container',
  standalone: true,
  imports: [CreateInhabitantsComponent, ListInhabitantsComponent],
  templateUrl: './inhabitant-container.component.html',
  styleUrl: './inhabitant-container.component.scss'
})
export class InhabitantContainerComponent {

}
