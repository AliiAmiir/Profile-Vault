import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const saveSignificant = async (userId, significantName, significantRelation, significantDateOfBirth, significantAnniversary) => {
    try {
        await addDoc(collection(db, 'significants'), {
            uid: userId,
            name: significantName,
            relation: significantRelation,
            dateOfBirth: significantDateOfBirth,
            anniversary: significantAnniversary,
            createdOn: new Date(),
            updatedOn: new Date(),
        });

        return { success: true, message: 'Saved Significant' };
    } catch (error) {
        throw error;
    }
}

export const updateSignificant = async (significantId, significantName, significantRelation, significantDateOfBirth, significantAnniversary) => {
    try {
        await updateDoc(doc(db, 'significants', significantId), {
            name: significantName,
            relation: significantRelation,
            dateOfBirth: significantDateOfBirth,
            anniversary: significantAnniversary,
            updatedOn: new Date(),
        });

        return { success: true, message: 'Updated Significant' };
    } catch (error) {
        throw error;
    }
}

export const deleteSignificant = async (significantId) => {
    try {
        await deleteDoc(doc(db, 'significants', significantId));

        return { success: true, message: 'Deleted Significant' };
    } catch (error) {
        throw error;
    }
}

export const fetchUserSignificants = async (userId) => {
    try {
        const q = query(collection(db, 'significants'), where('uid', '==', userId));
        const querySnapshot = await getDocs(q);
        let significants = [];

        querySnapshot.forEach((doc) => {
            let dateOfBirth = doc.data().dateOfBirth.toDate();
            let anniversary = doc.data().anniversary.toDate();
            significants.push({ key: doc.id, ...doc.data(), dateOfBirth, anniversary, showDatePicker: false, showDatePickerAnniversary: false });
        });

        return { success: true, message: 'Fetched Significants', data: significants };
    } catch (error) {
        throw error;
    }
}
