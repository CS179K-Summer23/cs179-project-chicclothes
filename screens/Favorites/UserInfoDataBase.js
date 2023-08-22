import { useState, useEffect } from 'react';
import { auth } from "../../configuration/firebase";
import { getUserDataFromFirestore } from "../../hook/databaseQueries";

const useUser = (refreshKey) => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [billingDetails, setBillingDetails] = useState({
        name: '',
        address: '',
        company: '',
        addressLine2: '',
        city: '',
        zipcode: '',
        state: '',
    });
    const [shippingDetails, setShippingDetails] = useState({
        name: '',
        address: '',
        company: '',
        addressLine2: '',
        city: '',
        zipcode: '',
        state: '',
    });
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        nameOnCard: '',
        expiry: '',
        ccv: '',
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
                    if (userData.shippingDetails) {
                        setShippingDetails(userData.shippingDetails);
                    }
                    if (userData.paymentDetails) {
                        setPaymentDetails(userData.paymentDetails);
                    }
                }
            }
            fetchUserData();
        }
    }, [refreshKey]); // Added refreshKey to the dependency array

    return { userName, userEmail, billingDetails, shippingDetails, paymentDetails };
}

export default useUser;
