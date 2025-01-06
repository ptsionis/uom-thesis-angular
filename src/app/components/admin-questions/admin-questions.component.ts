import { Component, EventEmitter, Output } from '@angular/core';
import { SocketService } from '../../socket/socket.service';
import { LoaderRingComponent } from '../loader-ring/loader-ring.component';
import { AdminQuestionComponent } from '../admin-question/admin-question.component';

@Component({
  selector: 'app-admin-questions',
  standalone: true,
  imports: [LoaderRingComponent, AdminQuestionComponent],
  templateUrl: './admin-questions.component.html',
  styleUrl: './admin-questions.component.css',
})
export class AdminQuestionsComponent {
  @Output() toggleAdminQuestionsEvent: EventEmitter<void> =
    new EventEmitter<void>();
  allQuestions: any[] = [];

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.emit('get_all_questions', null);

    this.socketService.on('get_all_questions_success', (questions: any[]) => {
      this.allQuestions = [...questions];
    });
  }

  toggleAdminQuestions(): void {
    this.toggleAdminQuestionsEvent.emit();
  }
}
