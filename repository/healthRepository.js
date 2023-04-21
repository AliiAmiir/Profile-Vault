import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const saveHealth = async (userId, healthDetails) => {
    try {
        await addDoc(collection(db, 'health'), {
            uid: userId,
            checkUpType: healthDetails.checkUpType,
            checkUpDate: healthDetails.checkUpDate,
            medicines: healthDetails.medicines,
            createdOn: new Date(),
            updatedOn: new Date(),
        });

        return { success: true, message: 'Saved Health' };
    } catch (error) {
        throw error;
    }
}

export const updateHealth = async (healthId, healthDetails) => {
    try {
        await updateDoc(doc(db, 'health', healthId), {
            checkUpType: healthDetails.checkUpType,
            checkUpDate: healthDetails.checkUpDate,
            medicines: healthDetails.medicines,
            updatedOn: new Date(),
        });

        return { success: true, message: 'Updated Health' };
    } catch (error) {
        throw error;
    }
};


export const deleteHealth = async (healthId) => {
    try {
        await deleteDoc(doc(db, 'health', healthId));

        return { success: true, message: 'Deleted Health' };
    } catch (error) {
        throw error;
    }
}

export const fetchUserHealth = async (userId) => {
    try {
        const q = query(collection(db, 'health'), where('uid', '==', userId));
        const querySnapshot = await getDocs(q);
        let health = [];

        querySnapshot.forEach((doc) => {
            let checkUpDate = doc.data().checkUpDate.toDate();
            health.push({ key: doc.id, ...doc.data(), checkUpDate });
        });

        return { success: true, data: health };
    } catch (error) {
        throw error;
    }
}
