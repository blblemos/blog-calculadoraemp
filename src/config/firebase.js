import { initializeApp } from "firebase/app";

const firebaseConfig = initializeApp({
  apiKey: process.env.REACT_APP_APIKEY,
  projectId: process.env.REACT_APP_PROJECTID,
});

export default firebaseConfig;