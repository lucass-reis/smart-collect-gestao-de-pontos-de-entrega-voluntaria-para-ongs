import { collection, getDocs, query, where } from "firebase/firestore";
import { createContext, useState, useContext, useEffect } from "react";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const OngContext = createContext();

export function OngProvider({ children }) {
  const [ong, setOng] = useState(null);
  const [loadingOng, setLoadingOng] = useState(true);

  useEffect(() => {
    // dispara quando o app inicia
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // usuário logado → buscar ONG
        const q = query(
          collection(db, "ongs"),
          where("owner", "==", user.uid)
        );

        const snap = await getDocs(q);

        if (!snap.empty) {
          const doc = snap.docs[0];
          setOng({
            id: doc.id,
            ...doc.data(),
          });
        } else {
          setOng(null); // não encontrou ONG
        }
      } else {
        // usuário não logado
        setOng(null);
      }

      setLoadingOng(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <OngContext.Provider value={{ ong, setOng }}>
      {children}
    </OngContext.Provider>
  );
}

export function useOng() {
  return useContext(OngContext);
}
