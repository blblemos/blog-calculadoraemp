import firebaseConfig from "../config/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  addDoc,
  setDoc ,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  updateMetadata  
} from "firebase/storage";
const db = getFirestore(firebaseConfig);
const get = async (userCollectionRef) => {
  const data = await getDocs(userCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};
//Recebe uma uma tabela e retorna todos os valores dela
export function getAll(colecao) {
  const userCollectionRef = collection(db, colecao);
  return get(userCollectionRef);
}
//Busca elemento pelo id, recebedo a tabela de busca e o id
export async function getById(table, id) {
  const docRef = doc(db, table, id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}
//Valida se o usuário ou email ja existem
export async function validateUser(username, Email) {
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
export async function newUser(userName, email, password, img) {
  var logNewUser = null;
  const auth = getAuth();
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (data) => {
      let uid = data.user.uid;
      let id = data.user.uid;
      const userCollectionRef = collection(db, "user");
      await setDoc(doc(db, "user", id), {
        userName,
        img,
        uid,
      });
      alert("Usuário Cadastrado");
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/weak-password") {
        logNewUser = "A senha deve possuir no mínimo 6 dígitos";
      } else if (errorCode === "auth/email-already-in-use") {
        logNewUser = "Usuário ja cadastrado";
      } else {
        logNewUser = errorCode;
      }
    });

  return logNewUser;
}
//Login user
export async function login(email, password) {
  const auth = getAuth();
  var logLogin = { log: false, content: "" };
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const token = userCredential.user.accessToken;
      logLogin.content = token;
      logLogin.log = true;
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/user-not-found") {
        logLogin.content = "Usuário não cadastrado";
      } else if (errorCode === "auth/wrong-password") {
        logLogin.content = "Senha Incorreta";
      }
    });
  return logLogin;
}
//Login user
export async function logout() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      alert("Sessão encerrada!");
      window.location.reload(false);
    })
    .catch((error) => {
      alert("Não foi possível deslogar");
    });
  return auth.currentUser;
}
//Retornar Dados Usuário
export async function getUser() {
  const auth = getAuth();
  const user = auth.currentUser;
  var userDate = {};
  if (user !== null) {
    let userInfo = await search("user", "uid", user.uid);
    userDate = {
      displayName: userInfo[0].userName,
      email: user.email,
      photoURL: userInfo[0].img,
      uid: user.uid,
    };
  }
  return userDate;
}
//Cadastrando novo post
export async function newPost(date, desc, file, title, uid, cat) {
  const userCollectionRef = collection(db, "posts");
  var res = false;
  var img = '';
  try{
    img = await uploadImg(file, title);
  }catch{
    alert("Erro no Upload da Imagem");
  }
  if (img !== '') {
    try {
      addDoc(userCollectionRef, {
        date,
        desc,
        img,
        title,
        uid,
        cat,
      });
      alert("Post publicado");
      res = true;
    } catch (err) {
      alert("Não foi possível publicar!");
    }
  }
  return res;
}
//Editar post
export async function editPost( desc, img, title, uid, cat, idPost){
  const userCollectionRef = doc(db, "posts", idPost);
  var res = false;
  try {
    await updateDoc(userCollectionRef, {
      desc,
      img,
      title,
      uid,
      cat,
    });
    alert("Post Editado");
    res = true;
  } catch (err) {
    alert("Não foi possível Editar!");
  }
  return res;
}
//Upload IMG
export async function uploadImg(file, name){
  const storage = getStorage();
  const storageRef = ref(storage, `/files/${name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  var urlImg = null;
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      switch (snapshot.state) {
        case "paused":
          alert("Não foi possivel enviar imagem, tente novamente!");
          break;
      }
    },
    (error) => {
      switch (error.code) {
        case "storage/unauthorized":
          alert("User doesn't have permission to access the object");
          break;
        case "storage/canceled":
          alert("User canceled the upload");
          break;
        case "storage/unknown":
          alert("Unknown error occurred, inspect error.serverResponse");
          break;
      }
    }
  );
  await Promise.resolve(uploadTask);
  await getDownloadURL(uploadTask.snapshot.ref).then( (downloadURL) => {
    urlImg = downloadURL;
  });

  return urlImg;
}
//Deletar IMG
export async function deleteImg(img){
  const storage = getStorage();
  const desertRef = ref(storage, img);
  deleteObject(desertRef).then(() => {
    console.log("File deleted successfully");
  }).catch((error) => {
    console.log("Uh-oh, an error occurred!");
  });
}
//Buscar por elemento
export async function search(table, element, argument) {
  const item = query(collection(db, table), where(element, "==", argument));
  const querySnapshotItem = await getDocs(item);
  var data = [];
  querySnapshotItem.forEach((doc) => {
    const id = doc.id;
    data.push({ ...doc.data(), id });
  });
  return data;
}
//retornar dados usuário
export async function searchUser() {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(auth);
  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;

    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    const uid = user.uid;
  }
}
//delete item
export async function deleteInfo(table, id) {
  const docRef = doc(db, table, id);
  var ret;
  await deleteDoc(docRef)
    .then(() => {
      ret = true;
    })
    .catch((error) => {
      ret = false;
    });
  return ret;
}
