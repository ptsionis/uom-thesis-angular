import { Component, Input, signal, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { GameRoomService } from '../../services/gameRoom.service';
import { SocketService } from '../../socket/socket.service';

@Component({
  selector: 'app-game-answer-button',
  standalone: true,
  templateUrl: './game-answer-button.component.html',
  styleUrls: ['./game-answer-button.component.css'],
})
export class GameAnswerButtonComponent implements OnInit {
  @Input() id: Number;
  @Input() text: String;
  @Input() turn: Number;
  user: any;
  gameRoom: any;

  buttonClassName = 'game-answer-button';
  isDisabled = false;

  constructor(
    private userService: UserService,
    private gameRoomService: GameRoomService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.gameRoom = this.gameRoomService.getGameRoom();
    console.log(this.turn !== this.user.id, this.user.id, this.turn);
    if (this.turn !== this.user.id) {
      this.buttonClassName = 'game-answer-button-disabled';
      this.isDisabled = true;
    } else {
      this.buttonClassName = 'game-answer-button';
      this.isDisabled = false;
    }

    this.socketService.on('selected_answer', (answerId) => {
      this.isDisabled = true;
      if (answerId === this.id) {
        this.buttonClassName = 'game-answer-button-selected';
      } else {
        this.buttonClassName = 'game-answer-button-unselected';
      }
    });

    this.socketService.on('reveal_answer', (answerId, correctId) => {
      if (this.id === correctId) {
        this.buttonClassName = 'game-answer-button-correct';
      }
      if (this.id === answerId && this.id !== correctId) {
        this.buttonClassName = 'game-answer-button-wrong';
      }
    });
  }

  sendAnswer() {
    this.socketService.emit('submit_answer', this.gameRoom, this.id);
  }
}
