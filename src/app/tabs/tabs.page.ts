import { Component } from '@angular/core';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import * as firebase from 'firebase/compat';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  localId: string = '';
  constructor() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      this.localId = user.uid;
    }
  }

  ngOnInit() {
    // Misalnya, ambil localId dari Firebase Auth
    const auth = getAuth();
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        this.localId = user.uid;
      }
    });
  }

}
