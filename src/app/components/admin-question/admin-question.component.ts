import { Component, Input, SimpleChanges } from '@angular/core';
import { LoaderRingComponent } from '../loader-ring/loader-ring.component';
import { Categories } from '../../models/enums/categories.enum';
import { SocketService } from '../../socket/socket.service';
import { Question } from '../../models/question.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-question',
  standalone: true,
  imports: [LoaderRingComponent, FormsModule],
  templateUrl: './admin-question.component.html',
  styleUrl: './admin-question.component.css',
})
export class AdminQuestionComponent {
  @Input() id: number;
  @Input() question: string;
  @Input() category: Categories;
  @Input() level: number;
  @Input() answer1: string;
  @Input() answer2: string;
  @Input() answer3: string;
  @Input() answer4: string;
  @Input() correctId: number;

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
    this.socketService.on('delete_question_success', (questionId: number) => {
        if (this.id === questionId) this.isDisplayed = false
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

  updateQuestion() {
    const updatedQuestion = new Question(
        this.id, 
        this.editedQuestion, 
        this.editedCategory, 
        this.editedLevel, 
        this.editedAnswer1, 
        this.editedAnswer2, 
        this.editedAnswer3, 
        this.editedAnswer4, 
        this.editedCorrectId)
    this.socketService.emitQuestion('update_question', this.id, updatedQuestion);
  }

  deleteQuestion() {
    this.socketService.emit('delete_question', this.id);
  }
}