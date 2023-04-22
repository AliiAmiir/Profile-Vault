import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const fetchUserById = async (userId) => {
    try {
        const q = query(collection(db, 'users'), where('uid', '==', userId));

        const querySnapshot = await getDocs(q);

        if (querySnapshot.docs.length > 0 && querySnapshot.docs[0].data()) {
            let user = querySnapshot.docs[0].data();
            user.dateOfBirth = user.dateOfBirth.toDate();
            user.userDocKey = querySnapshot.docs[0].id;
            
            return { success: true, data: user };
        }

        return { success: false, message: 'User not found' };
    } catch (error) {
        return error;
    }
};

export const saveUser = async (uid, userDetails) => {
    try {
        if (!uid) {
            throw new Error('User Id is missing');
        }

        if (!userDetails.firstName || !userDetails.firstName.trim() || !userDetails.lastName || !userDetails.lastName.trim() || !userDetails.email || !userDetails.email.trim() || !userDetails.phone || !userDetails.phone.trim() || !userDetails.gender || !userDetails.gender.trim() || !userDetails.dateOfBirth) {
            throw new Error('Required User Details are missing');
        }

        await addDoc(collection(db, 'users'), {
            uid: uid,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            email: userDetails.email,
            phone: userDetails.phone,
            gender: userDetails.gender,
            dateOfBirth: userDetails.dateOfBirth,
            createdOn: new Date(),
            updatedOn: new Date(),
        });

        return { success: true };
    } catch (error) {
        return error;
    }
};

export const updateUser = async (key, userDetails) => {
    try {
        await updateDoc(doc(db, 'users', key), {
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            phone: userDetails.phone,
            dateOfBirth: userDetails.dateOfBirth,
            updatedOn: new Date(),
        });

        return { success: true };
    } catch (error) {
        throw error;
    }
};
