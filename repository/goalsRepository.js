import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/FirebaseConfig';

export const fetchGoalsByUserId = async (userId) => {
    try {
        const q = query(collection(db, 'goals'), where('uid', '==', userId));

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

export const saveGoal = async (userId, goalName) => {
    try {
        const q = query(collection(db, 'goals'), where('uid', '==', userId), where('name', '==', goalName));

        const querySnapshot = await checkDuplicate(q);

        if (querySnapshot.duplicate) {
            return { success: false, message: 'Duplicate Goal' };
        }

        const savedGoal = await addDoc(collection(db, 'goals'), {
            uid: userId,
            name: goalName,
            counter: 0,
            createdOn: new Date(),
            updatedOn: new Date()
        });

        return { success: true, message: 'Saved Goal' };
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Unexpected Error Occurred', error: error };
    }
};

export const updateGoalById = async (goal, counterUpdate) => {
    try {
        if (!counterUpdate) {
            const q = query(collection(db, 'goals'), where('uid', '==', goal.uid), where('name', '==', goal.name));

            const duplicateSnapshot = await checkDuplicate(q);

            if (duplicateSnapshot.duplicate) {
                const duplicates = duplicateSnapshot.docs.filter((doc) => doc.id !== goal.key);

                if (duplicates.length > 0) {
                    return { success: false, message: 'Duplicate Goal' };
                }
            }
        }

        const updatedGoal = await updateDoc(doc(db, 'goals', goal.key), {
            name: goal.name,
            counter: goal.counter,
            updatedOn: new Date()
        });

        return { success: true, message: 'Updated Goal' };
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Unexpected Error Occurred', error: error };
    }
};

export const deleteGoalById = async (goal) => {
    try {
        ;
        await deleteDoc(doc(db, 'goals', goal.key));

        return null;
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Unexpected Error Occurred', error: error };
    }
};

const checkDuplicate = async (checkDuplicateQuery) => {
    try {
        const querySnapshot = await getDocs(checkDuplicateQuery);

        if (querySnapshot.docs.length > 0) {
            return { duplicate: true, docs: querySnapshot.docs.map((item) => { return {id: item.id, ...item.data()} }) }
        }

        return { duplicate: false };
    } catch (error) {
        throw error;
    }
}