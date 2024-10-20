import React from 'react';
import { ReactTyped } from 'react-typed';

interface TypedTextProps {
  text: string;
  cursorChar?: string;
  className?: string;
  showCursor?: boolean;
}

const TypedText: React.FC<TypedTextProps> = ({
  text,
  cursorChar = '.',
  className,
  showCursor = true,
}) => {
  return (
    <ReactTyped
      className={className}
      startWhenVisible
      strings={[text]}
      typeSpeed={40}
      cursorChar={cursorChar}
      showCursor={showCursor}
    />
  );
};

export default TypedText;
