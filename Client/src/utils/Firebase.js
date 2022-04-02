import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail 
} from "firebase/auth";

export const config = {
    apiKey: "AIzaSyC-xkI4NJ7gLCnKxPY9BbZyGc_lDQjsWIQ",
    authDomain: "carreradementes-93f01.firebaseapp.com",
    projectId: "carreradementes-93f01",
    storageBucket: "carreradementes-93f01.appspot.com",
    messagingSenderId: "733820779742",
    appId: "1:733820779742:web:24e687853076fa364d564f"
};

export async function firebaseRegistrarUsuario(email, password){
    try {
        const auth = getAuth();
        const registrar = await createUserWithEmailAndPassword(auth, email, password)
        return registrar.user;
    } catch (error) {
        return 'Intente nuevamente'
    }        
}

export async function firebaseLogin(email, password){
    try {
        const auth = getAuth();
        const login = await signInWithEmailAndPassword(auth, email, password)
        return login.user
    } catch (error) {
        return 'Usuario o contraseña incorrecto'
    }
}

export async function firebaseLoginGoogle(){
    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        const signIn = await signInWithPopup(auth, provider)
        const credential = GoogleAuthProvider.credentialFromResult(signIn);
        return signIn.user
    } catch (error) {
        return 'No se pudo iniciar sesión'
    }   
}

export async function firebaseLoginFacebook(){
    try {
        const provider = new FacebookAuthProvider();
        const auth = getAuth();
        const signIn = await signInWithPopup(auth, provider)
        const credential = FacebookAuthProvider.credentialFromResult(signIn);
        return signIn.user
    } catch (error) {
        return 'No se pudo iniciar sesión'
    }   
}

export async function firebaseCerrarSesion(){
    try {
        const auth = getAuth();
        const sesion = await auth.signOut()    
        return sesion
    } catch (error) {
        console.log(error)
    }
}

export async function firebaseRecuperarContrasena(email){
    const actionCodeSettings = {
        url: 'http://localhost:3000/login'
      };      
    try {
        const auth = getAuth();
        const recuperar = await sendPasswordResetEmail(auth, email, actionCodeSettings)
        return recuperar
    } catch (error) {
        return 'No se pudo recuperar la contraseña'
    }
}