import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  dates: number[] = [];
  tasks: any[] = [];
  localId: string = '';
  existingData: boolean = false;
  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['localId']) {
        this.localId = params['localId'];
        this.loadExistingData();
      }
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
    if (!this.localId) return;
  
    this.firebaseService.getData(`kegiatan/${this.localId}`).subscribe(rawData => {
      if (rawData) {
        const data = rawData as { [key: string]: any };
        const firstKey = Object.keys(data)[0];
        const firstItem = data[firstKey];
  
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
    const userId = this.localId;
    const user = this.firebaseService.getCurrentUser();
    const displayName = user?.displayName || 'Unknown User';
  
    this.firebaseService.getData(`kegiatan/${userId}`).subscribe(data => {
      if (data && Object.keys(data).length > 0) {
        const firstKey = Object.keys(data)[0];
        this.firebaseService.updateData(`kegiatan/${userId}/${firstKey}`, { 
          tasks: this.tasks, 
          userId: userId,  // Tambahkan nama user ke Firebase 
          nama: displayName  // Tambahkan nama user ke Firebase 
        })
          .then(() => console.log("Data berhasil diperbarui"))
          .catch(error => console.error("Gagal memperbarui data", error));
      } else {
        this.firebaseService.addData(`kegiatan/${userId}`, { 
          tasks: this.tasks, 
          userId: userId,  // Tambahkan nama user ke Firebase 
          nama: displayName  // Tambahkan nama user baru ke Firebase 
        })
          .then(() => console.log("Data baru berhasil ditambahkan"))
          .catch(error => console.error("Gagal menyimpan data baru", error));
      }
    }, (error) => {
      console.error("Error mengambil data:", error);
      this.firebaseService.addData(`kegiatan/${userId}`, { 
        tasks: this.tasks, 
          userId: userId,  // Tambahkan nama user ke Firebase 
          nama: displayName  // Tambahkan nama user setelah error
      })
        .then(() => console.log("Data baru berhasil ditambahkan setelah error"))
        .catch(error => console.error("Gagal menyimpan data baru setelah error", error));
    });
  }
  
  
}
