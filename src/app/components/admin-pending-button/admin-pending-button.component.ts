import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-admin-pending-button',
  standalone: true,
  imports: [],
  templateUrl: './admin-pending-button.component.html',
  styleUrl: './admin-pending-button.component.css',
})
export class AdminPendingButtonComponent {
  @Output() toggleAdminPendingEvent = new EventEmitter<void>();

  toggleAdminPending() {
    this.toggleAdminPendingEvent.emit();
  }
}
