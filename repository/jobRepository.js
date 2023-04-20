import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const saveJob = async (userId, jobDetails) => {
    try {
        await addDoc(collection(db, 'jobs'), {
            uid: userId,
            company: jobDetails.company,
            title: jobDetails.title,
            dateFrom: jobDetails.dateFrom,
            dateTo: jobDetails.dateTo,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return { success: true, message: 'Saved Job' };
    } catch (error) {
        throw error;
    }
}

export const updateJob = async (jobId, jobDetails) => {
    try {
        await updateDoc(doc(db, 'jobs', jobId), {
            company: jobDetails.company,
            title: jobDetails.title,
            dateFrom: jobDetails.dateFrom,
            dateTo: jobDetails.dateTo,
            updatedAt: new Date(),
        });

        return { success: true, message: 'Updated Job' };
    } catch (error) {
        throw error;
    }
}

export const deleteJob = async (jobId) => {
    try {
        await deleteDoc(doc(db, 'jobs', jobId));

        return { success: true, message: 'Deleted Job' };
    } catch (error) {
        throw error;
    }
}

export const fetchUserJobs = async (userId) => {
    try {
        const q = query(collection(db, 'jobs'), where('uid', '==', userId));
        const querySnapshot = await getDocs(q);
        let jobs = [];

        querySnapshot.forEach((doc) => {
            let dateFrom = doc.data().dateFrom.toDate();
            let dateTo = doc.data().dateTo.toDate();
            jobs.push({ key: doc.id, ...doc.data(), dateFrom, dateTo, showDateFromPicker: false, showDateToPicker: false });
        });

        return { success: true, message: 'Fetched Jobs', data: jobs };
    } catch (error) {
        throw error;
    }
}
