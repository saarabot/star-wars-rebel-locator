import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Rebel, RebelInfo } from '@/types';
import { ReactTyped } from 'react-typed';
import RebelComponent from './RebelComponent';

const RebelListComponent: React.FC = () => {
  const rebels = useSelector((state: RootState) => state.rebels.rebels);
  const location = useSelector((state: RootState) => state.location.location);

  const [_rebels, _setRebels] = useState<RebelInfo[] | null>();
  const [rebelData, setRebelData] = useState<RebelInfo[] | null>();
  const [loading, setLoading] = useState<boolean>(false);

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
    setLoading(false);
  };

  const fetchRebelData = () => {
    setLoading(true);
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

  const animateText = (textContent: string, cursorChar?: string) => {
    return (
      <ReactTyped
        className='text-amber-300 p-2 font-body'
        startWhenVisible
        strings={[textContent]}
        typeSpeed={40}
        cursorChar={cursorChar}
        showCursor={true}
      />
    );
  };

  // TODO:
  // 4. update sort when orientation/screen size changes
  // 5. missing distances on re-render

  return (
    <div className='border-2 border-orange-500 p-2 min-w-72 max-lg:mt-4'>
      <h2 className='uppercase text-2xl font-semibold text-amber-300 p-1 font-display tracking-widest'>
        Rebels
      </h2>
      {loading && animateText('Loading..', '.')}
      {!location && animateText('Set location on map to load', '>')}
      {location && _rebels && (
        <div
          id='rebels-container'
          className='grid lg:grid-cols-2 md:grid-cols-2'
        >
          {_rebels.map((rebel) => {
            return <RebelComponent rebelData={rebel} />;
          })}
        </div>
      )}
    </div>
  );
};

export default RebelListComponent;
