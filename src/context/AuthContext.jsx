import { createContext, useEffect, useState } from "react";
import { auth } from "../assets/utils/Firebase";
import { div, tr, use } from "framer-motion/client";
import { Spinner } from "@nextui-org/react";
import { onAuthStateChanged } from "firebase/auth";


export const AuthContext = createContext()

function AuthContextProvider({children}) {
    const [user , setUser] = useState({
        isLogin : false,
        userInfo : {}
    })
    const [loading , setLoading] = useState(true)
    
    // user ki state check krne k lie
    function onAuthChanged(user) {
        if(user){
            setUser({isLogin : true , userInfo : {
                name : user?.displayName,
                photoURL : user.photoURL,
                email : user?.email
            }})
        }else{
            setUser({isLogin : false , userInfo : {}})

        }
        // setUser(user)
       setLoading(false)
    }

    useEffect(()=> {
        const subscriber = onAuthStateChanged(auth , onAuthChanged)
        return subscriber
    },[])
    
    return(
        <AuthContext.Provider value={{user , setUser}}>
            {
                loading ?
                <div className="w-full h-80 flex justify-center items-center">
                    <Spinner />
                </div> 
                :
            children

            }

        </AuthContext.Provider>
        )
}


export default AuthContextProvider