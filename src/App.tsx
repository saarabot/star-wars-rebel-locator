import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { decode } from 'js-base64';

import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';

import { useGetRebelsQuery } from '@/services/rebel';
import { setRebels } from '@/features/rebelsSlice';
import { Rebel } from '@/types';
import MapComponent from '@/components/Map';
import RebelListComponent from '@/components/RebelList';

function App() {
  const { data /*error, isLoading*/ } = useGetRebelsQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      const parsed = JSON.parse(decode(data.message));

      const formattedData = parsed.map((dataItem: Rebel) => {
        return {
          ...dataItem,
          coordinates: new Point(fromLonLat([dataItem.long, dataItem.lat])),
        };
      });
      dispatch(setRebels(formattedData));
    }
  }, [data]);

  return (
    <div
      className='container mx-auto tracking-wider mt-3'
      style={{ minWidth: '360px' }}
    >
      <h1 className='text-4xl font-bold text-amber-400 italic uppercase p-2 font-display tracking-widest'>
        Rebel locator{' '}
        <span className='inline-block text-4xl font-numeric not-italic font-bold text-cyan-500'>
          2000
        </span>
      </h1>
      <div className='mx-auto'>
        <div className=''>
          <MapComponent />
          <RebelListComponent />
        </div>
      </div>
    </div>
  );
}

export default App;
