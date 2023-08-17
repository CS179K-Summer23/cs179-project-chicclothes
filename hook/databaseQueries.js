import { db } from '../configuration/firebase';
import { doc, setDoc, collection, addDoc, deleteDoc, getDocs } from 'firebase/firestore';

// Store user data in Firestore
export const storeUserDataInFirestore = async (uid, data) => {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, data);
}

// Get user data from Firestore
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

// Store a favorite item for a user in Firestore
export const storeFavoriteForUser = async (uid, item) => {
    const userFavoritesCollection = collection(db, "users", uid, "favorites");
    await addDoc(userFavoritesCollection, item);
}

// Delete a favorite item for a user in Firestore
export const deleteFavoriteForUser = async (uid, favoriteDocId) => {
    const favoriteDocRef = doc(db, "users", uid, "favorites", favoriteDocId);
    await deleteDoc(favoriteDocRef);
}

// Fetch all favorite items for a user from Firestore
export const getFavoritesForUser = async (uid) => {
    const userFavoritesCollection = collection(db, "users", uid, "favorites");
    const favoritesSnapshot = await getDocs(userFavoritesCollection);
    const favorites = [];
    favoritesSnapshot.forEach(doc => {
        const favoriteData = doc.data();
        favoriteData.firestoreId = doc.id; // Store the Firestore document ID
        favorites.push(favoriteData);
    });
    return favorites;
}
