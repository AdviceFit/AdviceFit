import { useEffect, useState } from "react"

export const useLocalStorageHook = () => {
    const [userDetails, setUserDetails] = useState<any>(null);

    const clearLocalStorage = () => localStorage.clear(); 
      useEffect(() => {
        if (typeof window !== "undefined") {
          const storedUserDetails = localStorage.getItem("user");
          if (storedUserDetails) {
            setUserDetails(JSON.parse(storedUserDetails));
          }
        }
      }, []);

    return {userDetails, clearLocalStorage};
}