import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private firebaseService: FirebaseService, private router: Router) { }

  ngOnInit() {
  }

  async register() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const user = await this.firebaseService.register(this.email, this.password);
      console.log('User registered:', user);
      alert('Registration successful!');
      this.router.navigate(['']);
    } catch (error) {
      alert('Registration failed: ');
    }
  }

}
