import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-admin-questions-button',
  standalone: true,
  imports: [],
  templateUrl: './admin-questions-button.component.html',
  styleUrl: './admin-questions-button.component.css',
})
export class AdminQuestionsButtonComponent {
  @Output() toggleAdminQuestionsEvent = new EventEmitter<void>();

  toggleAdminQuestions() {
    this.toggleAdminQuestionsEvent.emit();
  }
}
