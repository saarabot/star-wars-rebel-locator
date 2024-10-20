import React from 'react';
import { RebelInfo } from '@/types';
import TypedText from '@/components/TypedText';

interface RebelComponentProps {
  rebelData: RebelInfo;
}

const RebelComponent: React.FC<RebelComponentProps> = ({ rebelData }) => {
  const infoParagraph = (label: string, value?: string) => {
    const constructedString = `${label}: <b>${value}</b>`;
    return (
      <p>
        <TypedText
          className='text-amber-300 font-body'
          text={constructedString}
          showCursor={false}
        />
      </p>
    );
  };

  return (
    <div
      id='rebel-container'
      key={rebelData.id}
      className='m-1 border border-orange-500 flex p-2 pb-1 sm:p-3 background-black'
    >
      <div id='rebel-image-container' className='w-28 mx-auto mt-1'>
        <img
          className='grow-0 w-24 h-24 border border-orange-500 overflow-hidden object-cover object-center'
          src={rebelData.image}
        />
      </div>
      <div
        id='rebel-info-container'
        className='flex-none w-2/3 mx-auto pl-2 xs:pl-0'
      >
        <div className='grow min-w-full'>
          {infoParagraph('Name', rebelData.name)}
        </div>
        <div className='grow min-w-full'>
          {infoParagraph(
            'Distance',
            rebelData.distance
              ? `${rebelData.distance?.toFixed(2)} km`
              : 'Not available'
          )}
        </div>
        <div className='pb-2 text-amber-300 sm:flex md:block lg:flex'>
          <div className='flex-none lg:w-2/3 lg:pr-2 lg:mr-0 md:mr-4'>
            {infoParagraph('Alive', rebelData.died ? 'No' : 'Yes')}
            {infoParagraph('Species', `${rebelData.species}`)}
          </div>
          <div className='lg:grow md:flex-none sm:ml-2 md:ml-0'>
            {infoParagraph('Height', `${rebelData.height} m`)}
            {infoParagraph('Mass', `${rebelData.mass} kg`)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RebelComponent;
