import { createContext, useContext } from "react";
import { collection, getDocs, onSnapshot, query, where, FieldPath, setDoc } from '@firebase/firestore';
import { db } from './firebase';
import { useAuth } from "./authContext";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useGlobalProvider } from "./themeContext";
import { useDeleteOrder, useGetOrders } from "./hooks/useOrder";
const RealContext = createContext();


export const RealProvider = ({ children }) => {
    const { business, admin } = useAuth()
    const today = new Date().getDate();
    const [orders, setOrders] = useState([])
    const [orderChanges, setOrderChanges] = useState([])
    const [todayOrders, setTodayOrders] = useState([])
    const [notifications, setNotifications] = useState([])
    const { mutate } = useDeleteOrder();
    const { data, isLoading: loadingOrders, refetch } = useGetOrders({ business: business?._id, today });
    useEffect(() => {
        if (data) {
            setOrders(data)
        }
    }, [data])
    useEffect(() => {
        if (!business?._id) return;
        const q = query(collection(db, "orders"), where("business", "==", business._id), where('date.day', '>=', today - 1))

        const unsub = onSnapshot(q, (querySnapshot) => {
            querySnapshot.docChanges().forEach(function (change) {
                if (change.type === "removed") {
                    setNotifications([...notifications, { ...change.doc.data(), deleted: true, message: `Order Deleted By ${change.doc.data().userName}` }])
                    const docId = change.doc.id;
                    mutate(docId);
                    refetch();
                }
            });
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setTodayOrders(docs)

        });

        return () => unsub();

    }, [business, admin])
    useEffect(() => {
        if (!business?._id) return;

        const q = query(collection(db, "orders"), where("business", "==", business._id), where('read', '==', "false"))
        const unsub = onSnapshot(q, (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setNotifications(docs)
            // querySnapshot.docChanges().forEach(function (change) {
            //     if (change.type === "added") {
            //         setNotifications([...notifications, { message: `You have A New Order  `, data: change.doc.data() }])
            //     } else if (change.type === "modified") {
            //         console.log("Document modified: ", change.doc.data());
            //     } else 

            //     if (change.type === "removed") {
            //         setNotifications([...notifications, { ...change.doc.data() }])
            //     }
            // });
        });
        return () => unsub();

    }, [business, admin])


    useEffect(() => {
        if (!business) return;
        console.log('fetching orders')
        setTimeout(() => {
            refetch();

        }, 10000)
    }, [todayOrders, notifications])
    const fetch = () => {

    }


    return (
        <RealContext.Provider value={{ orders, fetch, notifications, setNotifications, loadingOrders, setNotifications }}>
            {children}
        </RealContext.Provider>
    )
}
export const useReal = () => useContext(RealContext)