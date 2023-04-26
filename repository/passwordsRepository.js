import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const savePassword = async (userId, website, email, password) => {
    try {
        await addDoc(collection(db, 'passwords'), {
            uid: userId,
            website: website,
            email: email,
            password: password,
            createdOn: new Date(),
            updatedOn: new Date(),
        });

        return { success: true, message: 'Saved Password' };
    } catch (error) {
        throw error;
    }
}

export const updatePassword = async (passwordId, website, email, password) => {
    try {
        await updateDoc(doc(db, 'passwords', passwordId), {
            website: website,
            email: email,
            password: password,
            updatedOn: new Date(),
        });

        return { success: true, message: 'Updated Password' };
    } catch (error) {
        throw error;
    }
}

export const deletePassword = async (passwordId) => {
    try {
        const response = await deleteDoc(doc(db, 'passwords', passwordId));

        return { success: true, message: 'Deleted Password', response: response };
    } catch (error) {
        throw error;
    }
}

export const fetchUserPasswords = async (userId) => {
    try {
        const q = query(collection(db, 'passwords'), where('uid', '==', userId));
        const querySnapshot = await getDocs(q);
        let passwords = [];

        querySnapshot.forEach((doc) => {
            passwords.push({ key: doc.id, ...doc.data(), showPassword: false });
        });

        return { success: true, message: 'Fetched Passwords', data: passwords };
    } catch (error) {
        throw error;
    }
}
