import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const saveTrip = async (userId, tripDetails) => {
    try {
        await addDoc(collection(db, 'trips'), {
            uid: userId,
            city: tripDetails.city,
            state: tripDetails.state,
            country: tripDetails.country,
            dateFrom: tripDetails.dateFrom,
            dateTo: tripDetails.dateTo,
            tripCost: (parseFloat(tripDetails.tripCost).toFixed(2)).toString() || '0.00',
            hotelName: tripDetails.hotelName || 'N/A',
            hotelAddress: tripDetails.hotelAddress || 'N/A',
            hotelCost: (parseFloat(tripDetails.hotelCost).toFixed(2)).toString() || '0.00',
            flightName: tripDetails.flightName || 'N/A',
            flightCost: (parseFloat(tripDetails.flightCost).toFixed(2)).toString() || '0.00',
            carRentalName: tripDetails.carRentalName || 'N/A',
            carRentalCost: (parseFloat(tripDetails.carRentalCost).toFixed(2)).toString() || '0.00',
            createdOn: new Date(),
            updatedOn: new Date(),
        });

        return { success: true, message: 'Saved Trip' };
    } catch (error) {
        throw error;
    }
}

export const updateTrip = async (tripId, tripDetails) => {
    try {
        await updateDoc(doc(db, 'trips', tripId), {
            city: tripDetails.city,
            state: tripDetails.state,
            country: tripDetails.country,
            dateFrom: tripDetails.dateFrom,
            dateTo: tripDetails.dateTo,
            tripCost: (parseFloat(tripDetails.tripCost).toFixed(2)).toString() || '0.00',
            hotelName: tripDetails.hotelName || 'N/A',
            hotelAddress: tripDetails.hotelAddress || 'N/A',
            hotelCost: (parseFloat(tripDetails.hotelCost).toFixed(2)).toString() || '0.00',
            flightName: tripDetails.flightName || 'N/A',
            flightCost: (parseFloat(tripDetails.flightCost).toFixed(2)).toString() || '0.00',
            carRentalName: tripDetails.carRentalName || 'N/A',
            carRentalCost: (parseFloat(tripDetails.carRentalCost).toFixed(2)).toString() || '0.00',
            updatedOn: new Date(),
        });

        return { success: true, message: 'Updated Trip' };
    } catch (error) {
        throw error;
    }
}

export const deleteTrip = async (tripId) => {
    try {
        await deleteDoc(doc(db, 'trips', tripId));

        return { success: true, message: 'Deleted Trip' };
    } catch (error) {
        throw error;
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
        throw error;
    }
}
