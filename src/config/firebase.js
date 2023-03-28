import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
const firebaseConfig = initializeApp({
  apiKey: process.env.REACT_APP_APIKEY,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,

});

export default firebaseConfig;
export const storage = getStorage();