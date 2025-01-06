import { Component, Input } from '@angular/core';
import { getFirstName } from '../../utils/user-utils';

@Component({
  selector: 'app-game-player',
  standalone: true,
  imports: [
  ],
  templateUrl: './game-player.component.html',
  styleUrls: ['./game-player.component.css'],
})
export class GamePlayerComponent {
  @Input() player: any
  @Input() isOpponent: boolean
  getFirstName = getFirstName
}
