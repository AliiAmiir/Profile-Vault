import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const saveTrip = async (userId, city, dates, cost, hotel) => {
    try {
        const response = await addDoc(collection(db,'trips'), {
        uid: userId,
        city: city,
        dates: dates,
        cost: cost,
        hotel: hotel,
        });
    
        return { success: true, message: 'Saved Trip', response: response };
    } catch (error) {
        return { success: false, message: error.message, response: error };
    }
    }

export const updateTrip = async (userId, tripId, city, dates, cost, hotel) => {
    try {
        console.log('tripId', tripId);
        const response = await updateDoc(doc(db, 'trips', tripId), {
        city: city,
        dates: dates,
        cost: cost,
        hotel: hotel,
        });
    
        return { success: true, message: 'Updated Trip', response: response };
    } catch (error) {
        return { success: false, message: error.message, response: error };
    }
    }

export const deleteTrip = async (tripId) => {
    try {
        const response = await deleteDoc(doc(db, 'trips', tripId));
    
        return { success: true, message: 'Deleted Trip', response: response };
    } catch (error) {
        return { success: false, message: error.message, response: error };
    }
    }

export const fetchUserTrips = async (userId) => {
    try {
        const q = query(collection(db, 'trips'), where('uid', '==', userId));
        const querySnapshot = await getDocs(q);
        let trips = [];
    
        querySnapshot.forEach((doc) => {
        trips.push({ key: doc.id, ...doc.data() });
        });
    
        return { success: true, message: 'Fetched Trips', data: trips };
    } catch (error) {
        return { success: false, message: error.message, error: error };
    }
}