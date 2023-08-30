import { db } from "../configuration/firebase";
import {
  doc,
  setDoc,
  updateDoc,
  arrayRemove,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

// Store user data in Firestore with an empty favorites array
export const storeUserDataInFirestore = async (uid, data) => {
  const userRef = doc(db, "users", uid);
  const userDataWithFavorites = {
    ...data,
    favorites: [],
    points: 0,
  };
  await setDoc(userRef, userDataWithFavorites);
};

// Get user data from Firestore
export const getUserDataFromFirestore = async (uid) => {
  const userRef = doc(db, "users", uid);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    const userData = userDoc.data();
    return {
      name: userData.name,
      email: userData.email,
      billingDetails: userData.billingDetails || {},
      shippingDetails: userData.shippingDetails || {},
      paymentDetails: userData.paymentDetails || {},
      points: userData.points,
    };
  } else {
    console.log("No such document!");
    return null;
  }
};

// Store a favorite item for a user in Firestore
export const storeFavoriteForUser = async (uid, item, index = null) => {
  const userRef = doc(db, "users", uid);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const userData = userDoc.data();
    const existingFavorites = userData.favorites || [];

    // Update the userData with potentially new index
    const updatedUserData =
      index !== null ? { ...userData, lastSwipedIndex: index } : userData;

    if (item) {
      const itemExists = existingFavorites.some(
        (favorite) => favorite.id === item.id
      );

      if (!itemExists) {
        const updatedFavorites = [...existingFavorites, item];
        await setDoc(
          userRef,
          { ...updatedUserData, favorites: updatedFavorites },
          { merge: true }
        );
      } else {
        console.log("Item already exists in favorites!");
      }
    } else if (index !== null) {
      // If only index is updated, without any new favorite item
      await setDoc(userRef, updatedUserData, { merge: true });
    }
  } else {
    console.log("User document doesn't exist!");
  }
};

export const getLastSwipedIndexForUser = async (uid) => {
  const userRef = doc(db, "users", uid);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const userData = userDoc.data();
    return userData.lastSwipedIndex || 0;
  } else {
    console.log("User document doesn't exist!");
    return 0;
  }
};

// Delete a favorite item for a user in Firestore
export const deleteFavoriteForUser = async (uid, item) => {
  const userRef = doc(db, "users", uid);

  // Use the arrayRemove method to remove the item from the favorites array
  await updateDoc(userRef, {
    favorites: arrayRemove(item),
  });
};

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
};

// Store user billing details in Firestore
export const storeUserBillingDetailsInFirestore = async (uid, billingData) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    billingDetails: billingData,
  });
};

export const storeUserShippingDetailsInFirestore = async (
  uid,
  shippingData
) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    shippingDetails: shippingData,
  });
};

export const storeUserPaymentDetailsInFirestore = async (uid, paymentData) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    paymentDetails: paymentData,
  });
};

// export const syncFavoritesAndPurchases = async (uid, purchasedItemIds = []) => {
//   try {
//     // Log to debug
//     console.log("UID:", uid);
//     console.log("Purchased Item Ids:", purchasedItemIds);

//     // Fetch the current favorite items for the user
//     const currentFavorites = await getFavoritesForUser(uid);
//     console.log("Current Favorites:", currentFavorites);

//     // Identify which favorite items have been purchased
//     const itemsToRemove = currentFavorites.filter((item) =>
//       purchasedItemIds.includes(item.id)
//     );

//     // Remove purchased items from the user's favorites
//     if (itemsToRemove.length > 0) {
//       for (const item of itemsToRemove) {
//         await deleteFavoriteForUser(uid, item);
//       }
//     }

//     console.log("Successfully synchronized favorites and purchases.");
//   } catch (error) {
//     console.error("Error synchronizing favorites and purchases:", error);
//   }
// };

