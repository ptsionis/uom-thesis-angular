import { Component, Input } from '@angular/core';
import { SocketService } from '../../socket/socket.service';

@Component({
  selector: 'app-challenge-accept-button',
  standalone: true,
  imports: [],
  templateUrl: './challenge-accept-button.component.html',
  styleUrl: './challenge-accept-button.component.css',
})
export class ChallengeAcceptButtonComponent {
  @Input() friendId: any;

  constructor(
    private socketService: SocketService,
  ) {}

  acceptChallenge(): void {
    this.socketService.emit('challenge_accept', this.friendId);
  }
}
