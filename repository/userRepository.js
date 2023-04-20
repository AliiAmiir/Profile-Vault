import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const fetchUserById = async (userId) => {
    try {
        const q = query(collection(db, 'users'), where('uid', '==', userId));

        const querySnapshot = await getDocs(q);

        if (querySnapshot.docs.length > 0 && querySnapshot.docs[0].data()) {
            return querySnapshot.docs[0].data();
        }

        return null;
    } catch (error) {
        return error;
    }
};

export const saveUserDetails = async (userId, firstName, lastName, email, phone, gender, dateOfBirth, hobbies, movieGenres, favors, degrees) => {
    try {
        const savedUser = await addDoc(collection(db, 'users'), {
            uid: userId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            gender: gender,
            dateOfBirth: dateOfBirth,
            hobbies: hobbies,
            movieGenres: movieGenres,
            favors: favors,
            degrees: degrees,
            createdOn: new Date(),
            updatedOn: new Date(),
        });

        return savedUser;
    } catch (error) {
        return error;
    }
};

export const updateUser = async (userId, userDetails) => {
    try {
        await updateDoc(doc(db, 'health', userId), {
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            email: userDetails.email,
            phone: userDetails.phone,
            dateOfBirth: userDetails.dateOfBirth,
            updatedOn: new Date(),
        });

        return { success: true, message: 'Updated User' };
    } catch (error) {
        throw error;
    }
};