export const storeOrderDetailsInFirestore = async (uid, orderData) => {
  console.log("Received UID:", uid); // Debug log
  console.log("Received Order Data:", JSON.stringify(orderData)); // Debug log

  if (!uid) {
    console.error("Error saving order: UID is undefined");
    return;
  }

  if (!orderData) {
    console.error("Error saving order: orderData is undefined");
    return;
  }

  const userRef = doc(db, "users", uid);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const userData = userDoc.data();

    if (!userData) {
      console.error("Error saving order: userData is undefined");
      return;
    }

    let existingOrders = userData.orderDetails || [];
    let existingPurchasedItemIds = userData.purchasedItemIds || [];

    const newItemIds = orderData.purchasedItemIds || []; // <-- Notice the change here
    if (newItemIds.length === 0) {
      console.error(
        "Error saving order: purchasedItemIds is empty or undefined"
      );
      return;
    }

    const updatedOrders = [...existingOrders, orderData];
    const updatedPurchasedItemIds = [
      ...existingPurchasedItemIds,
      ...newItemIds,
    ];

    await updateDoc(userRef, {
      orderDetails: updatedOrders,
      purchasedItemIds: updatedPurchasedItemIds,
    });

    console.log(
      `Order saved successfully with order number: ${orderData.orderNumber}`
    );
  } else {
    console.log("User document doesn't exist!");
  }
};

// Fetch all purchased items for a user from Firestore
export const getPurchasedItemIdsForUser = async (uid) => {
  const userRef = doc(db, "users", uid);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const userData = userDoc.data();
    return userData.purchasedItemIds || [];
  } else {
    console.log("User document doesn't exist!");
    return [];
  }
};

export const updatePointsInFirestore = async (uid, pointsToAdd) => {
  const userRef = doc(db, "users", uid);

  // Get the current points value
  const userDoc = await getDoc(userRef);
  if (!userDoc.exists()) {
    console.log("No such user!");
    return;
  }
  const currentPoints = userDoc.data().points || 0;

  const updatedPoints = currentPoints + pointsToAdd;
  await updateDoc(userRef, { points: updatedPoints });
};
// // Helper function to split category names into individual words
// const splitCategoryIntoKeywords = (category) => {
//     return category.split(' ').concat([category]);
// }

// // Store product data in Firestore with searchable keywords
// export const storeProductDataInFirestore = async (productId, data) => {
//     const productRef = doc(db, "products", productId);

//     // Start with the product name split into individual words
//     let searchKeywords = data.name.split(' ');

//     // Add major and subcategories if they exist
//     if (data.majorCategory) {
//         searchKeywords.push(data.majorCategory, ...splitCategoryIntoKeywords(data.majorCategory));
//     }

//     if (data.subCategory) {
//         searchKeywords.push(data.subCategory, ...splitCategoryIntoKeywords(data.subCategory));
//     }

//     // Remove duplicates (if any)
//     searchKeywords = Array.from(new Set(searchKeywords));

//     const productDataWithKeywords = {
//         ...data,
//         search_keywords: searchKeywords
//     };

//     await setDoc(productRef, productDataWithKeywords);
// }

// // Fetch suggestions from Firestore based on user input
// export const fetchSearchSuggestions = async (userInput) => {
//     // Create a Firestore query
//     const q = query(
//       collection(db, "products"),
//       where("search_keywords", "array-contains-any", userInput.split(' '))
//     );

//     // Execute the query
//     const querySnapshot = await getDocs(q);
//     const suggestions = [];

//     // Collect product names from the query result
//     querySnapshot.forEach((doc) => {
//       suggestions.push(doc.data().name); // Assuming the product name would be the suggestion
//     });

//     // Return the suggestions
//     return suggestions;
//   };

// Fetch all order details for a user from Firestore
export const getOrderDetailsForUser = async (uid) => {
  const userRef = doc(db, "users", uid);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const userData = userDoc.data();
    return userData.orderDetails || [];
  } else {
    console.log("User document doesn't exist!");
    return [];
  }
};


// Clear all favorite items for a user in Firestore
export const clearFavoritesForUser = async (uid) => {
  const userRef = doc(db, "users", uid);

  // Set the favorites array to an empty array
  await updateDoc(userRef, {
    favorites: [],
  });
};
