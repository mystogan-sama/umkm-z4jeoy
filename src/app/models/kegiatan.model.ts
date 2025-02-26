export interface Kegiatan {
    id: string;
    nama: string;
    tasks?: any[]; // Sesuaikan dengan struktur data dari Firebase
  }
  
  interface UserData {
    nama: string;
    tasks: { [key: string]: any }; // Replace 'any' with the actual type of tasks if needed
  }
  
  interface FirebaseData {
    [key: string]: UserData[]; // Data is an object with keys (IDs) pointing to arrays of UserData
  }
  