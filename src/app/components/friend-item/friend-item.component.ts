import { Component, EventEmitter, Input } from '@angular/core';
import { SocketService } from '../../socket/socket.service';
import { GameRoomService } from '../../services/gameRoom.service';
import { getFirstName } from '../../utils/user-utils';
import { Availabilities } from '../../models/enums/availabilities.enum';
import { AvailabilityIconComponent } from '../../components/availability-icon/availability-icon.component';
import { ProfilePreviewComponent } from '../../components/profile-preview/profile-preview.component';
import { ChallengeButtonComponent } from '../challenge-button/challenge-button.component';
import { ChallengeCancelButtonComponent } from '../challenge-cancel-button/challenge-cancel-button.component';
import { ChallengeAcceptButtonComponent } from '../challenge-accept-button/challenge-accept-button.component';
import { ChallengeDeclineButtonComponent } from '../challenge-decline-button/challenge-decline-button.component';

@Component({
  selector: 'app-friend-item',
  standalone: true,
  imports: [AvailabilityIconComponent, ProfilePreviewComponent, ChallengeButtonComponent, ChallengeCancelButtonComponent, ChallengeAcceptButtonComponent, ChallengeDeclineButtonComponent],
  templateUrl: './friend-item.component.html',
  styleUrl: './friend-item.component.css',
})
export class FriendItemComponent {
  @Input() friend: any;
  getFirstName = getFirstName;
  availability = Availabilities.OFFLINE;
  showProfile = false;
  challengedMe = false;
  cancelButton = false;

  constructor(
    private socketService: SocketService,
    private gameRoomService: GameRoomService,
  ) {}

  ngOnInit(): void {
    this.socketService.on(
      'friend_status',
      ({ userId, status, challengedMe, amIChallenger }) => {
        if (userId === this.friend.id) {
          if (status === Availabilities.OFFLINE) {
            this.challengedMe = false;
            this.cancelButton = false;
          }
          this.availability = status;
          if (challengedMe && amIChallenger) {
            this.cancelButton = true;
          }
          if (challengedMe && !amIChallenger) {
            this.challengedMe = true;
          }
        }
      }
    );

    this.socketService.on(
      'challenge_notification',
      (challengerUserId) => {
        if (this.friend.id === challengerUserId) {
          this.challengedMe = true
        }
      }
    );

    this.socketService.on(
      'challenge_sent',
      (targetUserId) => {
        if (this.friend.id === targetUserId) {
          this.availability = Availabilities.PENDING;
          this.cancelButton = true
        }
      }
    );

    this.socketService.on(
      'challenge_cancelled_ch',
      (targetUserId) => {
        if (this.friend.id === targetUserId) {
          this.cancelButton = false
          this.availability = Availabilities.ONLINE;
        }
      }
    );

    this.socketService.on(
      'challenge_cancelled_ta',
      (challengerUserId) => {
        if (this.friend.id === challengerUserId) {
          this.challengedMe = false
          this.availability = Availabilities.ONLINE;
        }
      }
    );

    this.socketService.on(
      'rejected_successfully',
      (challengerUserId) => {
        if (this.friend.id === challengerUserId) {
          this.challengedMe = false
          this.availability = Availabilities.ONLINE;
        }
      }
    );

    this.socketService.on(
      'challenge_rejected',
      (targetUserId) => {
        if (this.friend.id === targetUserId) {
          this.cancelButton = false
        }
      }
    );

    this.socketService.on(
      'accept_error_ch',
      (targetUserId) => {
        if (this.friend.id === targetUserId) {
          this.cancelButton = false
          this.availability = Availabilities.ONLINE;
        }
      }
    );

    this.socketService.on(
      'accept_error_ta',
      (challengerUserId) => {
        if (this.friend.id === challengerUserId) {
          this.challengedMe = false
          this.availability = Availabilities.ONLINE;
        }
      }
    );

    this.socketService.on(
      'start_game',
      (newRoomId) => {
        this.gameRoomService.setGameRoom(newRoomId);
      }
    );
  }

  toggleShowProfile(): void {
    this.showProfile = !this.showProfile;
  }
}
