import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';


@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
    private auth = getAuth();
  constructor(private db: AngularFireDatabase) {}

  // Menulis data
  addData(path: string, data: any) {
    return this.db.list(path).push(data);
  }

  // Membaca data secara real-time
  getData(path: string): Observable<any[]> {
    return this.db.list(path).valueChanges();
  }

  // **🔥 Tambahkan metode update data di sini**
  updateData(path: string, data: any) {
    return this.db.object(path).update(data);
  }


  async register(email: string, password: string, displayName: string) {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
      // Mengupdate displayName pengguna
      await updateProfile(userCredential.user, {
        displayName: displayName,
      });
  
      console.log('User registered with displayName:', displayName);
      return userCredential.user;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  }

  // Login pengguna
  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  // Logout pengguna
  async logout() {
    try {
      await signOut(this.auth);
      console.log('User logged out');
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  }
  
  getCurrentUser() {
    return this.auth.currentUser;
  }
}
