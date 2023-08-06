import { db } from '../configuration/firebase';
import { doc, setDoc } from 'firebase/firestore';

export const storeUserDataInFirestore = async (uid, data) => {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, data);
}
