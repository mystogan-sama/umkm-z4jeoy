import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { addMonths, format, subMonths } from 'date-fns';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  dates: number[] = [];
  tasks: any[] = [];
  localId: string = '';
  existingData: boolean = false;
  localName: string = '';
  users: any[] = [];  // Menambahkan deklarasi properti users dengan tipe array
  userId: string = ''; // Menambahkan deklarasi userId
  userName: string = 'To-Do List Bulanan'; // Variabel untuk menampilkan nama di title
  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService) { 
  }

  ngOnInit() {
    // Mengambil queryParam dari URL untuk userId
    this.route.queryParams.subscribe(params => {
      this.userId = params['localId'];  // Ambil localId dari queryParams
      this.loadExistingData();   // Panggil loadUserData dengan userId
    });
    this.generateDates();
  }

  generateDates() {
    this.dates = Array.from({ length: 30 }, (_, i) => i + 1);
  }

  generateTasks(): any[] { // Ubah agar mengembalikan array
    const taskNames = ['Shaum', 'Terawih', 'Tadarus', 'Baca Buku 1', 'Baca Buku 2', 'ZF', 'Silaturahmi', 'Hafalan 2:177', 'Hafalan 4:59'];
  
    return taskNames.map(name => ({
      name,
      checked: this.dates.reduce((acc: { [key: number]: boolean }, date) => {
        acc[date] = false;
        return acc;
      }, {})
    }));
  }

  loadExistingData() {
    if (!this.userId) return;
  
    this.firebaseService.getData(`kegiatan/${this.userId}`).subscribe(rawData => {
      if (rawData) {
        const data = rawData as { [key: string]: any };
        const firstKey = Object.keys(data)[0];
        const firstItem = data[firstKey];
        console.log('first', firstItem);

        this.userName = firstItem?.nama || 'Unknown User';
        // Ambil nama user saat data pertama kali dimuat
        const user = this.firebaseService.getCurrentUser();
        
        const displayName = user?.displayName || 'Unknown User';
  
        this.tasks = firstItem?.tasks || this.generateTasks();
        this.tasks.forEach(task => task.nama = displayName); // Tambahkan nama user
        console.log("Datanya",this.tasks);
  
      } else {
        this.tasks = this.generateTasks();
        
      }
    }, (error) => {
      console.error("Error mengambil data:", error);
      this.tasks = this.generateTasks();
    });
  }

  saveTasksToFirebase() {
    const userId = this.localId; // Ambil ID user
    const kegiatanRef = this.firebaseService.getData(`kegiatan/${userId}`);
  
    kegiatanRef.subscribe((data) => {
      if (data) {
        // Ambil key pertama yang ada dalam data
        const kegiatanKeys = Object.keys(data);
        if (kegiatanKeys.length > 0) {
          const firstKey = kegiatanKeys[0]; // Pastikan ini adalah key yang benar
          this.firebaseService.updateData(`kegiatan/${userId}/${firstKey}`, { tasks: this.tasks })
            .then(() => console.log("Data berhasil diperbarui"))
            .catch(error => console.error("Gagal memperbarui data", error));
        }
      } else {
        // Jika belum ada data, simpan sebagai baru
        this.firebaseService.addData(`kegiatan/${userId}`, { tasks: this.tasks })
          .then(() => console.log("Data baru berhasil ditambahkan"))
          .catch(error => console.error("Gagal menyimpan data baru", error));
      }
    });
  }
  


}
