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
        return error;
    }
};

export const saveGoal = async (userId, goalName) => {
    try {
        const savedGoal = await addDoc(collection(db, 'goals'), {
            uid: userId,
            name: goalName,
            counter: 0,
            cratedOn:  new Date(),
            updatedOn: new Date() 
        });

        return savedGoal;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateGoalById = async (goal) => {
    try {;
        const updatedGoal = await updateDoc(doc(db, 'goals', goal.key), {
            name: goal.name,
            counter: goal.counter,
            updatedOn: new Date() 
        });

        return updatedGoal;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const deleteGoalById = async (goal) => {
    try {;
        await deleteDoc(doc(db, 'goals', goal.key));

        return null;
    } catch (error) {
        console.log(error);
        return error;
    }
};
