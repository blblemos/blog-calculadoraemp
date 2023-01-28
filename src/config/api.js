import firebaseConfig from "../config/firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile   } from "firebase/auth";
import { getFirestore, collection, getDocs, getDoc , doc, query, where, addDoc} from "firebase/firestore";
const db = getFirestore(firebaseConfig);
const get = async (userCollectionRef) => {
  const data = await getDocs(userCollectionRef);
  return(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
};
//Recebe uma uma tabela e retorna todos os valores dela
export function getAll(colecao){
  const userCollectionRef = collection(db, colecao);
  return(get(userCollectionRef));
}
//Busca elemento pelo id, recebedo a tabela de busca e o id
export async function getById(table, id){
  const docRef = doc(db, table, id);
  const docSnap = await getDoc(docRef);
  console.log(docSnap.data());
}
//Valida se o usuário ou email ja existem
export async function validateUser(username, Email){
  var verify = false;
  const user = query(collection(db, "user"), where("username", "==", username));
  const email = query(collection(db, "user"), where("email", "==", Email));
  const querySnapshotUser = await getDocs(user);
  const querySnapshotEmail = await getDocs(email);
  querySnapshotUser.forEach(() => {
    verify = true; 
  });
  querySnapshotEmail.forEach(() => {
    verify = true;
  });
  return verify;
}
//Cadastrando novo usuário
export async function newUser(username,email,password,img){
  var logNewUser = null;
  const auth = getAuth();
  await createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Usuário Cadastrado");
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode == "auth/weak-password") {
        logNewUser = "A senha deve possuir no mínimo 6 dígitos";
      }else if(errorCode == "auth/email-already-in-use"){
        logNewUser = "Usuário ja cadastrado";
      }else{
        logNewUser = errorCode;
      }
    });
  
  await updateProfile(auth.currentUser, {
    displayName: username,
    photoURL: img
  }).then(() => {
  }).catch((error) => {
  });
  
  return logNewUser; 
}
//Login user
export async function login(email, password){
  const auth = getAuth();
  var logLogin = {log: false, content:''}; 
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const token = userCredential.user.accessToken;
      logLogin.content= token;
      logLogin.log = true;
    })
    .catch((error) => {
      const errorCode = error.code; 
      if (errorCode == "auth/user-not-found") {
        logLogin.content= 'Usuário não cadastrado';
      }else if (errorCode == "auth/wrong-password"){
        logLogin.content= 'Senha Incorreta';
      }
    });

    /*const user = auth.currentUser;
    if (user !== null) {
      const displayName = user.displayName; console.log(user);
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;
      const uid = user.uid;
    }*/

  return logLogin;
}
//Cadastrando novo usuário
export async function newPost(date,desc,img,title, uid) {
  const userCollectionRef = collection(db, 'posts');
  await addDoc(userCollectionRef, {
    date,
    desc,
    img,
    title,
    uid
  });  
  return 'Post publicado'; 
  
};