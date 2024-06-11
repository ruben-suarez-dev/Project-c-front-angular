import { Component } from '@angular/core';
import { CreateHouseComponent } from '../create-house/create-house.component';
import { ListHouseComponent } from '../list-house/list-house.component';

@Component({
  selector: 'app-house-container',
  standalone: true,
  imports: [CreateHouseComponent, ListHouseComponent],
  templateUrl: './house-container.component.html',
  styleUrl: './house-container.component.scss'
})
export class HouseContainerComponent {

}
