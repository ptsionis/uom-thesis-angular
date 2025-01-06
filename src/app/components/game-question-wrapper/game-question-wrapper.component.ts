import { Component, Input } from '@angular/core';
import { GameAnswerButtonComponent } from '../game-answer-button/game-answer-button.component';

@Component({
  selector: 'app-game-question-wrapper',
  standalone: true,
  imports: [
    GameAnswerButtonComponent
  ],
  templateUrl: './game-question-wrapper.component.html',
  styleUrls: ['./game-question-wrapper.component.css'],
})
export class GameQuestionWrapperComponent {
  @Input() turn: Number
  @Input() question: any
}
