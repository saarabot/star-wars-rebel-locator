import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Rebel, RebelInfo } from '@/types';
import { ReactTyped } from 'react-typed';

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

  const infoParagraph = (label: string, value?: string) => {
    const constructedString = `${label}: <b>${value}</b>`;
    return (
      <p>
        <ReactTyped
          className='text-amber-300 font-body'
          startWhenVisible
          typeSpeed={40}
          showCursor={false}
          strings={[constructedString]}
        />
      </p>
    );
  };

  // TODO:
  // 1. onclick rebel card set zoom/focus/bounds on map
  // to bound location and selection
  // 2. list on big screen to bottom
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
            return (
              <div
                id='rebel-container'
                key={rebel.id}
                className='m-1 border border-orange-500 flex p-3'
              >
                <div id='rebel-image-container' className='w-28 mx-auto'>
                  <img
                    className='grow-0 w-24 h-24 border border-orange-500 overflow-hidden object-cover object-center'
                    src={rebel.image}
                  />
                </div>
                <div
                  id='rebel-info-container'
                  className='flex-none w-2/3 mx-auto'
                >
                  <div className='grow min-w-full'>
                    {infoParagraph('Name', rebel.name)}
                  </div>
                  <div className='grow min-w-full'>
                    {infoParagraph(
                      'Distance',
                      rebel.distance
                        ? `${rebel.distance?.toFixed(2)} km`
                        : 'Not available'
                    )}
                  </div>
                  <div className='pb-2 text-amber-300 sm:flex md:block lg:flex'>
                    <div className='flex-none lg:w-2/3 lg:pr-2 lg:mr-0 md:mr-4'>
                      {infoParagraph('Alive', rebel.died ? 'No' : 'Yes')}
                      {infoParagraph('Species', `${rebel.species}`)}
                    </div>
                    <div className='lg:grow md:flex-none sm:ml-2 md:ml-0'>
                      {infoParagraph('Height', `${rebel.height} m`)}
                      {infoParagraph('Mass', `${rebel.mass} kg`)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RebelListComponent;
