import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-submit-question-button',
  standalone: true,
  imports: [],
  templateUrl: './submit-question-button.component.html',
  styleUrl: './submit-question-button.component.css',
})
export class SubmitQuestionButtonComponent {
  @Output() toggleQuestionFormEvent = new EventEmitter<void>();

  toggleShowQuestionForm() {
    this.toggleQuestionFormEvent.emit();
  }
}
