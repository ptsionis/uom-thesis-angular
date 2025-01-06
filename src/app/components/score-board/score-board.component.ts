import { Component, Input } from '@angular/core';
import { getFirstName } from '../../utils/user-utils';

@Component({
  selector: 'app-score-board',
  standalone: true,
  imports: [
  ],
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css'],
})
export class ScoreBoardComponent {
  @Input() scoreMe: Number
  @Input() scoreOpponent: Number
  getFirstName = getFirstName
}
