import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const saveTrip = async (userId, tripDetails) => {
    try {
        if (!tripDetails.city || !tripDetails.city.trim() || !tripDetails.state || !tripDetails.state.trim() || !tripDetails.country || !tripDetails.country.trim() || !tripDetails.dateFrom || !tripDetails.dateTo) {
            return { success: false, message: 'Required fields can not be empty' };
        }

        if (tripDetails.dateFrom > tripDetails.dateTo) {
            return { success: false, message: 'Date From greater than Date To' };
        }

        if (!tripDetails.tripCost || tripDetails.tripCost < 0) {
            return { success: false, message: 'Trip Cost must be a positive number' };
        }

        if ((tripDetails.hotelName || tripDetails.hotelAddress || (tripDetails.hotelCost && tripDetails.hotelCost > 0)) && (!tripDetails.hotelName || !tripDetails.hotelName.trim() || !tripDetails.hotelAddress || !tripDetails.hotelAddress.trim() || tripDetails.hotelCost < 0)) {
            return { success: false, message: 'Invalid hotel details' };
        }

        if ((tripDetails.flightName || (tripDetails.flightCost && tripDetails.flightCost > 0)) && (!tripDetails.flightName || !tripDetails.flightName.trim() || tripDetails.flightCost < 0)) {
            return { success: false, message: 'Invalid flight details' };
        }

        if ((tripDetails.carRentalName || (tripDetails.carRentalCost && tripDetails.carRentalCost > 0)) && (!tripDetails.carRentalName || !tripDetails.carRentalName.trim() || tripDetails.carRentalCost < 0)) {
            return { success: false, message: 'Invalid car rental details' };
        }

        await addDoc(collection(db, 'trips'), {
            uid: userId,
            city: tripDetails.city,
            state: tripDetails.state,
            country: tripDetails.country,
            dateFrom: tripDetails.dateFrom,
            dateTo: tripDetails.dateTo,
            tripCost: (parseFloat(tripDetails.tripCost).toFixed(2)).toString(),
            hotelName: tripDetails.hotelName || 'N/A',
            hotelAddress: tripDetails.hotelAddress || 'N/A',
            hotelCost: (parseFloat(tripDetails.hotelCost).toFixed(2)).toString(),
            flightName: tripDetails.flightName || 'N/A',
            flightCost: (parseFloat(tripDetails.flightCost).toFixed(2)).toString(),
            carRentalName: tripDetails.carRentalName || 'N/A',
            carRentalCost: (parseFloat(tripDetails.carRentalCost).toFixed(2)).toString(),
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
        if (!tripDetails.city || !tripDetails.city.trim() || !tripDetails.state || !tripDetails.state.trim() || !tripDetails.country || !tripDetails.country.trim() || !tripDetails.dateFrom || !tripDetails.dateTo) {
            return { success: false, message: 'Required fields can not be empty' };
        }

        if (tripDetails.dateFrom > tripDetails.dateTo) {
            return { success: false, message: 'Date From greater than Date To' };
        }

        if (!tripDetails.tripCost || tripDetails.tripCost < 0) {
            return { success: false, message: 'Trip Cost must be a positive number' };
        }

        if ((tripDetails.hotelName || tripDetails.hotelAddress || (tripDetails.hotelCost && tripDetails.hotelCost > 0)) && (!tripDetails.hotelName || !tripDetails.hotelName.trim() || !tripDetails.hotelAddress || !tripDetails.hotelAddress.trim() || tripDetails.hotelCost < 0)) {
            return { success: false, message: 'Invalid hotel details' };
        }

        if ((tripDetails.flightName || (tripDetails.flightCost && tripDetails.flightCost > 0)) && (!tripDetails.flightName || !tripDetails.flightName.trim() || tripDetails.flightCost < 0)) {
            return { success: false, message: 'Invalid flight details' };
        }

        if ((tripDetails.carRentalName || (tripDetails.carRentalCost && tripDetails.carRentalCost > 0)) && (!tripDetails.carRentalName || !tripDetails.carRentalName.trim() || tripDetails.carRentalCost < 0)) {
            return { success: false, message: 'Invalid car rental details' };
        }

        await updateDoc(doc(db, 'trips', tripId), {
            city: tripDetails.city,
            state: tripDetails.state,
            country: tripDetails.country,
            dateFrom: tripDetails.dateFrom,
            dateTo: tripDetails.dateTo,
            tripCost: (parseFloat(tripDetails.tripCost).toFixed(2)).toString(),
            hotelName: tripDetails.hotelName || 'N/A',
            hotelAddress: tripDetails.hotelAddress || 'N/A',
            hotelCost: (parseFloat(tripDetails.hotelCost).toFixed(2)).toString(),
            flightName: tripDetails.flightName || 'N/A',
            flightCost: (parseFloat(tripDetails.flightCost).toFixed(2)).toString(),
            carRentalName: tripDetails.carRentalName || 'N/A',
            carRentalCost: (parseFloat(tripDetails.carRentalCost).toFixed(2)).toString(),
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
