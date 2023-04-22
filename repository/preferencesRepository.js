import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, limit } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { computeCapitalizedFirstLetter } from '../utils/computeUtil';

export const savePreference = async (userId, preferenceDetails) => {
    try {
        console.log('savePreference', userId, preferenceDetails);

        if (!preferenceDetails.names || preferenceDetails.names.length < 1 || !preferenceDetails.type || !preferenceDetails.type.trim()) {
            return { success: false, message: 'Please enter the required fields' };
        }

        const q = query(collection(db, 'preferences'), where('uid', '==', userId), where('type', '==', preferenceDetails.type));

        const querySnapshot = await checkDuplicate(q);

        if (querySnapshot.duplicate) {
            return { success: false, message: 'Duplicate Preference Type' };
        }

        const filteredNames = preferenceDetails.names.filter((name) => {
            if (!name || !name.trim()) {
                return false;
            } else {
                return name.trim();
            }
        }).map((name) => computeCapitalizedFirstLetter(name));

        const uniqueNames = [...new Set(filteredNames)];

        if (uniqueNames.length < 1) {
            return { success: false, message: 'Please enter a valid Preference' };
        }

        await addDoc(collection(db, 'preferences'), {
            uid: userId,
            names: uniqueNames,
            type: preferenceDetails.type,
            createdOn: new Date(),
            updatedOn: new Date()
        });

        return { success: true, message: 'Saved Preference' };
    } catch (error) {
        throw error;
    }
};

export const saveMoviePreferences = async (uid, preferences) => {
    try {
        if (!preferences || preferences.length < 1) {
            return;
        }

        const q = query(collection(db, 'preferences'), where('uid', '==', uid));

        const querySnapshot = await checkDuplicate(q);

        if (querySnapshot.duplicate) {
            return { success: false, message: 'Preferences for this User already exist' };
        }

        const filteredPreferences = preferences.filter((preference) => {
            if (!preference || !preference.trim()) {
                return false;
            } else {
                return preference.trim();
            }
        }).map((preference) => computeCapitalizedFirstLetter(preference));

        const uniquePreferences = [...new Set(filteredPreferences)];

        await addDoc(collection(db, 'preferences'), {
            uid: uid,
            names: uniquePreferences,
            type: 'Movies',
            createdOn: new Date(),
            updatedOn: new Date()
        });

        return { success: true, message: 'Saved Preference Categories' };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updatePreferenceById = async (preferenceId, preference) => {
    try {
        if (!preference.names || preference.names.length < 1 || !preference.type || !preference.type.trim()) {
            return { success: false, message: 'Please enter a required fields' };
        }

        const q = query(collection(db, 'preferences'), where('uid', '==', preference.uid), where('type', '==', preference.type));

        const duplicateSnapshot = await checkDuplicate(q);

        if (duplicateSnapshot.duplicate) {
            const duplicates = duplicateSnapshot.docs.filter((doc) => doc.id !== preferenceId);

            if (duplicates.length > 0) {
                return { success: false, message: 'Duplicate Preference' };
            }
        }

        const filteredNames = preference.names.filter((name) => {
            if (!name || !name.trim()) {
                return false;
            } else {
                return name.trim();
            }
        }).map((name) => computeCapitalizedFirstLetter(name));

        const uniqueNames = [...new Set(filteredNames)];

        if (uniqueNames.length < 1) {
            return { success: false, message: 'Please enter a valid Preference' };
        }

        await updateDoc(doc(db, 'preferences', preferenceId), {
            names: uniqueNames,
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
            if (doc.data().names) {
                let names = doc.data().names.join(', ');
                preferences.push({ key: doc.id, ...doc.data(), names });
            } else {
                preferences.push({ key: doc.id, ...doc.data() });
            }
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