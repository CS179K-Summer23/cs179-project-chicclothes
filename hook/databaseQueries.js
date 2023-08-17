import { db } from '../configuration/firebase';
import { doc, setDoc, updateDoc, arrayRemove, getDoc } from 'firebase/firestore';

// Store user data in Firestore with an empty favorites array
export const storeUserDataInFirestore = async (uid, data) => {
    const userRef = doc(db, "users", uid);
    const userDataWithFavorites = {
        ...data,
        favorites: []
    };
    await setDoc(userRef, userDataWithFavorites);
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
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
        const userData = userDoc.data();
        const existingFavorites = userData.favorites || [];

        // Check if the item already exists in the favorites
        const itemExists = existingFavorites.some(favorite => favorite.id === item.id);

        if (!itemExists) {
            const updatedFavorites = [...existingFavorites, item];
            await setDoc(userRef, { ...userData, favorites: updatedFavorites }, { merge: true });
        } else {
            console.log("Item already exists in favorites!");
        }
    } else {
        console.log("User document doesn't exist!");
    }
}


// Delete a favorite item for a user in Firestore
export const deleteFavoriteForUser = async (uid, item) => {
    const userRef = doc(db, "users", uid);

    // Use the arrayRemove method to remove the item from the favorites array
    await updateDoc(userRef, {
        favorites: arrayRemove(item)
    });
}

// Fetch all favorite items for a user from Firestore
export const getFavoritesForUser = async (uid) => {
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData.favorites || [];
    } else {
        console.log("User document doesn't exist!");
        return [];
    }
}
