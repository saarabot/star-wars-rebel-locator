import React from 'react';
import { RebelInfo } from '@/types';
import { ReactTyped } from 'react-typed';
import RebelComponent from './RebelComponent';
import { useRebelData } from '@/hooks/useRebelData';
import { AnimatePresence, motion } from 'framer-motion';

const RebelListComponent: React.FC = () => {
  const { rebelData, loading, location } = useRebelData();

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

  return (
    <div className='border-2 border-orange-500 p-2 min-w-72 max-lg:mt-4'>
      <h2 className='uppercase text-2xl font-semibold text-amber-300 p-1 font-display tracking-widest'>
        Rebels
      </h2>
      {loading && animateText('Loading..', '.')}
      {!location && animateText('Set location on map to load', '>')}
      {location && rebelData && (
        <div
          id='rebels-container'
          className='grid lg:grid-cols-2 md:grid-cols-2'
        >
          <AnimatePresence>
            {rebelData.map((rebel: RebelInfo) => {
              return (
                <motion.div
                  key={rebel.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.5 }}
                  layout
                >
                  <RebelComponent key={rebel.id} rebelData={rebel} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default RebelListComponent;
