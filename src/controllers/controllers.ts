import app from '../config/firebase'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, getFirestore, addDoc } from "firebase/firestore";

const auth = getAuth(app)
const db = getFirestore(app);

const signup = async (name: string, email: string, password: string) => {
	try {
		const response = await createUserWithEmailAndPassword(auth, email, password);
		console.log('response : ', response);

		const user = response.user;
		await addDoc(collection(db, 'user'), {
			uid: user.uid,
			name,
			authProvider: 'local',
			email,
		})
	} catch (error: any) {
		console.log('Error from signup : ', error);
		if (error.code === 'auth/email-already-in-use') {
			throw new Error("This email is already registered. Please use the Sign In option.");
		} else {
			throw new Error("An error occurred during signup.");
		}
	}
}

const login = async (email: string, password: string) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (error: any) {
		console.log('Error from login : ', error);
		if (error.code === 'auth/invalid-credential') {
			throw new Error("Invalid credentials. Please check your input and try again.");
		} else {
			throw new Error("An error occurred during login.");
		}
	}
}

const logout = async () => {
	try {
		await signOut(auth);
	} catch (error) {
		console.log('error from logout');
		alert(error)
	}
}

export { auth, db, login, signup, logout }