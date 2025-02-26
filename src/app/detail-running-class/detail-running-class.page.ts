import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { equalTo, get, getDatabase, orderByChild, query, ref } from 'firebase/database';

@Component({
  selector: 'app-detail-running-class',
  templateUrl: './detail-running-class.page.html',
  styleUrls: ['./detail-running-class.page.scss'],
})
export class DetailRunningClassPage implements OnInit {
  parentData: any = null; // Data untuk parent (running-class)
  childData: any[] = [];  // Data child (presence)
  parentId: string = '';
  selectedItem: string = ''; // Menyimpan selectedItem dari parent
  isLoading: boolean = true; // Untuk menunjukkan loading indicator
  constructor(private route: ActivatedRoute, private navController: NavController, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
    // Ambil parentId dan selectedItem dari query params
    this.route.queryParams.subscribe(params => {
      if (params['parentId']) {
        this.parentId = params['parentId'];
        console.log('Parent ID:', this.parentId);
      }
      if (params['selectedItem']) {
        this.selectedItem = params['selectedItem'];
        console.log('Selected Item:', this.selectedItem);
      }
      this.fetchParentData();
      this.fetchChildData();
    });
  }


  // Ambil data parent dari Firebase berdasarkan parentId
  fetchParentData() {
    const db = getDatabase();
    const parentRef = ref(db, 'running-class/' + this.parentId);
    // console.log('Fetching parent data with path:', parentRef);

    get(parentRef).then(snapshot => {
      if (snapshot.exists()) {
        this.parentData = snapshot.val();
        console.log('Parent data found:', this.parentData);
        this.selectedItem = this.parentData.selectedItem;
      } else {
        console.log('No parent data found for this ID');
      }
    }).catch(error => {
      console.error('Error fetching parent data:', error);
    });
  }

  // Ambil data child (presence) yang memiliki parentId yang sama
  fetchChildData() {
    const db = getDatabase();
    const childRef = ref(db, 'presence'); // Path untuk data presence

    // Query untuk mengambil data child berdasarkan parentId
    const childQuery = query(childRef, orderByChild('parentId'), equalTo(this.parentId));

    get(childQuery).then(snapshot => {
      if (snapshot.exists()) {
        this.childData = Object.values(snapshot.val()); // Ambil semua data child yang terkait
        console.log('Data child:', this.childData);
      } else {
        console.log('Data child tidak ditemukan');
      }
    }).catch(error => {
      console.error('Gagal mengambil data child:', error);
    });
  }

  onAddPresence() {
    // Navigasi ke halaman add-presence dengan mengirimkan parentId dan selectedItem
    if (!this.parentId) {
      this.showToast('Parent data tidak ditemukan!', 'danger');
      return;
    }
  
    this.router.navigate(['/add-presence'], {
      queryParams: {
        parentId: this.parentId,
        selectedItem: this.selectedItem,
      },
    });
  }

  doneButton() {
    this.router.navigate(['/tabs/running-class-list'])
    this.showToast('Data Kehadiran Selesai ditambahkan!');
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
