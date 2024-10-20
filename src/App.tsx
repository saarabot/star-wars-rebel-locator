import './App.css';
import { Suspense, lazy } from 'react';
import RebelListComponent from '@/components/RebelList';
import TypedText from '@/components/TypedText';
import { useRebelsData } from '@/hooks/useRebelsData';

const MapComponent = lazy(() => import('@/components/Map'));

function App() {
  const { isLoading } = useRebelsData();

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
        <TypedText
          className='text-amber-300 p-2 font-body'
          text='Loading..'
          cursorChar='.'
        />
      )}
      <div className='mx-auto'>
        <Suspense
          fallback={
            <TypedText
              className='text-amber-300 p-2 font-body'
              text='Loading..'
              cursorChar='.'
            />
          }
        >
          <MapComponent />
          <RebelListComponent />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
