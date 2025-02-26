import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { getDatabase, push, ref } from 'firebase/database';

@Component({
  selector: 'app-add-presence',
  templateUrl: './add-presence.page.html',
  styleUrls: ['./add-presence.page.scss'],
})
export class AddPresencePage implements OnInit {
  parentId: string = ''; // Menyimpan parentId yang dikirim dari halaman detail
  selectedItem: string = ''; // Menyimpan selectedItem yang dikirim dari halaman detail
  form = {
    parentId: '',      // ID Parent yang diterima dari Running Class
    nama: '',
    selectedItem: '',
    keterangan: '',
  };
  constructor(private route: ActivatedRoute, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
    // Ambil parentId dan selectedItem dari query params
    this.route.queryParams.subscribe(params => {
      if (params['parentId']) {
        this.parentId = params['parentId'];
        console.log('Parent ID:', this.parentId);
        this.form.parentId = this.parentId; // Mengisi form.parentId dengan parentId
      }
      if (params['selectedItem']) {
        this.selectedItem = params['selectedItem'];
        console.log('Selected Item:', this.selectedItem);
        this.form.selectedItem = this.selectedItem; // Mengisi form.selectedItem dengan selectedItem
      }
    });
  }

  // Fungsi untuk menyimpan presence
  // Fungsi untuk menyimpan presence
  async onSubmit() {
    if (
      this.form.parentId &&
      this.form.nama &&
      this.form.selectedItem &&
      this.form.keterangan
    ) {
      try {
        // Inisialisasi Firebase Database
        const db = getDatabase();
        const dataRef = ref(db, 'presence'); // 'presence' adalah nama koleksi di database

        // Push data ke Firebase dan simpan data child
        await push(dataRef, {
          ...this.form,
          parentId: this.form.parentId, // Menyimpan parentId di data child
          selectedItem: this.form.selectedItem, // Menyimpan selectedItem di data child
        });

        // console.log('Data berhasil disimpan!');
        this.showToast('Data berhasil disimpan!');

        // Setelah simpan data, arahkan kembali ke halaman detail-running-class
        this.router.navigate(['/detail-running-class'], {
          queryParams: {
            parentId: this.parentId,
            selectedItem: this.selectedItem
          }
        });

      } catch (error) {
        // console.error('Gagal menyimpan data:', error);
        this.showToast('Gagal menyimpan data: ' + String(error), 'danger');
      }
    } else {
      // console.log('Form tidak lengkap.');
      // alert('Mohon lengkapi semua field.');
      this.showToast('lengkapi semua field.', 'warning');
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
