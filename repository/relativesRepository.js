import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const saveRelative = async (userId, name, relation, dateOfBirth) => {
    try {
        const response = await addDoc(collection(db,'relatives'), {
        uid: userId,
        name: name,
        relation: relation,
        dateOfBirth: dateOfBirth,
        });
    
        return { success: true, message: 'Saved Relative', response: response };
    } catch (error) {
        return { success: false, message: error.message, response: error };
    }
    }

export const updateRelative = async (userId, relativeId, name, relation, dateOfBirth) => {
    try {
        const response = await updateDoc(doc(db, 'relatives', relativeId), {
        name: name,
        relation: relation,
        dateOfBirth: dateOfBirth,
        });
    
        return { success: true, message: 'Updated Relative', response: response };
    } catch (error) {
        return { success: false, message: error.message, response: error };
    }
    }

export const deleteRelative = async (relativeId) => {
    try {
        const response = await deleteDoc(doc(db, 'relatives', relativeId));
    
        return { success: true, message: 'Deleted Relative', response: response };
    } catch (error) {
        return { success: false, message: error.message, response: error };
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
        return { success: false, message: error.message, error: error };
    }
    }
