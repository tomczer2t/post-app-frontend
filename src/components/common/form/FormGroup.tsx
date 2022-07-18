import React from 'react';

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export const FormGroup = ({ children, className = '' }: Props) => {

  if (!children) return null;

  return (
    <div className={`flex flex-col justify-start gap-y-1 ${ className }`}>
      { children }
    </div>
  );
};
