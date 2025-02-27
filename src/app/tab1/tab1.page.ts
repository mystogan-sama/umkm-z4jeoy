import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicModule, MenuController, ToastController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true, // Tambahkan ini
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule],
})
export class Tab1Page {
  users: any[] = []; // Array untuk menyimpan daftar user
  constructor(private menu: MenuController, private router: Router, private firebaseService: FirebaseService, private alertController: AlertController, private toastController: ToastController) { }
  closeMenu() {
    this.menu.close();
    this.router.navigate(['/display']);
  }

  ngOnInit() {
    this.getUsers(); // Panggil fungsi untuk mengambil data user
  }

  getUsers() {
    this.firebaseService.getData('kegiatan').subscribe((data: any) => {
      // console.log(data[0][0].userId); // Debugging untuk memeriksa struktur data
      // console.log(data[0][0]); // Debugging untuk memeriksa struktur data
      // console.log(data[0][0].tasks); // Debugging untuk memeriksa struktur data
    
      if (data && typeof data === 'object') {
        this.users = Object.keys(data).map(id => {
          // Ambil data user dari array pertama untuk user tertentu
          const userData = data[id][0]; // Ambil data pertama di setiap user
          // console.log('sana', userData);
    
          // Mendapatkan nama pengguna
          const nama = userData?.nama || 'Unknown';
          const userId = userData?.userId;
    
          // Mendapatkan task pertama yang terkait dengan user
          const tasks = data[0][0] || {}; // Ambil task pertama, atau objek kosong jika tidak ada
          // console.log('sini', tasks);
          
          return {
            id: id,  // ID pengguna Firebase (sebenarnya bisa berupa IlMZaHwTCLhyQupOP8DafXzfhrs2)
            nama: nama,   // Nama pengguna
            taskFirst: tasks,
            userId: userId, // Task pertama yang terkait
          };
        });
      } else {
        this.users = [];
      }
    }, error => {
      console.error("Error mengambil data user:", error);
    });
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

  goToCalendar(userId: string) {
    console.log('Navigating to calendar for userId:', userId); // Debugging
    
    if (userId !== '0') {
      // Melakukan navigasi dan menyertakan queryParams untuk userId yang valid
      this.router.navigate(['/calendar'], { queryParams: { localId: userId } });
    } else {
      console.error('Invalid userId:', userId); // Jika userId invalid
    }
  }
  

}
