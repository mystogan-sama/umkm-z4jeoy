import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { updateProfile } from 'firebase/auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email = '';
  password = '';
  confirmPassword = '';
  displayName = '';
  passwordType: string = 'password';
  confirmPasswordType: string = 'password';
  
  constructor(private firebaseService: FirebaseService, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
  }

  async register() {
    // Validasi apakah password dan konfirmasi password cocok
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      // Registrasi pengguna menggunakan FirebaseService
      const user = await this.firebaseService.register(this.email, this.password, this.displayName);

      if (user) {
        // Tambahkan nama pengguna ke profil Firebase setelah registrasi
        await updateProfile(user, { displayName: this.displayName });
        this.showToast('Register successful!');
        console.log('User registered:', user);
        this.router.navigate(['']); // Arahkan ke halaman utama atau login
      }
    } catch (error) {
      console.error('Registration failed:', error);
      this.showToast('Register failed: ' + String(error), 'danger');
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

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordType = this.confirmPasswordType === 'password' ? 'text' : 'password';
  }

}