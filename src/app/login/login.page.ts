import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email = '';
  password = '';
  passwordType: string = 'password';

  constructor(private firebaseService: FirebaseService, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
    //test
  }

  async login() {
    try {
      const user = await this.firebaseService.login(this.email, this.password);
      console.log('User logged in:', user);
      this.router.navigate(['/tabs']);
      this.showToast('Login successful!');
    } catch (error) {
      console.error('Login failed:', error);
      this.showToast('Login failed: ' + String(error), 'danger');
    }
  }

  async showToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color, // Tambahkan warna toast
      cssClass: 'custom-toast', // Tambahkan kelas kustom jika diperlukan
    });
    await toast.present();
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }
}
