import React from 'react';

import { SecretObject } from '@/App';

interface MapComponentProps {
  rebels: SecretObject[];
}

const RebelListComponent: React.FC<MapComponentProps> = ({ rebels = [] }) => {
  return (
    <div className='border-2 border-amber-400 md:h-full md:w-48'>
      <h2 className='uppercase font-semibold text-center text-amber-400'>
        Rebels
      </h2>
      {rebels.map((rebel) => {
        return <p>{rebel.id}</p>;
      })}
    </div>
  );
};

export default RebelListComponent;
