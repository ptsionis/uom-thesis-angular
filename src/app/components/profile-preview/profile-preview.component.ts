import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  getFirstName,
  getGoalScore,
  getJoinedDate,
  getRank,
  getWinrate,
} from '../../utils/user-utils';
import { capitalizeFirstLetter } from '../../utils/other-utils';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { AllCategoriesWinratesBarsComponent } from '../all-categories-winrates-bars/all-categories-winrates-bars.component';

@Component({
  selector: 'app-profile-preview',
  standalone: true,
  imports: [ProgressBarComponent, AllCategoriesWinratesBarsComponent],
  templateUrl: './profile-preview.component.html',
  styleUrl: './profile-preview.component.css',
})
export class ProfilePreviewComponent {
  @Input() user: any;
  @Output() toggleShowProfileEvent = new EventEmitter<void>();

  getFirstName = getFirstName;
  getGoalScore = getGoalScore;
  getJoinedDate = getJoinedDate;
  getRank = getRank;
  getWinrate = getWinrate;
  capitalizeFirstLetter = capitalizeFirstLetter;

  handleImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.onerror = null;
    target.src = '/assets/images/noPicture.webp';
  }

  toggleShowProfile(): void {
    this.toggleShowProfileEvent.emit();
  }
}
