import { Component, Input } from '@angular/core';
import { CategoryWinrateBarComponent } from '../category-winrate-bar/category-winrate-bar.component';
import { getWinrate } from '../../utils/user-utils';

@Component({
  selector: 'app-all-categories-winrates-bars',
  standalone: true,
  imports: [CategoryWinrateBarComponent],
  templateUrl: './all-categories-winrates-bars.component.html',
  styleUrl: './all-categories-winrates-bars.component.css',
})
export class AllCategoriesWinratesBarsComponent {
  @Input() user: any;
  getWinrate = getWinrate;
}
