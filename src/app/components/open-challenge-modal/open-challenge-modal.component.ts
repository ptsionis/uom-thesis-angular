import { Component } from '@angular/core';
import { LoaderRingComponent } from '../loader-ring/loader-ring.component';
import { ChallengeCancelButtonComponent } from '../challenge-cancel-button/challenge-cancel-button.component';

@Component({
  selector: 'app-open-challenge-modal',
  standalone: true,
  imports: [LoaderRingComponent, ChallengeCancelButtonComponent],
  templateUrl: './open-challenge-modal.component.html',
  styleUrl: './open-challenge-modal.component.css'
})
export class OpenChallengeModalComponent {

}
