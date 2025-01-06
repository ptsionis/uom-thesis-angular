import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-availability-icon',
  standalone: true,
  imports: [],
  templateUrl: './availability-icon.component.html',
  styleUrl: './availability-icon.component.css',
})
export class AvailabilityIconComponent {
  @Input() availability: String;
}
