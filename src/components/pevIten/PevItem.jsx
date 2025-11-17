import { getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export function PevItem({ ref }) {
  const [pev, setPev] = useState(null);

  useEffect(() => {
    async function loadPev() {
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setPev({ id: snap.id, ...snap.data() });
      }
    }
    loadPev();
  }, [ref]);

  if (!pev) return <li>Carregando PEV...</li>;

  return (
    <li>
      <strong>{pev.name}</strong> — {pev.address}  
      <br />
    </li>
  );
}
