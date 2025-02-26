import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { equalTo, get, getDatabase, onValue, orderByChild, query, ref, remove } from 'firebase/database';
import { addIcons } from 'ionicons';
import { archive, heart, trash } from 'ionicons/icons';

@Component({
  selector: 'app-running-class-list',
  templateUrl: './running-class-list.page.html',
  styleUrls: ['./running-class-list.page.scss'],
})
export class RunningClassListPage implements OnInit {
  runningClasses: any[] = [];
  loading = true; // Tampilkan spinner

  constructor(private router: Router, private alertController: AlertController, private toastController: ToastController) {
    addIcons({ archive, heart, trash });
  }

  ngOnInit() {
    this.fetchRunningClasses();
  }

  // ionViewWillEnter() {
  //   // Refresh data setiap kali halaman dibuka
  //   this.fetchRunningClasses();
  // }

  // Mengambil data running-class dan presence
  fetchRunningClasses() {
    this.loading = true
    const db = getDatabase();
    const runningClassRef = ref(db, 'running-class');
    const presenceRef = ref(db, 'presence');

    onValue(runningClassRef, (snapshot) => {
      if (snapshot.exists()) {
        this.runningClasses = [];
        snapshot.forEach((childSnapshot) => {
          const data = childSnapshot.val();
          const parentId = childSnapshot.key;
          console.log('Parent ID:', parentId);

          const parentData = { parentId: parentId, expanded: false, children: [], ...data };
          onValue(presenceRef, (presenceSnapshot) => {
            if (presenceSnapshot.exists()) {
              // Reset array children sebelum menambah data baru
              parentData.children = [];
              presenceSnapshot.forEach((presenceChild) => {
                const childData = presenceChild.val();
                if (childData.parentId === parentId) {
                  parentData.children.push(childData);
                }
              });
            }
            // Cek localId sebelum menyimpan ke runningClasses
            console.log('Parent Data:', parentData);  // Menampilkan data parent (termasuk localId)
            const existingIndex = this.runningClasses.findIndex((rc) => rc.localId === parentId);
            if (existingIndex === -1) {
              this.runningClasses.push(parentData);

            } else {
            }
            this.loading = false; // Sembunyikan spinner
          });
        });
      } else {
        this.loading = false; // Sembunyikan spinner
      }
    });
  }


  // Fungsi toggle untuk expand/collapse child
  toggleExpand(parent: any) {
    parent.expanded = !parent.expanded;
  }

  async confirmDelete(parentId: string) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this parent and all its children?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // console.log('Delete canceled');
            this.showToast('Data batal dihapus!', 'warning');
          },
        },
        {
          text: 'Yes',
          handler: async () => {
            await this.deleteParentAndChildren(parentId);
          },
        },
      ],
    });

    await alert.present();
  }

  // Fungsi untuk menghapus parent dan semua child yang terkait
  async deleteParentAndChildren(parentId: string) {
    const db = getDatabase();

    try {
      // Query untuk mendapatkan semua child yang sesuai dengan parentId
      const presenceRef = ref(db, 'presence');
      const presenceQuery = query(presenceRef, orderByChild('parentId'), equalTo(parentId));

      const snapshot = await get(presenceQuery);

      if (snapshot.exists()) {
        // Hapus semua child yang ditemukan
        const promises: Promise<void>[] = [];
        snapshot.forEach((childSnapshot) => {
          const childRef = ref(db, `presence/${childSnapshot.key}`);
          promises.push(remove(childRef)); // Hapus setiap child
        });

        await Promise.all(promises);
        // console.log('Child data dihapus.');
        // console.log('Children to delete:', snapshot.val());
      } else {
        // console.log('No children found for parentId:', parentId);
      }

      // Hapus data parent dari 'running-class'
      const runningClassRef = ref(db, `running-class/${parentId}`);
      await remove(runningClassRef);
      // console.log('Parent data dihapus.');
      this.showToast('Data dihapus!');
      this.fetchRunningClasses();
    } catch (error) {
      // console.error('Gagal menghapus data:', error);
      this.showToast('Gagal menghapus data:' + String(error), 'danger');
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

  navigateToDetail(parent: any) {
    this.router.navigate(['/detail-running-class'], {
      queryParams: {
        parentId: parent.parentId, // Menggunakan localId dari parent
        selectedItem: parent.selectedItem // Mengirim data selectedItem jika diperlukan
      },
    });
  }

  navigateToEdit(parent: any) {
    // Navigasi ke halaman running-class dengan mengirimkan localId
    this.router.navigate(['/update-running-class'], {
      queryParams: {
        parentId: parent.parentId,
        userId: parent.userId,
        selectedItem: parent.selectedItem,
        tempat: parent.tempat,
        guru: parent.guru,
        tanggal: parent.tanggal,
        keterangan: parent.keterangan
      }
    });
  }

}
