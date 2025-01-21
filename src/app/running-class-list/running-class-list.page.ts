import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { equalTo, get, getDatabase, orderByChild, query, ref, remove } from 'firebase/database';
import { addIcons } from 'ionicons';
import { archive, heart, trash } from 'ionicons/icons';

@Component({
  selector: 'app-running-class-list',
  templateUrl: './running-class-list.page.html',
  styleUrls: ['./running-class-list.page.scss'],
})
export class RunningClassListPage implements OnInit {
  runningClasses: any[] = [];
  constructor(private router: Router, private alertController: AlertController) {
    addIcons({ archive, heart, trash });
   }

  ngOnInit() {
    this.fetchRunningClasses();
  }

  // Mengambil data running-class dan presence
  fetchRunningClasses() {
    const db = getDatabase();
    const runningClassRef = ref(db, 'running-class');
    const presenceRef = ref(db, 'presence');

    get(runningClassRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.runningClasses = [];
          snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            const parentId = childSnapshot.key;

            // Tambahkan property expanded untuk toggle child
            const parentData = { localId: parentId, expanded: false, children: [], ...data };

            // Ambil data child yang sesuai dengan parentId
            get(presenceRef).then((presenceSnapshot) => {
              if (presenceSnapshot.exists()) {
                presenceSnapshot.forEach((presenceChild) => {
                  const childData = presenceChild.val();
                  if (childData.parentId === parentId) {
                    parentData.children.push(childData);
                  }
                });
              }
              this.runningClasses.push(parentData);
            });
          });
        } else {
          console.log('Tidak ada data running class');
          this.runningClasses = [];
        }
      })
      .catch((error) => {
        console.error('Gagal mengambil data running class:', error);
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
            console.log('Delete canceled');
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
        console.log('Child data dihapus.');
        console.log('Children to delete:', snapshot.val());
      } else {
        console.log('No children found for parentId:', parentId);
      }

      // Hapus data parent dari 'running-class'
      const runningClassRef = ref(db, `running-class/${parentId}`);
      await remove(runningClassRef);
      console.log('Parent data dihapus.');
      this.fetchRunningClasses();
    } catch (error) {
      console.error('Gagal menghapus data:', error);
    }
  }

}
