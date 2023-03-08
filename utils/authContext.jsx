
import { createContext, useContext, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "./firebase";
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "./firebase";
import { useRouter } from "next/router";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState({});
    const router = useRouter()
    const [user, setUser] = useState(null);


    useEffect(() => {
        const localAdmin = localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')) : null;
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAdmin({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                });
                if (localAdmin) {
                    setUser(localAdmin)
                } else {
                    const q = query(collection(db, "admins"), where("email", "==", user.email));
                    getDocs(q).then((res) => {
                        const [fetchedAdmin, ...rest] = res.docs.map((doc) => {
                            return { id: doc.id, ...doc.data() }
                        })
                        if (fetchedAdmin) {
                            setUser(fetchedAdmin);
                            localStorage.setItem('admin', JSON.stringify(fetchedAdmin))
                        } else {
                            setUser(null)
                        }
                    })
                }


            } else {
                setAdmin(null);

            }
        });
        setLoading(false);
        return () => {
            unsub()
        }
    }, [])


    const logout = async () => {
        await signOut(auth).then(() => {
            router.push('/login')
            setBusiness(null);
            setAdmin(null)
            localStorage.clear();

        }).catch((e) => {
            console.log(e)
        })
    }

    return (
        <AuthContext.Provider value={{ logout, admin, user }}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);