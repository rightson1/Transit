import axios from "axios";
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addDoc, collection, getDocs, updateDoc, doc, query } from "firebase/firestore";
import { db } from "../firebase";


const addBusiness = (business) => axios.post('/api/business', business)
export const useAdd = () => {
    return useMutation(addBusiness, {
        onSuccess: () => console.log('success'),
    })
}
const editBusiness = ({ id, ...business }) => axios.put(`/api/business?id=${id}`, business)
export const useEdit = () => {
    return useMutation(editBusiness, {
        onSuccess: ({ data }) => {
            localStorage.setItem('business', JSON.stringify(data))
            window.location.reload()
        }
    })
}
const getBusiness = () => axios.get(`/api/business`)
export const useBusinessQuery = () => {
    return useQuery("business", () => getBusiness(), {
        staleTime: 900000,
        onSuccess: () => console.log('success'),
        select: (data) => {
            console.log(data)
            return data.data
        },
    })
}

const fetchCat = () => axios.get(`/api/category`)
export const useCategoryQuery = () => {
    return useQuery("categories", () => fetchCat(), {
        staleTime: 900000,
        onSuccess: () => console.log('success'),
        select: (data) => data.data,


    })
}


const addCat = (business) => axios.post('/api/category', business)
export const useCategoryMutatation = () => {
    const queryClient = useQueryClient();
    return useMutation(addCat, {
        onSuccess: () => {
            queryClient.refetchQueries("categories", fetchCat);
            queryClient.refetchQueries("allCategories", fetchCat);
        }

    })
}
const updateCat = ({ id, ...data }) => axios.put(`/api/category?id=${id}`, data)
export const useCategoryUpdate = () => {
    const queryClient = useQueryClient();
    return useMutation(updateCat, {
        onSuccess: () => {
            queryClient.refetchQueries("categories", fetchCat);
        }

    })
}

const deleteCat = (id) => axios.delete(`/api/category?id=${id}`)
export const useCategoryDelete = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteCat, {
        onSuccess: () => {
            queryClient.refetchQueries("categories", fetchCat);
        }

    })
}