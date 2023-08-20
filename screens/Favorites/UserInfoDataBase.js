import { useState, useEffect } from 'react';
import { auth } from "../../configuration/firebase";
import { getUserDataFromFirestore } from "../../hook/databaseQueries";

const useUser = () => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [billingDetails, setBillingDetails] = useState({
        name: '',
        address: '',
        city: '',
        zipcode: '',
        state: '', // Added state as you mentioned it earlier
        // Add any other fields if necessary
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
                    setBillingDetails({
                        name: userData.name, // Assuming the name for billing is the same as the user's name
                        address: userData.address || '',
                        city: userData.city || '',
                        zipcode: userData.zipcode || '',
                        state: userData.state || '',
                        // Populate other fields if necessary
                    });
                }
            }
            fetchUserData();
        }
    }, []);

    return { userName, userEmail, billingDetails };
}

export default useUser;
