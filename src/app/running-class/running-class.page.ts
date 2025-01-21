import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { getDatabase, push, ref } from 'firebase/database';

@Component({
  selector: 'app-running-class',
  templateUrl: './running-class.page.html',
  styleUrls: ['./running-class.page.scss'],
})
export class RunningClassPage implements OnInit {
  form = {
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
    // Ambil parameter localId dari URL
    this.route.queryParams.subscribe(params => {
      if (params['localId']) {
        this.form.userId = params['localId'];
        console.log('localId:', this.form.userId);
      }
    });
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
        // Inisialisasi Firebase Database
        const db = getDatabase();
        const dataRef = ref(db, 'running-class'); // 'running-class' adalah nama koleksi di database

        // Push data ke Firebase dan simpan data parent
        const newParentRef = await push(dataRef, {
          ...this.form,
        });

        console.log('Data berhasil disimpan!');
        this.showToast('Data berhasil disimpan!');

        // Setelah simpan data, arahkan ke halaman detail-running-class untuk menampilkan detail data parent
        this.router.navigate(['/detail-running-class'], {
          queryParams: { 
            parentId: newParentRef.key, // Mengirimkan ID parent ke halaman detail-running-class
            selectedItem: this.form.selectedItem // Mengirimkan selectedItem ke halaman detail-running-class
          }
        });
      } catch (error) {
        console.error('Gagal menyimpan data:', error);
        this.showToast('Gagal menyimpan data: ' + String(error), 'danger');
      }
    } else {
      console.log('Form tidak lengkap.');
      this.showToast('Mohon lengkapi semua field.' , 'warning');
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
