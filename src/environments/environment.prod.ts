// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyDVrUS0obDI_I7CHC7dlqQ3xCP6FUQaV1E",
    authDomain: "joybow-project.firebaseapp.com",
    databaseURL: "https://joybow-project-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "joybow-project",
    storageBucket: "joybow-project.firebasestorage.app",
    messagingSenderId: "540077290418",
    appId: "1:540077290418:web:3d4ede1040ae501e2faaab",
    measurementId: "G-H7EBR8VMZ9"
  },
};

const app = initializeApp(environment.firebase);
const db = getDatabase(app);
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
