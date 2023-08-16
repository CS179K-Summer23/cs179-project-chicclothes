import { db } from '../configuration/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { getDoc } from 'firebase/firestore';


export const storeUserDataInFirestore = async (uid, data) => {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, data);
}

export const getUserDataFromFirestore = async (uid) => {
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData.name; // Return only the name
    } else {
        console.log("No such document!");
        return null;
    }
}
