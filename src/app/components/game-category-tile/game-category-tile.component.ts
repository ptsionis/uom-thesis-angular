import { Component, computed, Input, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SocketService } from '../../socket/socket.service';
import { GameRoomService } from '../../services/gameRoom.service';

@Component({
  selector: 'app-game-category-tile',
  standalone: true,
  imports: [
  ],
  templateUrl: './game-category-tile.component.html',
  styleUrls: ['./game-category-tile.component.css'],
})
export class GameCategoryTileComponent {
  @Input() category: String
  @Input() level: Number
  @Input() turn: Number
  @Input() isPlayed: boolean
  user: any
  gameRoom: string

  constructor(private userService: UserService, private socketService: SocketService, private gameRoomService: GameRoomService) {
    this.user = this.userService.getUser();
    this.gameRoom = this.gameRoomService.getGameRoom();
  }

  isDisabled = computed(() => {
    return this.user.id !== this.turn || this.isPlayed;
  });

  buttonClass = computed(() => {
    return this.isDisabled() ? 'game-category-tile-disabled' : 'game-category-tile';
  });

  getQuestion() {
    this.socketService.emit('get_question', this.gameRoom, this.category, this.level);
  }
}
