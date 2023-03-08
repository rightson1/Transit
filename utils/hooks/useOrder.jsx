import { auth } from '../firebase';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';



const getOrder = (id) => axios.get(`/api/orders/single?id=${id}`)
export const useGetOrder = (id) => {
    return useQuery(["admin", id], () => getOrder(id), {
        enabled: !!id,
        select: (data) => data.data,
        staleTime: 900000,

    })
}
const getOrderAgg = (time) => axios.get(`/api/orders/agg?business=${time.id}&${time.time}=${time.week || time.month}`)

export const useGetOrderAgg = (time) => {
    return useQuery(["order", time?.time], () => getOrderAgg(time), {
        enabled: !!time.id && !!time.time,
        select: (data) => data.data,
        staleTime: 900000,


    })
}

const deleteOrder = (id) => axios.delete(`/api/orders?realId=${id}`)
export const useDeleteOrder = () => {
    return useMutation(deleteOrder, {
        onSuccess: () => {
        }
    })
}
const getOrders = (business, today) => {

    return axios.get(`/api/orders?business=${business}&day=${today}`)
}
export const useGetOrders = ({ business, today }) => {

    return useQuery(["todayOrders", business], () => getOrders(business, today), {
        enabled: !!business,
        select: (data) => data.data,
        onSuccess: () => console.log('successfully refetch'),
        fetchOnWindowFocus: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchInterval: false,
        refetchIntervalInBackground: false,
        staleTime: 300000,

    })
}

export const orderUpdate = ({ id, ...other }) => {
    return axios.put(`/api/orders?realId=${id}`, other)
}
export const useOrderUpdate = (id) => {
    const queryClient = useQueryClient()
    return useMutation(orderUpdate, {

        onSuccess: () => {

            queryClient.refetchQueries(["todayOrders", id], getOrders(id, new Date().getDate()))
        }
    })
}

const newOrder = (order) => axios.post(`/api/orders`, order)
export const useNewOrder = () => {
    return useMutation(newOrder, {
        onSuccess: () => console.log('success'),
    })
}