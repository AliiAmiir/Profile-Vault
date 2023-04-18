import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const fetchFavorByUserId = async (userId) => {
    try {
        const q = query(collection(db, 'favors'), where('uid', '==', userId));

        const querySnapshot = await getDocs(q);

        if (querySnapshot.docs.length > 0) {
            return querySnapshot.docs;
        }

        return null;
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Unexpected Error Occurred', error: error };
    }
};

export const saveFavor = async (userId, favorName) => {
    try {
        const q = query(collection(db, 'favors'), where('uid', '==', userId), where('name', '==', favorName));

        const querySnapshot = await checkDuplicate(q);

        if (querySnapshot.duplicate) {
            return { success: false, message: 'Duplicate Favor' };
        }

        const savedFavor = await addDoc(collection(db, 'favors'), {
            uid: userId,
            name: favorName,
            counter: 0,
            createdOn: new Date(),
            updatedOn: new Date()
        });

        return { success: true, message: 'Saved Favor' };
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Unexpected Error Occurred', error: error };
    }
}

export const updateFavorById = async (favor, counterUpdate) => {
    try {
        if (!counterUpdate) {
            const q = query(collection(db, 'favors'), where('uid', '==', favor.uid), where('name', '==', favor.name));

            const duplicateSnapshot = await checkDuplicate(q);

            if (duplicateSnapshot.duplicate) {
                const duplicates = duplicateSnapshot.docs.filter((doc) => doc.id !== favor.key);

                if (duplicates.length > 0) {
                    return { success: false, message: 'Duplicate Favor' };
                }
            }
        }

        const favorRef = doc(db, 'favors', favor.key);
        await updateDoc(favorRef, {
            name: favor.name,
            counter: favor.counter,
            updatedOn: new Date()
        });

        return { success: true, message: 'Updated Favor' };
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Unexpected Error Occurred', error: error };
    }
}

export const deleteFavorById = async (favorId) => {
    try {
        const favorRef = doc(db, 'favors', favorId.key);
        await deleteDoc(favorRef);

        return { success: true, message: 'Deleted Favor' };
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Unexpected Error Occurred', error: error };
    }
}

export const checkDuplicate = async (q) => {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
        return { duplicate: true, docs: querySnapshot.docs };
    }

    return { duplicate: false };
}
