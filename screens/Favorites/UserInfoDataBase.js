import { useState, useEffect } from 'react';
import { auth } from "../../configuration/firebase";
import { getUserDataFromFirestore } from "../../hook/databaseQueries";

const useUser = () => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const currentUser = auth.currentUser;
        const uid = currentUser ? currentUser.uid : null;

        if (uid) {
            const fetchUserData = async () => {
                const userData = await getUserDataFromFirestore(uid);
                if (userData) {
                    setUserName(userData.name);
                    setUserEmail(userData.email);
                }
            }
            fetchUserData();
        }
    }, []);

    return { userName, userEmail };
}

export default useUser;
