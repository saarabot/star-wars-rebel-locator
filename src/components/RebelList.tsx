import React, { lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RebelInfo } from '@/types';
import TypedText from '@/components/TypedText';
import { useRebelData } from '@/hooks/useRebelData';

const RebelComponent = lazy(() => import('@/components/RebelComponent'));

const RebelListComponent: React.FC = () => {
  const { rebelData, loading, error, location } = useRebelData();
  const containerClass = rebelData
    ? 'border-2 border-orange-500 p-2 pt-0 min-w-7 rebel-list flex-1 h-auto'
    : 'border-2 border-orange-500 p-2 pt-0 min-w-7 rebel-list flex-1 h-[110px]';

  return (
    <div className='rebel-list-container'>
      <div className={containerClass}>
        <h2 className='rebel-header uppercase text-2xl font-semibold text-amber-300 font-display tracking-widest border-b-2 border-orange-500 mb-1'>
          Rebels
        </h2>
        {loading && (
          <TypedText
            className='text-amber-300 p-2 font-body'
            text='Loading..'
            cursorChar='.'
          />
        )}
        {error && (
          <TypedText
            className='text-amber-300 p-2 font-body'
            text='Failed to fetch data, better DM Bruce Willis'
            cursorChar='!'
          />
        )}
        {!location && !error && (
          <TypedText
            className='text-amber-300 p-2 font-body'
            text='Set location on map to load'
            cursorChar='>'
          />
        )}
        {location && rebelData && (
          <Suspense
            fallback={
              <TypedText
                className='text-amber-300 p-2 font-body'
                text='Loading..'
                cursorChar='.'
              />
            }
          >
            <div
              id='rebels-container'
              className='rebel-list-content grid lg:grid-cols-2 md:grid-cols-2'
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
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default RebelListComponent;
