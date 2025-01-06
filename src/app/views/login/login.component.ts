import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginButtonComponent } from '../../components/login-button/login-button.component';

@Component({
  selector: 'login-component',
  standalone: true,
  imports: [RouterOutlet, LoginButtonComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'thesis-angular';
}
