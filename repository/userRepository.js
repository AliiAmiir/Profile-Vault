import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/FirebaseConfig';

export const fetchUserById = async (userId) => {
    try {
    const q = query(collection(db, 'users'), where('uid', '==', userId));

    const querySnapshot = await getDocs(q);

    if(querySnapshot.docs.length > 0 && querySnapshot.docs[0].data()) {
        return querySnapshot.docs[0].data();
    }

    return null;
    } catch (error) {
        console.log(error);
    }
};