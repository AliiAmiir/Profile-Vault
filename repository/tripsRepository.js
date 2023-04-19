import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const saveTrip = async (userId, city, dateFrom, dateTo, cost, hotel) => {
    try {
        const response = await addDoc(collection(db, 'trips'), {
            uid: userId,
            city: city,
            dateFrom: dateFrom,
            dateTo: dateTo,
            cost: cost,
            hotel: hotel,
        });

        return { success: true, message: 'Saved Trip', response: response };
    } catch (error) {
        return { success: false, message: error.message, response: error };
    }
}

export const updateTrip = async (tripId, city, dateFrom, dateTo, cost, hotel) => {
    try {
        const response = await updateDoc(doc(db, 'trips', tripId), {
            city: city,
            dateFrom: dateFrom,
            dateTo: dateTo,
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
            let dateFrom = doc.data().dateFrom.toDate();
            let dateTo = doc.data().dateTo.toDate();
            trips.push({ key: doc.id, ...doc.data(), dateFrom, dateTo, showDateFromPicker: false, showDateToPicker: false });
        });

        return { success: true, message: 'Fetched Trips', data: trips };
    } catch (error) {
        return { success: false, message: error.message, error: error };
    }
}
