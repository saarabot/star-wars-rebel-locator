import './App.css';
import { Suspense, lazy } from 'react';
import RebelListComponent from '@/components/RebelList';
import TypedText from '@/components/TypedText';
import { useRebelsData } from '@/hooks/useRebelsData';
import ErrorBoundary from '@/components/ErrorBoundary';

const MapComponent = lazy(() => import('@/components/Map'));

function App() {
  const { isLoading, error } = useRebelsData();

  return (
    <div className='container mx-auto tracking-wider mt-1 sm:mt-3 xs:w-full w-11/12 min-w-[360px]'>
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
      {error && (
        <TypedText
          className='text-amber-300 p-2 font-body'
          text='Error fetching data, just to be sure, DM Bruce Willis'
          cursorChar='.'
        />
      )}
      {!isLoading && !error && (
        <div className='content-container'>
          <ErrorBoundary
            fallback={
              <TypedText
                className='text-amber-300 p-2 font-body'
                text='Something went wrong, we might need to call Bruce Willis'
                cursorChar='!'
              />
            }
          >
            <Suspense
              fallback={
                <TypedText
                  className='text-amber-300 p-2 font-body'
                  text='Loading..'
                  cursorChar='.'
                />
              }
            >
              <div className='w-full'>
                <MapComponent />
              </div>
              <RebelListComponent />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}
    </div>
  );
}

export default App;
