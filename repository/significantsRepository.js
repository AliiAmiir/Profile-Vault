import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const saveSignificant = async (userId, significantName, significantRelation, significantDateOfBirth, significantAnniversary) => {
    try {
        const response = await addDoc(collection(db,'significants'), {
        uid: userId,
        significantName: significantName,
        significantRelation: significantRelation,
        significantDateOfBirth: significantDateOfBirth,
        significantAnniversary: significantAnniversary,
        });
    
        return { success: true, message: 'Saved Significant', response: response };
    } catch (error) {
        return { success: false, message: error.message, response: error };
    }
    }

export const updateSignificant = async (userId, significantId, significantName, significantRelation, significantDateOfBirth, significantAnniversary) => {
    try {
        console.log('significantId', significantId);
        const response = await updateDoc(doc(db, 'significants', significantId), {
        significantName: significantName,
        significantRelation: significantRelation,
        significantDateOfBirth: significantDateOfBirth,
        significantAnniversary: significantAnniversary,
        });
    
        return { success: true, message: 'Updated Significant', response: response };
    } catch (error) {
        return { success: false, message: error.message, response: error };
    }
    }

export const deleteSignificant = async (significantId) => {
    try {
        const response = await deleteDoc(doc(db, 'significants', significantId));
    
        return { success: true, message: 'Deleted Significant', response: response };
    } catch (error) {
        return { success: false, message: error.message, response: error };
    }
    }

export const fetchUserSignificants = async (userId) => {
    try {
        const q = query(collection(db, 'significants'), where('uid', '==', userId));
        const querySnapshot = await getDocs(q);
        let significants = [];
    
        querySnapshot.forEach((doc) => {
        significants.push({ key: doc.id, ...doc.data() });
        });
    
        return { success: true, message: 'Fetched Significants', data: significants };
    } catch (error) {
        return { success: false, message: error.message, error: error };
    }
    }
