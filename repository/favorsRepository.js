import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, limit } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const fetchFavors = async (userId) => {
    try {
        const q = query(collection(db, 'favors'), where('uid', '==', userId));
        const querySnapshot = await getDocs(q);
        let favors = [];

        querySnapshot.forEach((doc) => {
            favors.push({ key: doc.id, ...doc.data() });
        });

        return { success: true, data: favors };
    } catch (error) {
        throw error;
    }
};

export const saveFavor = async (userId, favorDetails) => {
    try {
        if (!favorDetails.beneficiary || !favorDetails.beneficiary.trim() || !favorDetails.type || !favorDetails.type.trim()) {
            return { success: false, message: 'Please enter a required fields' };
        }

        const { beneficiary, type } = favorDetails;
        const q = query(collection(db, 'favors'), where('uid', '==', userId), where('beneficiary', '==', beneficiary), where('type', '==', type));

        const querySnapshot = await checkDuplicate(q);

        if (querySnapshot.duplicate) {
            return { success: false, message: 'Duplicate Favor' };
        }

        await addDoc(collection(db, 'favors'), {
            uid: userId,
            type: favorDetails.type,
            beneficiary: favorDetails.beneficiary,
            createdOn: new Date(),
            updatedOn: new Date()
        });

        return { success: true, message: 'Saved Favor' };
    } catch (error) {
        throw error;
    }
}

export const updateFavorById = async (favorId, userId, favorDetails) => {
    try {
        if (!favorDetails.beneficiary || !favorDetails.beneficiary.trim() || !favorDetails.type || !favorDetails.type.trim()) {
            return { success: false, message: 'Please enter a required fields' };
        }

        const { beneficiary, type } = favorDetails;
        const q = query(collection(db, 'favors'), where('uid', '==', userId), where('beneficiary', '==', beneficiary), where('type', '==', type));

        const duplicateSnapshot = await checkDuplicate(q);

        if (duplicateSnapshot.duplicate) {
            const duplicates = duplicateSnapshot.docs.filter((doc) => doc.id !== favorId);

            if (duplicates.length > 0) {
                return { success: false, message: 'Duplicate Favor' };
            }
        }

        const favorRef = doc(db, 'favors', favorId);
        await updateDoc(favorRef, {
            type: favorDetails.type,
            beneficiary: favorDetails.beneficiary,
            updatedOn: new Date()
        });

        return { success: true, message: 'Updated Favor' };
    } catch (error) {
        throw error;
    }
}

export const deleteFavorById = async (favorId) => {
    try {
        const favorRef = doc(db, 'favors', favorId);
        await deleteDoc(favorRef);

        return { success: true, message: 'Deleted Favor' };
    } catch (error) {
        throw error;
    }
}

export const checkDuplicate = async (q) => {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
        return { duplicate: true, docs: querySnapshot.docs };
    }

    return { duplicate: false };
}

export const fetchFavorsForHome = async (userId) => {
    try {
        const q = query(collection(db, 'favors'), where('uid', '==', userId), limit(3));
        const querySnapshot = await getDocs(q);
        let favors = [];

        querySnapshot.forEach((doc) => {
            favors.push({ key: doc.id, ...doc.data() });
        });

        return { success: true, data: favors };
    } catch (error) {
        throw error;
    }
}