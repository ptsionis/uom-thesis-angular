import { Component, EventEmitter, Output } from '@angular/core';
import { SocketService } from '../../socket/socket.service';
import { LoaderRingComponent } from '../loader-ring/loader-ring.component';
import { AdminPendingQuestionComponent } from '../admin-pending-question/admin-pending-question.component';

@Component({
  selector: 'app-admin-pending-questions',
  standalone: true,
  imports: [LoaderRingComponent, AdminPendingQuestionComponent],
  templateUrl: './admin-pending-questions.component.html',
  styleUrl: './admin-pending-questions.component.css',
})
export class AdminPendingQuestionsComponent {
  @Output() toggleAdminPendingEvent: EventEmitter<void> =
    new EventEmitter<void>();
  pendingQuestions: any[] = [];

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.emit('get_all_pending_questions', null);

    this.socketService.on('get_all_pending_success', (questions: any[]) => {
      this.pendingQuestions = [...questions];
    });
  }

  toggleAdminPending(): void {
    this.toggleAdminPendingEvent.emit();
  }
}
