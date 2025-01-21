import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    localId: '',      // ID Parent yang diterima dari Running Class
    nama: '',
    selectedItem: '',
    keterangan: '',
  };
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // Ambil parentId dan selectedItem dari query params
    this.route.queryParams.subscribe(params => {
      if (params['parentId']) {
        this.parentId = params['parentId'];
        console.log('Parent ID:', this.parentId);
        this.form.localId = this.parentId; // Mengisi form.localId dengan parentId
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
      this.form.localId &&
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
          parentId: this.form.localId, // Menyimpan parentId di data child
          selectedItem: this.form.selectedItem, // Menyimpan selectedItem di data child
        });

        console.log('Data berhasil disimpan!');
        alert('Data berhasil disimpan!');

        // Setelah simpan data, arahkan kembali ke halaman detail-running-class
        this.router.navigate(['/detail-running-class'], {
          queryParams: { 
            parentId: this.parentId,
            selectedItem: this.selectedItem
          }
        });

      } catch (error) {
        console.error('Gagal menyimpan data:', error);
        alert('Gagal menyimpan data.');
      }
    } else {
      console.log('Form tidak lengkap.');
      alert('Mohon lengkapi semua field.');
    }
  }

}
