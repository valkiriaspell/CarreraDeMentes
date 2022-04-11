import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification
} from "firebase/auth";
import Swal from "sweetalert2";

export const config = {
  apiKey: "AIzaSyC-xkI4NJ7gLCnKxPY9BbZyGc_lDQjsWIQ",
  authDomain: "carreradementes-93f01.firebaseapp.com",
  projectId: "carreradementes-93f01",
  storageBucket: "carreradementes-93f01.appspot.com",
  messagingSenderId: "733820779742",
  appId: "1:733820779742:web:24e687853076fa364d564f",
};

export async function firebaseRegistrarUsuario(email, password) {
  try {
    const auth = getAuth();
    const registrar = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return registrar.user;
  } catch (error) { 
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ya hay alguien registrado con este email",
        heightAuto: false,
      });
  }
}

export async function firebaseLogin(email, password) {
  try {
    const auth = getAuth();
    const login = await signInWithEmailAndPassword(auth, email, password);
    return login.user;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Usuario o contraseña incorrectos",
      heightAuto: false,
    });
  }
}

export async function firebaseLoginGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const signIn = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(signIn);
    return signIn.user;
  } catch (error) {
    return Swal.fire({
      title: "No se pudo iniciar sesión",
      icon: "warning",
      confirmButtonText: "OK",
      heightAuto: false,
      backdrop: `
                    rgba(0,0,123,0.4)
                    left top
                    no-repeat
                  `,
    });
  }
}

export async function firebaseLoginFacebook() {
  try {
    const provider = new FacebookAuthProvider();
    const auth = getAuth();
    const signIn = await signInWithPopup(auth, provider);
    const credential = FacebookAuthProvider.credentialFromResult(signIn);
    return signIn.user;
  } catch (error) {
    return Swal.fire({
      title: "No se pudo iniciar sesión",
      icon: "warning",
      confirmButtonText: "OK",
      heightAuto: false,
      backdrop: `
                    rgba(0,0,123,0.4)
                    left top
                    no-repeat
                  `,
    });
  }
}

export async function firebaseCerrarSesion() {
  try {
    const auth = getAuth();
    const sesion = await auth.signOut();
    return sesion;
  } catch (error) {
    console.log(error);
  }
}

export async function firebaseRecuperarContrasena(email) {
  const actionCodeSettings = {
    url: "http://localhost:3000/login",
  };
  try {
    const auth = getAuth();
    const recuperar = await sendPasswordResetEmail(
      auth,
      email,
      actionCodeSettings
    );
    return recuperar;
  } catch (error) {
    return Swal.fire({
      title: "No se pudo recuperar la contraseña",
      icon: "warning",
      confirmButtonText: "OK",
      heightAuto: false,
      backdrop: `
                    rgba(0,0,123,0.4)
                    left top
                    no-repeat
                  `,
    });
  }
}

export async function firebaseVerificarUsuario(usuario){
  try {
    const actionCodeSettings = {
      url: "http://localhost:3000/login",
    };
    const auth = getAuth();
    const test = await sendEmailVerification(usuario, actionCodeSettings)
    return 
  } catch (error) {
    console.log(error)
  }
}
