import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, limit } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const fetchPreferencesByUserId = async (userId) => {
    try {
        const q = query(collection(db, 'preferences'), where('uid', '==', userId));

        const querySnapshot = await getDocs(q);

        if (querySnapshot.docs.length > 0) {
            return querySnapshot.docs;
        }

        return null;
    } catch (error) {
        throw error;
    }
};

export const savePreference = async (userId, preferenceName) => {
    try {
        const q = query(collection(db, 'preferences'), where('uid', '==', userId), where('name', '==', preferenceName));

        const querySnapshot = await checkDuplicate(q);

        if (querySnapshot.duplicate) {
            return { success: false, message: 'Duplicate Preference' };
        }

        await addDoc(collection(db, 'preferences'), {
            uid: userId,
            name: preferenceName,
            createdOn: new Date(),
            updatedOn: new Date()
        });

        return { success: true, message: 'Saved Preference' };
    } catch (error) {
        throw error;
    }
};

export const updatePreferenceById = async (preference) => {
    try {
        const q = query(collection(db, 'preferences'), where('uid', '==', preference.uid), where('name', '==', preference.name));

        const duplicateSnapshot = await checkDuplicate(q);

        if (duplicateSnapshot.duplicate) {
            const duplicates = duplicateSnapshot.docs.filter((doc) => doc.id !== preference.key);

            if (duplicates.length > 0) {
                return { success: false, message: 'Duplicate Preference' };
            }
        }

        await updateDoc(doc(db, 'preferences', preference.key), {
            name: preference.name,
            updatedOn: new Date()
        });

        return { success: true, message: 'Updated Preference' };
    } catch (error) {
        throw error;
    }
};

export const deletePreferenceById = async (preference) => {
    try {
        ;
        await deleteDoc(doc(db, 'preferences', preference.key));

        return { success: true, message: 'Deleted Preference' };
    } catch (error) {
        throw error;
    }
};

const checkDuplicate = async (checkDuplicateQuery) => {
    try {
        const querySnapshot = await getDocs(checkDuplicateQuery);

        if (querySnapshot.docs.length > 0) {
            return { duplicate: true, docs: querySnapshot.docs.map((item) => { return { id: item.id, ...item.data() } }) }
        }

        return { duplicate: false };
    } catch (error) {
        throw error;
    }
}

export const fetchPreferencesForHome = async (userId) => {
    try {
        const q = query(collection(db, 'preferences'), where('uid', '==', userId), limit(3));
        const querySnapshot = await getDocs(q);
        let preferences = [];

        querySnapshot.forEach((doc) => {
            preferences.push({ key: doc.id, ...doc.data() });
        });

        return { success: true, data: preferences };
    } catch (error) {
        throw error;
    }
}