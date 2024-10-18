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
    <div className='container w-auto mx-auto'>
      <h1 className='text-3xl font-bold text-amber-400 uppercase text-center p-2'>
        Rebel locator
      </h1>
      <div className=' mx-auto'>
        <div className='lg:flex md:flex'>
          <MapComponent />
          <RebelListComponent />
        </div>
      </div>
    </div>
  );
}

export default App;
