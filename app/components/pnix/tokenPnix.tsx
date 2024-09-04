import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '@/lib/firebase/firebaseConfig';

export default function tokenPnix() {
  const [data, setData] = useState({});

  useEffect(() => {
    const dbRef = ref(database, 'nftData');
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      } else {
        console.log("No data available");
      }
    });
  }, []);

  return (
    <div>
      <h1>Firebase Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
