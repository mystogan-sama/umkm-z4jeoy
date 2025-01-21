import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  displayName: string | null = null;
  email: string | null = null;
  constructor(private firebaseService: FirebaseService, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    const auth = getAuth(); // Mendapatkan instance Firebase Authentication
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        // Jika pengguna sudah login
        this.displayName = user.displayName || 'No Display Name';
        this.email = user.email || 'No Email';
        console.log('User data loaded:', { displayName: this.displayName, email: this.email });
      } else {
        // Jika tidak ada pengguna yang login
        console.log('No user is logged in.');
        this.displayName = 'Guest';
        this.email = 'No Email';
      }
    });
  }

  editProfile() {
    alert('Edit profile feature is under development!');
  }

  changePassword() {
    alert('Change password feature is under development!');
  }

  async logout() {
    try {
      await this.firebaseService.logout(); // Panggil service logout
      console.log('User logged out'); // Logging
      this.router.navigate(['']); // Redirect ke halaman utama
      this.showToast('Logout successful!');
    } catch (error) {
      console.error('Logout failed:', error);
      this.showToast('Logout failed: ' + String(error), 'danger');
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
}
