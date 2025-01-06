import { Component, Input } from '@angular/core';
import { ChallengeAcceptButtonComponent } from '../challenge-accept-button/challenge-accept-button.component';
import { ChallengeDeclineButtonComponent } from '../challenge-decline-button/challenge-decline-button.component';
import { getFirstName } from '../../utils/user-utils';

@Component({
  selector: 'app-challenge-modal',
  standalone: true,
  imports: [ChallengeAcceptButtonComponent, ChallengeDeclineButtonComponent],
  templateUrl: './challenge-modal.component.html',
  styleUrl: './challenge-modal.component.css',
})
export class ChallengeModalComponent {
  @Input() user: any;
  @Input() challenger: any;
  getFirstName = getFirstName;
}
