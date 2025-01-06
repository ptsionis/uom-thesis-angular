import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../../socket/socket.service';
import { ModalCustomComponent } from '../modal-custom/modal-custom.component';
import { PendingQuestion } from '../../models/pending-question.model';
import { Categories } from '../../models/enums/categories.enum';

@Component({
  selector: 'app-question-form',
  standalone: true,
  imports: [FormsModule, ModalCustomComponent],
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css'],
})
export class QuestionFormComponent {
  @Output() toggleQuestionFormEvent = new EventEmitter<void>();

  submitSuccess = false;
  showFormModal = false;
  msgSuccess = 'Question submitted successfully!';
  msgFail = 'An error occurred, please try again!';

  categories = Object.values(Categories);
  levels = [1, 2, 3];
  correctIds = [1, 2, 3, 4];

  constructor(private socketService: SocketService) {}

  handleSubmit(form: NgForm): void {
    if (form.valid) {
      const formData = form.value;
      const pendingQuestion = new PendingQuestion(
        null,
        formData.question,
        formData.category,
        formData.level,
        formData.answer1,
        formData.answer2,
        formData.answer3,
        formData.answer4,
        formData.correctId,
        formData.source,
        null
      );

      const postData: Partial<PendingQuestion> = { ...pendingQuestion };
      delete postData.id;
      delete postData.userId;

      this.socketService.emit('submit_pending_question', postData);
    }
  }

  ngOnInit(): void {
    this.socketService.on('submit_pending_success', () => {
      this.submitSuccess = true;
      this.showFormModal = true;
    });

    this.socketService.on('submit_pending_fail', () => {
      this.submitSuccess = false;
      this.showFormModal = true;
    });
  }

  toggleShowQuestionForm() {
    this.toggleQuestionFormEvent.emit();
  }

  closeModal(): void {
    this.showFormModal = false;
  }
}
