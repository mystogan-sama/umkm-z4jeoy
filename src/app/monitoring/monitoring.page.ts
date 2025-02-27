import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.page.html',
  styleUrls: ['./monitoring.page.scss'],
})
export class MonitoringPage implements OnInit {
  users: any[] = []; // Array untuk menyimpan daftar user
  constructor(private firebaseService: FirebaseService, private router: Router) { }

  ngOnInit() {
    this.getUsers(); // Panggil fungsi untuk mengambil data user
  }

  getUsers() {
    this.firebaseService.getData('kegiatan').subscribe((data: any) => {
      console.log(data[0][0].userId); // Debugging untuk memeriksa struktur data
      console.log(data[0][0]); // Debugging untuk memeriksa struktur data
      console.log(data[0][0].tasks); // Debugging untuk memeriksa struktur data
    
      if (data && typeof data === 'object') {
        this.users = Object.keys(data).map(id => {
          // Ambil data user dari array pertama untuk user tertentu
          const userData = data[id][0]; // Ambil data pertama di setiap user
          console.log('sana', userData);
    
          // Mendapatkan nama pengguna
          const nama = userData?.nama || 'Unknown';
          const userId = userData?.userId;
    
          // Mendapatkan task pertama yang terkait dengan user
          const tasks = data[0][0] || {}; // Ambil task pertama, atau objek kosong jika tidak ada
          console.log('sini', tasks);
          
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

  goToCalendar(userId: string) {
    console.log('Navigating to calendar for userId:', userId); // Debugging
    
    if (userId !== '0') {
      // Melakukan navigasi dan menyertakan queryParams untuk userId yang valid
      this.router.navigate(['/calendar'], { queryParams: { localId: userId } });
    } else {
      console.error('Invalid userId:', userId); // Jika userId invalid
    }
  }

  search() {
    console.log("Tombol search diklik!");
    // Tambahkan logika pencarian di sini
  }
  

}
