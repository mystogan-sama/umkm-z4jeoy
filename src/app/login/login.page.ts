import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email = '';
  password = '';

  constructor(private firebaseService: FirebaseService, private router: Router) { }

  ngOnInit() {
  }

  async login() {
    try {
      const user = await this.firebaseService.login(this.email, this.password);
      console.log('User logged in:', user);
      alert('Login successful!');
      this.router.navigate(['/tabs']);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed: ' + String(error));
    }
  }
}
