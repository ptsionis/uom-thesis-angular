import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css',
})
export class ProgressBarComponent {
  @Input() currentValue: number = 0;
  @Input() goalValue: number = 0;

  barWidth: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateBarWidth();
  }

  calculateBarWidth(): void {
    if (this.currentValue <= 0) {
      this.barWidth = 1;
    } else if (this.goalValue === 0) {
      this.barWidth = 100;
    } else {
      this.barWidth = Math.round((this.currentValue / this.goalValue) * 100);
    }
  }
}
