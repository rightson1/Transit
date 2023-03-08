import { auth } from '../firebase';
import { doc, addDoc, collection, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useMutation, useQuery } from 'react-query';

const addUser = (user) => setDoc(doc(db, 'admins', user.uid), user)
export const useRegister = () => {
    return useMutation(addUser, {
        onSuccess: () => console.log('success'),
    })
}

const getUser = (id) => getDoc(doc(db, 'admins', id))
export const useGetUser = (id) => {
    return useQuery(["admin", id], () => getUser(id), {
        select: (data) => data.data(),

    })
}

