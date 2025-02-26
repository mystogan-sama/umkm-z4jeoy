import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { get, getDatabase, ref, runTransaction, set, update } from 'firebase/database';

@Component({
  selector: 'app-update-running-class',
  templateUrl: './update-running-class.page.html',
  styleUrls: ['./update-running-class.page.scss'],
})
export class UpdateRunningClassPage implements OnInit {
  parentId: string = '';
  userId: string = '';
  selectedItem: string = '';
  guru: string = '';
  tempat: string = '';
  tanggal: string = '';
  keterangan: string = '';
  form = {
    localId: '',
    userId: '',
    tempat: '',
    guru: '',
    tanggal: '',
    selectedItem: '',
    keterangan: '',
  };
  isHidden: boolean = true;
  constructor(private route: ActivatedRoute, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log('Received Params:', params);
      if (params['parentId']) {
        this.parentId = params['parentId'];  // Menyimpan parentId untuk digunakan nanti
        this.loadDataForUpdate(this.parentId);
        this.form.localId = this.parentId;
      }
      if (params['userId']) {
        this.userId = params['userId'];
        this.form.userId = this.userId;
      }
      if (params['selectedItem']) {
        this.selectedItem = params['selectedItem'];
        this.form.selectedItem = this.selectedItem;
      }
      if (params['tempat']) {
        this.tempat = params['tempat'];
        this.form.tempat = this.tempat;
      }
      if (params['guru']) {
        this.guru = params['guru'];
        this.form.guru = this.guru;
      }
      if (params['tanggal']) {
        this.tanggal = params['tanggal'];
        this.form.tanggal = this.tanggal;
      }
      if (params['keterangan']) {
        this.keterangan = params['keterangan'];
        this.form.keterangan = this.keterangan;
      }
    });
  }

  async loadDataForUpdate(parentId: string) {
    try {
      const db = getDatabase();
      const dataRef = ref(db, 'running-class/' + parentId); // Mengambil data berdasarkan ID parent
      const snapshot = await get(dataRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        // Isi form dengan data yang sudah ada
        this.form.userId = data.userId;
        this.form.tempat = data.tempat;
        this.form.guru = data.guru;
        this.form.tanggal = data.tanggal;
        this.form.selectedItem = data.selectedItem;
        this.form.keterangan = data.keterangan;
        console.log(data);
      } else {
        console.log('Data tidak ditemukan!');
      }
    } catch (error) {
      console.error('Gagal mengambil data untuk update:', error);
    }
  }

  async onSubmit() {
    if (
      this.form.userId &&
      this.form.tempat &&
      this.form.guru &&
      this.form.tanggal &&
      this.form.selectedItem &&
      this.form.keterangan
    ) {
      try {
        const db = getDatabase();
        const runningClassRef = ref(db, 'running-class/' + this.form.localId); // Update data berdasarkan parentId

        // Update hanya field yang perlu diubah
        await runTransaction(runningClassRef, (currentData) => {
          // Jika data saat ini tidak ada, return objek baru
          if (currentData === null) {
            return {
              userId: this.form.userId,
              tempat: this.form.tempat,
              guru: this.form.guru,
              tanggal: this.form.tanggal,
              selectedItem: this.form.selectedItem,
              keterangan: this.form.keterangan,
              localId: this.form.localId, // pastikan localId tetap ada
            };
          }

          currentData.tempat = this.form.tempat;
          currentData.guru = this.form.guru;
          currentData.tanggal = this.form.tanggal;
          currentData.selectedItem = this.form.selectedItem;
          currentData.keterangan = this.form.keterangan;
          currentData.localId = currentData.localId || this.form.localId;


          // Mengembalikan data yang sudah diperbarui
          return currentData;
        });

        console.log('Data berhasil diupdate!');
        this.showToast('Data berhasil diupdate!');
        this.router.navigate(['/tabs/running-class-list']);
      } catch (error) {
        console.error('Gagal mengupdate data:', error);
        this.showToast('Gagal mengupdate data: ' + String(error), 'danger');
      }
    } else {
      console.log('Form tidak lengkap.');
      this.showToast('Mohon lengkapi semua field.', 'warning');
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
