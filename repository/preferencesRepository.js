import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, limit } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const savePreference = async (userId, preference) => {
    try {
        if (!preference.name || !preference.name.trim() || !preference.type || !preference.type.trim()) {
            return { success: false, message: 'Please enter a required fields' };
        }

        const q = query(collection(db, 'preferences'), where('uid', '==', userId), where('name', '==', preference.name), where('type', '==', preference.type));

        const querySnapshot = await checkDuplicate(q);

        if (querySnapshot.duplicate) {
            return { success: false, message: 'Duplicate Preference' };
        }

        await addDoc(collection(db, 'preferences'), {
            uid: userId,
            name: preference.name,
            type: preference.type,
            createdOn: new Date(),
            updatedOn: new Date()
        });

        return { success: true, message: 'Saved Preference' };
    } catch (error) {
        throw error;
    }
};

export const updatePreferenceById = async (preferenceId, preference) => {
    try {
        if (!preference.name || !preference.name.trim() || !preference.type || !preference.type.trim()) {
            return { success: false, message: 'Please enter a required fields' };
        }

        const q = query(collection(db, 'preferences'), where('uid', '==', preference.uid), where('name', '==', preference.name), where('type', '==', preference.type));

        const duplicateSnapshot = await checkDuplicate(q);

        if (duplicateSnapshot.duplicate) {
            const duplicates = duplicateSnapshot.docs.filter((doc) => doc.id !== preferenceId);

            if (duplicates.length > 0) {
                return { success: false, message: 'Duplicate Preference' };
            }
        }

        await updateDoc(doc(db, 'preferences', preferenceId), {
            name: preference.name,
            type: preference.type,
            updatedOn: new Date()
        });

        return { success: true, message: 'Updated Preference' };
    } catch (error) {
        throw error;
    }
};

export const deletePreferenceById = async (preferenceId) => {
    try {
        ;
        await deleteDoc(doc(db, 'preferences', preferenceId));

        return { success: true, message: 'Deleted Preference' };
    } catch (error) {
        throw error;
    }
};

export const fetchUserPreferences = async (userId, docLimit) => {
    try {
        let q = query(collection(db, 'preferences'), where('uid', '==', userId));

        if (docLimit && docLimit > 0) {
            q = query(collection(db, 'preferences'), where('uid', '==', userId), limit(3));
        }
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