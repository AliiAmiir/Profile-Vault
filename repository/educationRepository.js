import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const saveEducation = async (userId, educationDetails) => {
    try {
        await addDoc(collection(db, 'education'), {
            uid: userId,
            institute: educationDetails.institute,
            degree: educationDetails.degree,
            dateFrom: educationDetails.dateFrom,
            dateTo: educationDetails.dateTo,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return { success: true, message: 'Saved Education' };
    } catch (error) {
        throw error;
    }
}

export const updateEducation = async (educationId, educationDetails) => {
    try {
        await updateDoc(doc(db, 'education', educationId), {
            institute: educationDetails.institute,
            degree: educationDetails.degree,
            dateFrom: educationDetails.dateFrom,
            dateTo: educationDetails.dateTo,
            updatedAt: new Date(),
        });

        return { success: true, message: 'Updated Education' };
    } catch (error) {
        throw error;
    }
}

export const deleteEducation = async (educationId) => {
    try {
        await deleteDoc(doc(db, 'education', educationId));

        return { success: true, message: 'Deleted Education' };
    } catch (error) {
        throw error;
    }
}

export const fetchUserEducation = async (userId) => {
    try {
        const q = query(collection(db, 'education'), where('uid', '==', userId));
        const querySnapshot = await getDocs(q);
        let education = [];

        querySnapshot.forEach((doc) => {
            let dateFrom = doc.data().dateFrom.toDate();
            let dateTo = doc.data().dateTo.toDate();
            education.push({ key: doc.id, ...doc.data(), dateFrom, dateTo, showDateFromPicker: false, showDateToPicker: false });
        });

        return { success: true, message: 'Fetched Education', data: education };
    } catch (error) {
        throw error;
    }
}
