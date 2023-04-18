import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const saveHealth = async (userId, healthCheckUpDate, healthDiagonsis, healthMedicines, healthDuration) => {
    try {
        const response = await addDoc(collection(db,'health'), {
        uid: userId,
        healthCheckUpDate: healthCheckUpDate,
        healthDiagonsis: healthDiagonsis,
        healthMedicines: healthMedicines,
        healthDuration: healthDuration,
        });
    
        return { success: true, message: 'Saved Health', response: response };
    } catch (error) {
        return { success: false, message: error.message, response: error };
    }
    }

    export const updateHealth = async (userId, healthId, healthCheckUpDate, healthDiagonsis, healthMedicines, healthDuration) => {
        try {
          console.log('healthId', healthId);
          const response = await updateDoc(doc(db, 'health', healthId), {
            healthCheckUpDate: healthCheckUpDate,
            healthDiagonsis: healthDiagonsis,
            healthMedicines: healthMedicines,
            healthDuration: healthDuration,
          });
      
          return { success: true, message: 'Updated Health', response: response };
        } catch (error) {
          return { success: false, message: error.message, response: error };
        }
      };
      

export const deleteHealth = async (healthId) => {
    try {
        const response = await deleteDoc(doc(db, 'health', healthId));
    
        return { success: true, message: 'Deleted Health', response: response };
    } catch (error) {
        return { success: false, message: error.message, response: error };
    }
    }

export const fetchUserHealth = async (userId) => {
    try {
        const q = query(collection(db, 'health'), where('uid', '==', userId));
        const querySnapshot = await getDocs(q);
        let health = [];

        querySnapshot.forEach((doc) => {
        health.push({ key: doc.id, ...doc.data() });
        });

        return { success: true, message: 'Fetched Health', data: health };
    } catch (error) {
        return { success: false, message: error.message, error: error };
    }
    }
