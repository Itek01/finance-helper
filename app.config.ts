import 'dotenv/config';
import { app } from './client/src/configuration/firebaseConfig';

export default {
  expo: {
    name: "mobile",
    slug: "mobile",
    version: "1.0.0",
    extra: {
      firebaseConfig: {
        apiKey: app.apiKey,          // ✅ This will still inject into the final build
        authDomain: app.FIREBASE_AUTH_DOMAIN,
        projectId: app.FIREBASE_PROJECT_ID,
        storageBucket: app.FIREBASE_STORAGE_BUCKET,
        messagingSenderId:  app.FIREBASE_MESSAGING_SENDER_ID,
        appId: app.FIREBASE_APP_ID,
      },
    }
  }
};