import './App.css';
import { useEffect, useState } from 'react';
import { decode } from 'js-base64';
import MapComponent from '@/components/Map';
import RebelListComponent from '@/components/RebelList';

const secretSource =
  'https://aseevia.github.io/star-wars-frontend/data/secret.json';

export interface SecretObject {
  id: number;
  lat: number;
  long: number;
}

function App() {
  const [decodedData, setDecodedData] = useState<SecretObject[]>([]);
  useEffect(() => {
    const fetchSecret = async () => {
      try {
        const res = await fetch(secretSource);
        const data = await res.json();
        // decode secret
        setDecodedData(JSON.parse(decode(data.message)));
      } catch (error) {
        console.log('Error fetching secret', error);
      }
    };

    fetchSecret();
  }, []);

  return (
    <div className='container mx-auto'>
      <h1 className='text-3xl font-bold text-amber-400 uppercase text-center p-2'>
        Rebel locator
      </h1>
      <div className='max-w-md mx-auto md:max-w-3xl'>
        <div className='md:flex'>
          <MapComponent targets={decodedData} />
          <RebelListComponent rebels={[]} />
        </div>
      </div>
    </div>
  );
}

export default App;
