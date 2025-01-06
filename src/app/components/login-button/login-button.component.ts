import { Component } from '@angular/core';

@Component({
  selector: 'app-login-button',
  standalone: true,
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css']
})
export class LoginButtonComponent {

  login() {
    window.location.href = 'http://localhost:8000/auth/facebook';
  }
}