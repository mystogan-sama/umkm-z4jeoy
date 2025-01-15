import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  items: any[] = [];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    // Membaca data
    this.firebaseService.getData('items').subscribe((data) => {
      this.items = data;
    });
  }

  addItem() {
    // Menulis data
    const newItem = { name: 'Item baru', createdAt: new Date() };
    this.firebaseService.addData('items', newItem);
  }
}
