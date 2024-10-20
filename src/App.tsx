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
import { ReactTyped } from 'react-typed';

function App() {
  const { data /*error*/, isLoading } = useGetRebelsQuery();

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
      className='container mx-auto tracking-wider mt-1 sm:mt-3 xs:w-full w-11/12'
      style={{ minWidth: '360px' }}
    >
      <h1 className='text-2xl xs:text-4xl font-bold text-amber-400 italic uppercase p-2 pt-0 font-display tracking-widest'>
        Rebel locator{' '}
        <span className='inline-block text-2xl xs:text-4xl font-numeric not-italic font-bold text-cyan-500'>
          2000
        </span>
      </h1>

      {isLoading && (
        <ReactTyped
          className='text-amber-300 p-2 font-body'
          startWhenVisible
          strings={['Loading..']}
          typeSpeed={40}
          cursorChar={'.'}
          showCursor={true}
        />
      )}
      <div className='mx-auto'>
        <MapComponent />
        <RebelListComponent />
      </div>
    </div>
  );
}

export default App;
