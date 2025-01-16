import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicModule, MenuController, ToastController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true, // Tambahkan ini
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule],
})
export class Tab1Page {

  constructor(private menu: MenuController, private router: Router, private firebaseService: FirebaseService, private alertController: AlertController, private toastController: ToastController) { }
  closeMenu() {
    this.menu.close();
    this.router.navigate(['/display']);
  }

  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Confirm Logout',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Logout canceled');
          },
        },
        {
          text: 'Yes',
          handler: async () => {
            await this.logout();
          },
        },
      ],
    });

    await alert.present();
  }

  async logout() {
    try {
      await this.firebaseService.logout(); // Panggil service logout
      console.log('User logged out'); // Logging
      this.router.navigate(['']); // Redirect ke halaman utama
      this.showToast('Logout successful!');
      this.menu.close();
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
