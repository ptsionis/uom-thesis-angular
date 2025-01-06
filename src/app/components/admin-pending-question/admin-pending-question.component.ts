import { Component, Input, SimpleChanges } from '@angular/core';
import { LoaderRingComponent } from '../loader-ring/loader-ring.component';
import { Categories } from '../../models/enums/categories.enum';
import { SocketService } from '../../socket/socket.service';
import { Question } from '../../models/question.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-pending-question',
  standalone: true,
  imports: [LoaderRingComponent, FormsModule],
  templateUrl: './admin-pending-question.component.html',
  styleUrl: './admin-pending-question.component.css',
})
export class AdminPendingQuestionComponent {
  @Input() id: number;
  @Input() question: string;
  @Input() category: Categories;
  @Input() level: number;
  @Input() answer1: string;
  @Input() answer2: string;
  @Input() answer3: string;
  @Input() answer4: string;
  @Input() correctId: number;
  @Input() source: string;
  @Input() userId: string;

  categories = Object.values(Categories);
  editedQuestion: string
  editedCategory: string
  editedLevel: number
  editedAnswer1: string
  editedAnswer2: string
  editedAnswer3: string
  editedAnswer4: string
  editedCorrectId: number
  isDisplayed: boolean

  constructor(
    private socketService: SocketService,
  ) {
    this.isDisplayed = true
  }

  ngOnInit(): void {
    this.socketService.on('accept_pending_success', (pendingQuestionId: number) => {
      if (this.id === pendingQuestionId) this.isDisplayed = false
    });
    this.socketService.on('delete_pending_success', (pendingQuestionId: number) => {
        if (this.id === pendingQuestionId) this.isDisplayed = false
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['question']) this.editedQuestion = this.question;
    if (changes['category']) this.editedCategory = this.category;
    if (changes['level']) this.editedLevel = this.level;
    if (changes['answer1']) this.editedAnswer1 = this.answer1;
    if (changes['answer2']) this.editedAnswer2 = this.answer2;
    if (changes['answer3']) this.editedAnswer3 = this.answer3;
    if (changes['answer4']) this.editedAnswer4 = this.answer4;
    if (changes['correctId']) this.editedCorrectId = this.correctId;
  }

  saveQuestion() {
    const acceptedQuestion = new Question(
        this.id, 
        this.editedQuestion, 
        this.editedCategory, 
        this.editedLevel, 
        this.editedAnswer1, 
        this.editedAnswer2, 
        this.editedAnswer3, 
        this.editedAnswer4, 
        this.editedCorrectId)
    this.socketService.emit('accept_pending_question', acceptedQuestion);
  }

  deleteQuestion() {
    this.socketService.emit('delete_pending_question', this.id);
  }
}