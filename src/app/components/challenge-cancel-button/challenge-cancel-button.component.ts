import { Component, Input } from '@angular/core';
import { SocketService } from '../../socket/socket.service';

@Component({
  selector: 'app-challenge-cancel-button',
  standalone: true,
  imports: [],
  templateUrl: './challenge-cancel-button.component.html',
  styleUrl: './challenge-cancel-button.component.css'
})
export class ChallengeCancelButtonComponent {
  @Input() friendId?: number;

  constructor(
    private socketService: SocketService,
  ) {}
  
  cancelChallenge() {
    if (this.friendId) {
      this.socketService.emit('challenge_cancel', this.friendId);
    } else {
      this.socketService.emit('open_challenge_cancel', null);
    }
  }
}
