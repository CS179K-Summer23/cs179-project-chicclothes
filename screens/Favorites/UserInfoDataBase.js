import { useState, useEffect } from 'react';
import { auth } from "../../configuration/firebase";
import { getUserDataFromFirestore } from "../../hook/databaseQueries";

const useUser = (refreshKey) => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [billingDetails, setBillingDetails] = useState({
        name: '',
        address: '',
        city: '',
        zipcode: '',
        state: '',
    });

    useEffect(() => {
        const currentUser = auth.currentUser;
        const uid = currentUser ? currentUser.uid : null;

        if (uid) {
            const fetchUserData = async () => {
                const userData = await getUserDataFromFirestore(uid);
                if (userData) {
                    setUserName(userData.name);
                    setUserEmail(userData.email);
                    if (userData.billingDetails) {
                        setBillingDetails(userData.billingDetails);
                    }
                }
            }
            fetchUserData();
        }
    }, [refreshKey]); // Added refreshKey to the dependency array

    return { userName, userEmail, billingDetails };
}

export default useUser;
