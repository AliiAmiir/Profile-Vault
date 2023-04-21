import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const saveRelative = async (userId, name, relation, dateOfBirth) => {
    try {
        await addDoc(collection(db, 'relatives'), {
            uid: userId,
            name: name,
            relation: relation,
            dateOfBirth: dateOfBirth,
            createdOn: new Date(),
            updatedOn: new Date(),
        });

        return { success: true, message: 'Saved Relative' };
    } catch (error) {
        throw error;
    }
}

export const updateRelative = async (userId, relativeId, name, relation, dateOfBirth) => {
    try {
        await updateDoc(doc(db, 'relatives', relativeId), {
            name: name,
            relation: relation,
            dateOfBirth: dateOfBirth,
            updatedOn: new Date(),
        });

        return { success: true, message: 'Updated Relative' };
    } catch (error) {
        throw error;
    }
}

export const deleteRelative = async (relativeId) => {
    try {
        await deleteDoc(doc(db, 'relatives', relativeId));

        return { success: true, message: 'Deleted Relative' };
    } catch (error) {
        throw error;
    }
}

export const fetchUserRelatives = async (userId) => {
    try {
        const q = query(collection(db, 'relatives'), where('uid', '==', userId));
        const querySnapshot = await getDocs(q);
        let relatives = [];

        querySnapshot.forEach((doc) => {
            let dateOfBirth = doc.data().dateOfBirth.toDate();
            relatives.push({ key: doc.id, ...doc.data(), dateOfBirth, showDatePicker: false });
        });

        return { success: true, message: 'Fetched Relatives', data: relatives };
    } catch (error) {
        throw error;
    }
}
