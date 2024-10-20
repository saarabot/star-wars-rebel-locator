import React from 'react';

const ErrorProneComponent: React.FC = () => {
  // Simulate an error
  throw new Error('Simulated error in ErrorProneComponent');

  return <div>This will not be rendered</div>;
};

export default ErrorProneComponent;
