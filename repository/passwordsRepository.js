import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const savePassword = async (userId, website, email, password) => {
    try {
        const response = await addDoc(collection(db, 'passwords'), {
            uid: userId,
            website: website,
            email: email,
            password: password,
        });

        return { success: true, message: 'Saved Password', response: response };
    } catch (error) {
        return { success: false, message: error.message, response: error };
    }
}

export const updatePassword = async (userId, passwordId, website, email, password, notes) => {
    try {
        const response = await updateDoc(doc(db, 'passwords', passwordId), {
            website: website,
            email: email,
            password: password,
        });

        return { success: true, message: 'Updated Password', response: response };
    } catch (error) {
        return { success: false, message: error.message, response: error };
    }
}

export const deletePassword = async (passwordId) => {
    try {
        const response = await deleteDoc(doc(db, 'passwords', passwordId));

        return { success: true, message: 'Deleted Password', response: response };
    } catch (error) {
        return { success: false, message: error.message, response: error };
    }
}

export const fetchUserPasswords = async (userId) => {
    try {
        const q = query(collection(db, 'passwords'), where('uid', '==', userId));
        const querySnapshot = await getDocs(q);
        let passwords = [];

        querySnapshot.forEach((doc) => {
            passwords.push({ key: doc.id, ...doc.data() });
        });

        return { success: true, message: 'Fetched Passwords', data: passwords };
    } catch (error) {
        return { success: false, message: error.message, error: error };
    }
}
