import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Rebel, RebelInfo } from '@/types';

const RebelListComponent: React.FC = () => {
  const rebels = useSelector((state: RootState) => state.rebels.rebels);
  const location = useSelector((state: RootState) => state.location.location);

  const [_rebels, _setRebels] = useState<RebelInfo[] | null>();
  const [rebelData, setRebelData] = useState<RebelInfo[] | null>();

  const mergeData = (rebels: Rebel[], rebelInfos: RebelInfo[]) => {
    const combinedList = [...rebelInfos, ...rebels] as RebelInfo[];
    const mergedMap = combinedList.reduce((map, rebel) => {
      if (map.has(rebel.id)) {
        map.set(rebel.id, { ...map.get(rebel.id), ...rebel });
      } else {
        map.set(rebel.id, { ...rebel });
      }
      return map;
    }, new Map<number, RebelInfo>());
    const mergedInfos = Array.from(mergedMap.values());
    mergedInfos.sort((a, b) => a.distance! - b.distance!);

    _setRebels(mergedInfos);
  };

  const fetchRebelData = () => {
    const fetchUrls = rebels.map((rebel) => {
      return `https://akabab.github.io/starwars-api/api/id/${rebel.id}.json`;
    });

    // map urls to fetch promises and store in array
    const fetchPromises = fetchUrls.map((url) =>
      fetch(url).then((response) => response.json())
    );
    // handle all fetch promises
    Promise.all(fetchPromises)
      .then((responses) => {
        const responseData = responses.map((response: RebelInfo) => response);
        // save responseData
        setRebelData(responseData);
        mergeData(rebels, responseData);
      })
      .catch((error) => console.log('error', error));
  };

  useEffect(() => {
    if (location && !rebelData) {
      fetchRebelData();
    } else if (location && rebelData) {
      mergeData(rebels, rebelData);
    }
  }, [rebels, location]);

  return (
    <div className='border-2 border-orange-500'>
      <h2 className='uppercase font-semibold text-center text-amber-400'>
        Rebels
      </h2>
      {!location && <p>set location to display</p>}
      {location &&
        _rebels &&
        _rebels.map((rebel) => {
          return (
            <div
              key={rebel.id}
              className='flex m-1 p-2 border border-orange-500'
            >
              <img
                className='w-24 h-24 border border-orange-500 bg-white'
                src={rebel.image}
              />
              <p className='p-2 text-amber-400 font-semibold'>
                Name: {rebel.name}
              </p>
              <p> Distance: {rebel.distance?.toFixed(2)}</p>
            </div>
          );
        })}
    </div>
  );
};

export default RebelListComponent;
