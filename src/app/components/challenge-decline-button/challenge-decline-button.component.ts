import { Component, Input } from '@angular/core';
import { SocketService } from '../../socket/socket.service';

@Component({
  selector: 'app-challenge-decline-button',
  standalone: true,
  imports: [],
  templateUrl: './challenge-decline-button.component.html',
  styleUrl: './challenge-decline-button.component.css',
})
export class ChallengeDeclineButtonComponent {
  @Input() friendId: any;

  constructor(
    private socketService: SocketService,
  ) {}

  declineChallenge(): void {
    this.socketService.emit('challenge_decline', this.friendId);
  }
}
