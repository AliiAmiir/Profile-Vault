import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
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
        });

        return updatedGoal;
    } catch (error) {
        console.log(error);
        return error;
    }
};


// export const deleteGoalById = async (userId, firstName, lastName, email, phone, gender, dateOfBirth, hobbies, movieGenres, favors, degrees) => {
//     try {
//         const savedUser = await addDoc(collection(db, 'goals'), {
//             uid: userId,
//             firstName: firstName,
//             lastName: lastName,
//             email: email,
//             phone: phone,
//             gender: gender,
//             dateOfBirth: dateOfBirth,
//             hobbies: hobbies,
//             movieGenres: movieGenres,
//             favors: favors,
//             degrees: degrees,
//         });

//         return savedUser;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// };
